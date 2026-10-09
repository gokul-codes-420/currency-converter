/**
 * API Service for World Currency Converter
 */

const API_BASE = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL.replace(/\/$/, '')}/api` 
  : '/api';

import { enrichCurrenciesWithCountries, CURRENCY_COUNTRY_MAP } from '../utils/currencyMetadata';

const ALL_LOCAL_CURRENCIES = Object.values(CURRENCY_COUNTRY_MAP);

export async function getCurrencies() {
  try {
    const res = await fetch(`${API_BASE}/currencies`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const json = await res.json();
    return enrichCurrenciesWithCountries(json.data || ALL_LOCAL_CURRENCIES);
  } catch (err) {
    console.warn('[API] Could not fetch currencies from backend, using full 166-currency dataset:', err.message);
    return ALL_LOCAL_CURRENCIES;
  }
}

export async function convertCurrency({ from, to, amount, sessionId = 'local_user' }) {
  try {
    const query = new URLSearchParams({
      from,
      to,
      amount: String(amount),
      sessionId
    });
    const res = await fetch(`${API_BASE}/convert?${query.toString()}`);
    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      throw new Error(errJson.error || `Server responded with ${res.status}`);
    }
    const json = await res.json();
    return json.data;
  } catch (err) {
    // If backend direct call failed, attempt fallback direct open API call
    console.warn('[API] Backend conversion failed, trying client fallback:', err.message);
    return fallbackConvert({ from, to, amount });
  }
}

export async function getRates(base = 'USD') {
  try {
    const res = await fetch(`${API_BASE}/rates?base=${encodeURIComponent(base)}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    return json;
  } catch (err) {
    console.warn('[API] Backend rates failed, attempting direct provider:', err.message);
    const direct = await fetch(`https://open.er-api.com/v6/latest/${base}`);
    const data = await direct.json();
    return {
      success: true,
      base: data.base_code || base,
      rates: data.rates,
      lastUpdate: data.time_last_update_utc,
      provider: 'ExchangeRate-API (Client Direct)'
    };
  }
}

export async function getPopularPairs(base = 'USD') {
  try {
    const res = await fetch(`${API_BASE}/popular?base=${encodeURIComponent(base)}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.warn('[API] getPopularPairs failed:', err.message);
    return [];
  }
}

export async function getHistory(sessionId = 'local_user') {
  try {
    const res = await fetch(`${API_BASE}/history?sessionId=${encodeURIComponent(sessionId)}`);
    if (res.ok) {
      const json = await res.json();
      return json.data || [];
    }
  } catch (err) {
    console.warn('[API] getHistory server error, using localStorage:', err.message);
  }
  // Local storage fallback
  try {
    const stored = localStorage.getItem('currency_history');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export async function saveHistory(entry) {
  // Always mirror in localStorage for immediate client persistence
  try {
    const stored = JSON.parse(localStorage.getItem('currency_history') || '[]');
    stored.unshift({ ...entry, _id: 'local_' + Date.now(), createdAt: new Date().toISOString() });
    if (stored.length > 50) stored.pop();
    localStorage.setItem('currency_history', JSON.stringify(stored));
  } catch (e) {
    console.warn('localStorage save failed', e);
  }

  try {
    await fetch(`${API_BASE}/history`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry)
    });
  } catch (err) {
    console.warn('[API] saveHistory backend failed:', err.message);
  }
}

export async function clearHistoryApi(sessionId = 'local_user') {
  try {
    localStorage.removeItem('currency_history');
    await fetch(`${API_BASE}/history?sessionId=${encodeURIComponent(sessionId)}`, {
      method: 'DELETE'
    });
  } catch (err) {
    console.warn('[API] clearHistory failed:', err.message);
  }
}

export async function getFavorites(sessionId = 'local_user') {
  try {
    const res = await fetch(`${API_BASE}/favorites?sessionId=${encodeURIComponent(sessionId)}`);
    if (res.ok) {
      const json = await res.json();
      return json.data || [];
    }
  } catch (err) {
    console.warn('[API] getFavorites server error, using localStorage:', err.message);
  }
  try {
    const stored = localStorage.getItem('currency_favorites');
    return stored ? JSON.parse(stored) : [
      { _id: 'f1', fromCurrency: 'USD', toCurrency: 'EUR' },
      { _id: 'f2', fromCurrency: 'USD', toCurrency: 'INR' },
      { _id: 'f3', fromCurrency: 'GBP', toCurrency: 'USD' }
    ];
  } catch {
    return [];
  }
}

export async function addFavoriteApi(pair) {
  try {
    const stored = JSON.parse(localStorage.getItem('currency_favorites') || '[]');
    const exists = stored.find(f => f.fromCurrency === pair.fromCurrency && f.toCurrency === pair.toCurrency);
    if (!exists) {
      stored.unshift({ ...pair, _id: 'fav_' + Date.now() });
      localStorage.setItem('currency_favorites', JSON.stringify(stored));
    }
    const res = await fetch(`${API_BASE}/favorites`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pair)
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('[API] addFavorite error:', err.message);
  }
}

export async function removeFavoriteApi(id, sessionId = 'local_user') {
  try {
    const stored = JSON.parse(localStorage.getItem('currency_favorites') || '[]');
    const filtered = stored.filter(f => f._id !== id && `${f.fromCurrency}_${f.toCurrency}` !== id);
    localStorage.setItem('currency_favorites', JSON.stringify(filtered));

    await fetch(`${API_BASE}/favorites/${id}?sessionId=${encodeURIComponent(sessionId)}`, {
      method: 'DELETE'
    });
  } catch (err) {
    console.warn('[API] removeFavorite error:', err.message);
  }
}

// Fallback client-side converter
async function fallbackConvert({ from, to, amount }) {
  const res = await fetch(`https://open.er-api.com/v6/latest/${from}`);
  const data = await res.json();
  const rate = data.rates && data.rates[to] ? data.rates[to] : 1;
  const numAmount = Number(amount);
  const fromMeta = CURRENCY_COUNTRY_MAP[from] || {};
  const toMeta = CURRENCY_COUNTRY_MAP[to] || {};
  return {
    from,
    to,
    amount: numAmount,
    rate: Number(rate.toFixed(6)),
    inverseRate: Number((1 / rate).toFixed(6)),
    convertedAmount: Number((numAmount * rate).toFixed(6)),
    fromInfo: { 
      code: from, 
      name: fromMeta.name || from, 
      country: fromMeta.country || '', 
      symbol: fromMeta.symbol || from, 
      flag: fromMeta.flag || '🌐' 
    },
    toInfo: { 
      code: to, 
      name: toMeta.name || to, 
      country: toMeta.country || '', 
      symbol: toMeta.symbol || to, 
      flag: toMeta.flag || '🌐' 
    },
    lastUpdate: data.time_last_update_utc || new Date().toUTCString(),
    provider: 'ExchangeRate-API (Client Direct)'
  };
}
