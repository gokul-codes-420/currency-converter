require('dotenv').config();
const http = require('http');
const app = require('./app');
const { connectDB } = require('./config/db');

const PORT = process.env.PORT || 5001;

async function startServer() {
  // Connect to database (with automatic fallback to in-memory mode if Mongo is unavailable)
  await connectDB();

  const server = http.createServer(app);

  server.listen(PORT, () => {
    console.log(`===============================================`);
    console.log(` World Currency Converter Backend Server`);
    console.log(` Status: Running on http://localhost:${PORT}`);
    console.log(` Health: http://localhost:${PORT}/api/health`);
    console.log(` Rates:  http://localhost:${PORT}/api/rates?base=USD`);
    console.log(`===============================================`);
  });

  // Graceful shutdown
  const shutdown = () => {
    console.log('\n[Server] Shutting down gracefully...');
    server.close(() => {
      console.log('[Server] HTTP server closed.');
      process.exit(0);
    });
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

startServer();
