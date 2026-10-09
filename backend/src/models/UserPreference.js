const mongoose = require('mongoose');

const UserPreferenceSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  theme: {
    type: String,
    enum: ['light', 'dark', 'system'],
    default: 'light'
  },
  preferredBaseCurrency: {
    type: String,
    default: 'USD',
    uppercase: true
  },
  favoriteCurrencies: [{
    type: String,
    uppercase: true
  }],
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('UserPreference', UserPreferenceSchema);
