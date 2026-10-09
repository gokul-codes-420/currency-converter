const { fetchRates } = require('../services/exchangeRateService');
const { getCurrencyInfo } = require('../services/currencyData');

/**
 * Handle exchange rates table
 * GET /api/rates?base=USD
 */
async function getRates(req, res, next) {
  try {
    const base = String(req.query.base || 'USD').toUpperCase().trim();
    const rateData = await fetchRates(base);

    const baseInfo = getCurrencyInfo(base);

    return res.json({
      success: true,
      base: rateData.base,
      baseInfo,
      lastUpdate: rateData.lastUpdate,
      nextUpdate: rateData.nextUpdate,
      provider: rateData.provider,
      providerUrl: rateData.providerUrl,
      isCached: rateData.isCached,
      isStale: rateData.isStale,
      warning: rateData.warning || null,
      rates: rateData.rates
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getRates
};
