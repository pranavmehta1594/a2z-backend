/**
 * Website/Frontend Routes - PUBLIC API
 * These are accessible to frontend without authentication
 * Only read operations (GET) available
 */

import { Router } from 'express';
import productRoutes from '../modules/product/product.routes';
import categoryRoutes from '../modules/category/category.routes';
import authRoutes from '../modules/auth/auth.routes';
import orderRoutes from '../modules/order/order.routes';

const router = Router();

// PUBLIC ROUTES - No authentication required
router.use('/products', productRoutes);    // GET: /api/website/products, /api/website/products/:id
router.use('/categories', categoryRoutes); // GET: /api/website/categories, /api/website/categories/:id
router.use('/auth', authRoutes);           // POST: /api/website/auth/login, /api/website/auth/register
router.use('/orders', orderRoutes);        // Orders can be created by authenticated customers

export default router;
