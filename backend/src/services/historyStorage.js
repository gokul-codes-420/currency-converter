const { getIsConnected } = require('../config/db');
const ConversionHistory = require('../models/ConversionHistory');
const FavoritePair = require('../models/FavoritePair');
const UserPreference = require('../models/UserPreference');

// In-memory fallbacks when MongoDB is not connected
const memoryHistory = [];
const memoryFavorites = new Map(); // sessionId -> array of { fromCurrency, toCurrency, id, createdAt }
const memoryPreferences = new Map(); // sessionId -> { theme, preferredBaseCurrency, favoriteCurrencies }

/**
 * Record a conversion
 */
async function recordConversion(data) {
  const { fromCurrency, toCurrency, amount, convertedAmount, rate, rateTimestamp, sessionId = 'anonymous' } = data;

  if (getIsConnected()) {
    try {
      const doc = await ConversionHistory.create({
        fromCurrency,
        toCurrency,
        amount,
        convertedAmount,
        rate,
        rateTimestamp,
        sessionId
      });
      return doc;
    } catch (err) {
      console.warn('[Storage] Mongo record conversion error, falling back to memory:', err.message);
    }
  }

  // Memory fallback
  const item = {
    _id: 'mem_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    fromCurrency,
    toCurrency,
    amount,
    convertedAmount,
    rate,
    rateTimestamp,
    sessionId,
    createdAt: new Date()
  };
  memoryHistory.unshift(item);
  if (memoryHistory.length > 100) memoryHistory.pop(); // keep last 100
  return item;
}

/**
 * Get conversion history
 */
async function getHistory(sessionId = 'anonymous', limit = 20) {
  if (getIsConnected()) {
    try {
      const query = sessionId === 'all' ? {} : { sessionId };
      return await ConversionHistory.find(query)
        .sort({ createdAt: -1 })
        .limit(Number(limit))
        .lean();
    } catch (err) {
      console.warn('[Storage] Mongo get history error, falling back to memory:', err.message);
    }
  }

  return memoryHistory
    .filter(item => sessionId === 'all' || item.sessionId === sessionId)
    .slice(0, Number(limit));
}

/**
 * Clear history
 */
async function clearHistory(sessionId = 'anonymous') {
  if (getIsConnected()) {
    try {
      if (sessionId === 'all') {
        await ConversionHistory.deleteMany({});
      } else {
        await ConversionHistory.deleteMany({ sessionId });
      }
      return true;
    } catch (err) {
      console.warn('[Storage] Mongo clear history error, clearing memory:', err.message);
    }
  }

  if (sessionId === 'all') {
    memoryHistory.length = 0;
  } else {
    for (let i = memoryHistory.length - 1; i >= 0; i--) {
      if (memoryHistory[i].sessionId === sessionId) {
        memoryHistory.splice(i, 1);
      }
    }
  }
  return true;
}

/**
 * Get favorites
 */
async function getFavorites(sessionId = 'anonymous') {
  if (getIsConnected()) {
    try {
      return await FavoritePair.find({ sessionId }).sort({ createdAt: -1 }).lean();
    } catch (err) {
      console.warn('[Storage] Mongo get favorites error:', err.message);
    }
  }

  return memoryFavorites.get(sessionId) || [
    { _id: 'fav_1', fromCurrency: 'USD', toCurrency: 'EUR', createdAt: new Date() },
    { _id: 'fav_2', fromCurrency: 'USD', toCurrency: 'INR', createdAt: new Date() },
    { _id: 'fav_3', fromCurrency: 'GBP', toCurrency: 'USD', createdAt: new Date() },
    { _id: 'fav_4', fromCurrency: 'EUR', toCurrency: 'USD', createdAt: new Date() }
  ];
}

/**
 * Add favorite
 */
async function addFavorite({ fromCurrency, toCurrency, sessionId = 'anonymous' }) {
  const from = fromCurrency.toUpperCase().trim();
  const to = toCurrency.toUpperCase().trim();

  if (getIsConnected()) {
    try {
      const existing = await FavoritePair.findOne({ sessionId, fromCurrency: from, toCurrency: to });
      if (existing) return existing;
      return await FavoritePair.create({ sessionId, fromCurrency: from, toCurrency: to });
    } catch (err) {
      console.warn('[Storage] Mongo add favorite error:', err.message);
    }
  }

  const list = memoryFavorites.get(sessionId) || [];
  const exists = list.find(f => f.fromCurrency === from && f.toCurrency === to);
  if (exists) return exists;

  const item = {
    _id: 'fav_' + Date.now(),
    fromCurrency: from,
    toCurrency: to,
    sessionId,
    createdAt: new Date()
  };
  list.unshift(item);
  memoryFavorites.set(sessionId, list);
  return item;
}

/**
 * Remove favorite
 */
async function removeFavorite(id, sessionId = 'anonymous') {
  if (getIsConnected()) {
    try {
      await FavoritePair.deleteOne({ _id: id, sessionId });
      return true;
    } catch (err) {
      console.warn('[Storage] Mongo remove favorite error:', err.message);
    }
  }

  const list = memoryFavorites.get(sessionId) || [];
  const filtered = list.filter(f => f._id !== id && `${f.fromCurrency}_${f.toCurrency}` !== id);
  memoryFavorites.set(sessionId, filtered);
  return true;
}

/**
 * Get preferences
 */
async function getPreferences(sessionId = 'anonymous') {
  if (getIsConnected()) {
    try {
      const pref = await UserPreference.findOne({ sessionId }).lean();
      if (pref) return pref;
    } catch (err) {
      console.warn('[Storage] Mongo get preferences error:', err.message);
    }
  }

  return memoryPreferences.get(sessionId) || {
    theme: 'light',
    preferredBaseCurrency: 'USD',
    favoriteCurrencies: ['USD', 'EUR', 'GBP', 'INR', 'JPY']
  };
}

/**
 * Update preferences
 */
async function savePreferences(sessionId = 'anonymous', data) {
  if (getIsConnected()) {
    try {
      return await UserPreference.findOneAndUpdate(
        { sessionId },
        { ...data, updatedAt: new Date() },
        { new: true, upsert: true }
      ).lean();
    } catch (err) {
      console.warn('[Storage] Mongo save preferences error:', err.message);
    }
  }

  const current = memoryPreferences.get(sessionId) || {};
  const updated = { ...current, ...data, sessionId, updatedAt: new Date() };
  memoryPreferences.set(sessionId, updated);
  return updated;
}

module.exports = {
  recordConversion,
  getHistory,
  clearHistory,
  getFavorites,
  addFavorite,
  removeFavorite,
  getPreferences,
  savePreferences
};
