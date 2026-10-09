const {
  getHistory,
  recordConversion,
  clearHistory,
  getFavorites,
  addFavorite,
  removeFavorite,
  getPreferences,
  savePreferences
} = require('../services/historyStorage');

async function listHistory(req, res, next) {
  try {
    const { sessionId = 'anonymous', limit = 20 } = req.query;
    const history = await getHistory(sessionId, limit);
    return res.json({
      success: true,
      count: history.length,
      data: history
    });
  } catch (error) {
    return next(error);
  }
}

async function createHistory(req, res, next) {
  try {
    const { fromCurrency, toCurrency, amount, convertedAmount, rate, rateTimestamp, sessionId = 'anonymous' } = req.body;
    if (!fromCurrency || !toCurrency || amount === undefined || convertedAmount === undefined) {
      return res.status(400).json({ success: false, error: 'Missing required history parameters' });
    }

    const item = await recordConversion({
      fromCurrency,
      toCurrency,
      amount,
      convertedAmount,
      rate,
      rateTimestamp,
      sessionId
    });

    return res.status(201).json({ success: true, data: item });
  } catch (error) {
    return next(error);
  }
}

async function deleteHistory(req, res, next) {
  try {
    const { sessionId = 'anonymous' } = req.query;
    await clearHistory(sessionId);
    return res.json({ success: true, message: 'Conversion history cleared successfully' });
  } catch (error) {
    return next(error);
  }
}

async function listFavorites(req, res, next) {
  try {
    const { sessionId = 'anonymous' } = req.query;
    const favorites = await getFavorites(sessionId);
    return res.json({ success: true, count: favorites.length, data: favorites });
  } catch (error) {
    return next(error);
  }
}

async function createFavorite(req, res, next) {
  try {
    const { fromCurrency, toCurrency, sessionId = 'anonymous' } = req.body;
    if (!fromCurrency || !toCurrency) {
      return res.status(400).json({ success: false, error: 'fromCurrency and toCurrency are required' });
    }

    const fav = await addFavorite({ fromCurrency, toCurrency, sessionId });
    return res.status(201).json({ success: true, data: fav });
  } catch (error) {
    return next(error);
  }
}

async function deleteFavorite(req, res, next) {
  try {
    const { id } = req.params;
    const { sessionId = 'anonymous' } = req.query;
    await removeFavorite(id, sessionId);
    return res.json({ success: true, message: 'Favorite pair removed' });
  } catch (error) {
    return next(error);
  }
}

async function getUserPreferences(req, res, next) {
  try {
    const { sessionId = 'anonymous' } = req.query;
    const pref = await getPreferences(sessionId);
    return res.json({ success: true, data: pref });
  } catch (error) {
    return next(error);
  }
}

async function updateUserPreferences(req, res, next) {
  try {
    const { sessionId = 'anonymous' } = req.query;
    const pref = await savePreferences(sessionId, req.body);
    return res.json({ success: true, data: pref });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  listHistory,
  createHistory,
  deleteHistory,
  listFavorites,
  createFavorite,
  deleteFavorite,
  getUserPreferences,
  updateUserPreferences
};
