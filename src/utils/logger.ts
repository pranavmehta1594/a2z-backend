/**
 * Logger Utility
 */

import fs from 'fs';
import path from 'path';

const logDir = path.join(__dirname, '../../logs');

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

interface Logger {
  log: (message: string, data?: any) => void;
  error: (message: string, error: any) => void;
  info: (message: string, data?: any) => void;
  warn: (message: string, data?: any) => void;
}

const logger: Logger = {
  log: (message: string, data: any = '') => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${message}`, data);
  },

  error: (message: string, error: any) => {
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] ERROR: ${message}`, error);
    const logFile = path.join(logDir, 'error.log');
    fs.appendFileSync(logFile, `[${timestamp}] ${message}: ${error}\n`);
  },

  info: (message: string, data: any = '') => {
    const timestamp = new Date().toISOString();
    console.info(`[${timestamp}] INFO: ${message}`, data);
  },

  warn: (message: string, data: any = '') => {
    const timestamp = new Date().toISOString();
    console.warn(`[${timestamp}] WARN: ${message}`, data);
  },
};

export default logger;
