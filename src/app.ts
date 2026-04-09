/**
 * Express App Setup
 */

import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import errorMiddleware from './middlewares/error.middleware';
import config from './config/env';

// Import routes
import adminRoutes from './routes/admin.routes';
import websiteRoutes from './routes/website.routes';


const app = express();

// Parse CORS origins from env (can be comma-separated)
const corsOrigins = (config.CORS_ORIGIN || 'http://localhost:8080')
  .split(',')
  .map((origin) => origin.trim());

// Middleware
app.use(
  cors({
    origin: corsOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-REFRESH-TOKEN', 'Accept'],
    exposedHeaders: ['X-Access-Token', 'X-Refresh-Token'],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/website', websiteRoutes);

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Error middleware
app.use(errorMiddleware);

export default app;
