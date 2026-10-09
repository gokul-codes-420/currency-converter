const mongoose = require('mongoose');

const ConversionHistorySchema = new mongoose.Schema({
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
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  convertedAmount: {
    type: Number,
    required: true
  },
  rate: {
    type: Number,
    required: true
  },
  rateTimestamp: {
    type: String
  },
  sessionId: {
    type: String,
    default: 'anonymous',
    index: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  }
});

module.exports = mongoose.model('ConversionHistory', ConversionHistorySchema);
