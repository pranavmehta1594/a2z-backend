/**
 * Server Entry Point
 */

import 'dotenv/config';
import connectDB from './config/db';
import logger from './utils/logger';
import config from './config/env';
import app from './app';

// Connect to MongoDB
connectDB();

// Start server
const server = app.listen(config.PORT, () => {
  logger.log(`🚀 Server running in ${config.NODE_ENV} mode on port ${config.PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    logger.log('HTTP server closed');
    process.exit(0);
  });
});

export default server;