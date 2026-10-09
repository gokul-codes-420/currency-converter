const { getCurrencyInfo, CURRENCY_METADATA } = require('./currencyData');

// In-memory cache for exchange rates by base currency
// Map<baseCurrency, { rates: Object, lastUpdate: string, nextUpdate: string, timestamp: number, provider: string }>
const cache = new Map();
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes cache

/**
 * Fetch latest rates for a given base currency
 */
async function fetchRates(baseCurrency = 'USD') {
  const base = String(baseCurrency || 'USD').toUpperCase().trim();
  const now = Date.now();
  const cached = cache.get(base);

  // Return fresh cache if still valid
  if (cached && now - cached.timestamp < CACHE_TTL_MS) {
    return {
      ...cached,
      isCached: true,
      isStale: false
    };
  }

  const apiUrl = process.env.EXCHANGE_RATE_API_URL 
    ? `${process.env.EXCHANGE_RATE_API_URL}/${base}`
    : `https://open.er-api.com/v6/latest/${base}`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

    const response = await fetch(apiUrl, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'WorldCurrencyConverter/1.0'
      }
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Exchange rate provider returned HTTP status ${response.status}`);
    }

    const data = await response.json();

    if (data.result !== 'success' || !data.rates) {
      throw new Error(data['error-type'] || 'Invalid response from exchange rate provider');
    }

    const cacheEntry = {
      base: data.base_code || base,
      rates: data.rates,
      lastUpdate: data.time_last_update_utc || new Date().toUTCString(),
      nextUpdate: data.time_next_update_utc || null,
      provider: 'ExchangeRate-API',
      providerUrl: data.provider || 'https://www.exchangerate-api.com',
      timestamp: now
    };

    cache.set(base, cacheEntry);

    return {
      ...cacheEntry,
      isCached: false,
      isStale: false
    };
  } catch (error) {
    // If request failed but we have stale cache, return it with warning
    if (cached) {
      console.warn(`[ExchangeRateService] API request failed for ${base}, using cached data:`, error.message);
      return {
        ...cached,
        isCached: true,
        isStale: true,
        warning: 'Live exchange rates could not be refreshed. Displaying previously cached rates.'
      };
    }

    // If no cache for this base, try USD cache and cross-calculate
    const usdCache = cache.get('USD');
    if (usdCache && usdCache.rates && usdCache.rates[base]) {
      const baseToUsd = 1 / usdCache.rates[base];
      const derivedRates = {};
      for (const [code, r] of Object.entries(usdCache.rates)) {
        derivedRates[code] = r * baseToUsd;
      }
      return {
        base,
        rates: derivedRates,
        lastUpdate: usdCache.lastUpdate,
        nextUpdate: usdCache.nextUpdate,
        provider: usdCache.provider,
        providerUrl: usdCache.providerUrl,
        timestamp: usdCache.timestamp,
        isCached: true,
        isStale: true,
        warning: 'Derived from cached USD exchange rates due to network provider error.'
      };
    }

    throw new Error(`Unable to obtain exchange rates for ${base}: ${error.message}`);
  }
}

/**
 * Perform currency conversion
 */
async function convertCurrency({ from, to, amount }) {
  const fromCode = String(from || 'USD').toUpperCase().trim();
  const toCode = String(to || 'EUR').toUpperCase().trim();
  const numAmount = Number(amount);

  if (isNaN(numAmount) || numAmount < 0) {
    throw new Error('Amount must be a non-negative number');
  }

  // Same currency fast return
  if (fromCode === toCode) {
    const info = getCurrencyInfo(fromCode);
    return {
      from: fromCode,
      to: toCode,
      amount: numAmount,
      rate: 1.0,
      inverseRate: 1.0,
      convertedAmount: numAmount,
      fromInfo: info,
      toInfo: info,
      lastUpdate: new Date().toUTCString(),
      provider: 'Direct Identity',
      isCached: false,
      isStale: false
    };
  }

  // Fetch rates for base currency `from`
  let rateData;
  let rate = null;

  try {
    rateData = await fetchRates(fromCode);
    if (rateData.rates && rateData.rates[toCode]) {
      rate = rateData.rates[toCode];
    }
  } catch (err) {
    // Fallback: try fetching with USD base and cross calculate
    const usdRates = await fetchRates('USD');
    if (usdRates.rates && usdRates.rates[fromCode] && usdRates.rates[toCode]) {
      rateData = usdRates;
      rate = usdRates.rates[toCode] / usdRates.rates[fromCode];
    } else {
      throw err;
    }
  }

  if (rate === null || rate === undefined) {
    throw new Error(`Exchange rate for currency pair ${fromCode}/${toCode} is not available`);
  }

  const convertedAmount = Number((numAmount * rate).toFixed(6));
  const inverseRate = rate !== 0 ? Number((1 / rate).toFixed(6)) : 0;

  return {
    from: fromCode,
    to: toCode,
    amount: numAmount,
    rate: Number(rate.toFixed(6)),
    inverseRate,
    convertedAmount,
    fromInfo: getCurrencyInfo(fromCode),
    toInfo: getCurrencyInfo(toCode),
    lastUpdate: rateData.lastUpdate,
    nextUpdate: rateData.nextUpdate,
    provider: rateData.provider,
    providerUrl: rateData.providerUrl,
    isCached: rateData.isCached,
    isStale: rateData.isStale,
    warning: rateData.warning || null
  };
}

/**
 * Returns supported currencies list
 */
async function getSupportedCurrencies() {
  // Ensure we have at least USD rates cached to get all available codes
  let ratesData;
  try {
    ratesData = await fetchRates('USD');
  } catch {
    ratesData = null;
  }

  const codes = new Set();
  // Add all curated codes
  Object.keys(CURRENCY_METADATA).forEach(c => codes.add(c));

  // Add all codes from live API
  if (ratesData && ratesData.rates) {
    Object.keys(ratesData.rates).forEach(c => codes.add(c));
  }

  const list = Array.from(codes).map(code => getCurrencyInfo(code));

  // Sort popular first, then alphabetically by code
  list.sort((a, b) => {
    if (a.popular && !b.popular) return -1;
    if (!a.popular && b.popular) return 1;
    return a.code.localeCompare(b.code);
  });

  return list;
}

module.exports = {
  fetchRates,
  convertCurrency,
  getSupportedCurrencies
};
