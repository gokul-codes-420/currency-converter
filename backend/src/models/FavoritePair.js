const mongoose = require('mongoose');

const FavoritePairSchema = new mongoose.Schema({
  fromCurrency: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
    maxlength: 10
  },
  toCurrency: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
    maxlength: 10
  },
  sessionId: {
    type: String,
    default: 'anonymous',
    index: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Avoid duplicate favorite pairs per session
FavoritePairSchema.index({ sessionId: 1, fromCurrency: 1, toCurrency: 1 }, { unique: true });

module.exports = mongoose.model('FavoritePair', FavoritePairSchema);
