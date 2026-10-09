/**
 * Global error handler middleware
 */
function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'An unexpected internal error occurred';

  // Do not expose stack traces in production
  const response = {
    success: false,
    error: message
  };

  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
  }

  console.error(`[Error] ${req.method} ${req.originalUrl}:`, err.message);

  return res.status(statusCode).json(response);
}

module.exports = errorHandler;
