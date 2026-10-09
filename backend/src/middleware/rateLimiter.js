const rateLimit = require('express-rate-limit');

// General API rate limiter: 120 requests per minute per IP
const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many requests from this IP, please try again in a minute.'
  }
});

// Conversion endpoint limiter: 60 per minute
const convertLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Conversion request limit exceeded. Please wait a moment.'
  }
});

module.exports = {
  apiLimiter,
  convertLimiter
};
