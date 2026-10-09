const mongoose = require('mongoose');

let isConnected = false;

async function connectDB() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/world_currency_converter';

  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500, // 2.5 second timeout so server doesn't hang if Mongo isn't running
    });
    isConnected = true;
    console.log('[Database] Connected to MongoDB successfully.');
  } catch (error) {
    isConnected = false;
    console.warn(`[Database] MongoDB not reachable (${error.message}). Running in resilient in-memory fallback mode.`);
  }

  mongoose.connection.on('disconnected', () => {
    isConnected = false;
    console.warn('[Database] MongoDB disconnected. Falling back to in-memory store.');
  });

  mongoose.connection.on('reconnected', () => {
    isConnected = true;
    console.log('[Database] MongoDB reconnected.');
  });
}

function getIsConnected() {
  return isConnected && mongoose.connection.readyState === 1;
}

module.exports = {
  connectDB,
  getIsConnected
};
