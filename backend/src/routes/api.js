const express = require('express');
const router = express.Router();

const { convert, getCurrencies, getPopularPairs } = require('../controllers/converterController');
const { getRates } = require('../controllers/ratesController');
const {
  listHistory,
  createHistory,
  deleteHistory,
  listFavorites,
  createFavorite,
  deleteFavorite,
  getUserPreferences,
  updateUserPreferences
} = require('../controllers/historyController');
const { getIsConnected } = require('../config/db');
const { convertLimiter } = require('../middleware/rateLimiter');

// Health Check
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    database: getIsConnected() ? 'connected (MongoDB)' : 'in-memory fallback active',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Currencies metadata
router.get('/currencies', getCurrencies);

// Rates table by base
router.get('/rates', getRates);

// Popular pairs with live rates
router.get('/popular', getPopularPairs);

// Convert calculation
router.get('/convert', convertLimiter, convert);

// Conversion history
router.get('/history', listHistory);
router.post('/history', createHistory);
router.delete('/history', deleteHistory);

// Favorites
router.get('/favorites', listFavorites);
router.post('/favorites', createFavorite);
router.delete('/favorites/:id', deleteFavorite);

// User preferences
router.get('/preferences', getUserPreferences);
router.post('/preferences', updateUserPreferences);

module.exports = router;
