const { convertCurrency, getSupportedCurrencies, fetchRates } = require('../services/exchangeRateService');
const { recordConversion } = require('../services/historyStorage');

/**
 * Handle currency conversion
 * GET /api/convert?from=USD&to=INR&amount=100
 */
async function convert(req, res, next) {
  try {
    const { from = 'USD', to = 'EUR', amount = 1, record = 'true', sessionId = 'anonymous' } = req.query;

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount < 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid amount. Amount must be a positive number or zero.'
      });
    }

    const result = await convertCurrency({
      from: String(from).toUpperCase(),
      to: String(to).toUpperCase(),
      amount: numAmount
    });

    // Optionally record to history if record !== 'false'
    if (record !== 'false') {
      try {
        await recordConversion({
          fromCurrency: result.from,
          toCurrency: result.to,
          amount: result.amount,
          convertedAmount: result.convertedAmount,
          rate: result.rate,
          rateTimestamp: result.lastUpdate,
          sessionId: String(sessionId || 'anonymous')
        });
      } catch (recErr) {
        // Non-blocking log
        console.warn('[Converter] Could not log history:', recErr.message);
      }
    }

    return res.json({
      success: true,
      data: result
    });
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle supported currencies listing
 * GET /api/currencies
 */
async function getCurrencies(req, res, next) {
  try {
    const currencies = await getSupportedCurrencies();
    return res.json({
      success: true,
      count: currencies.length,
      data: currencies
    });
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle popular currency pairs with live rates
 * GET /api/popular?base=USD
 */
async function getPopularPairs(req, res, next) {
  try {
    const base = String(req.query.base || 'USD').toUpperCase();
    const rateData = await fetchRates(base);

    const popularTargets = ['EUR', 'GBP', 'INR', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'SGD', 'AED', 'SAR'];
    const pairs = [];

    for (const target of popularTargets) {
      if (target === base) continue;
      const rate = rateData.rates ? rateData.rates[target] : null;
      if (rate) {
        pairs.push({
          from: base,
          to: target,
          rate: Number(rate.toFixed(4)),
          inverseRate: Number((1 / rate).toFixed(4)),
          lastUpdate: rateData.lastUpdate
        });
      }
    }

    return res.json({
      success: true,
      base,
      lastUpdate: rateData.lastUpdate,
      data: pairs
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  convert,
  getCurrencies,
  getPopularPairs
};
