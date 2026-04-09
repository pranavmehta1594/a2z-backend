/**
 * Category Routes - MIXED (Public Read + Admin Write)
 * Used by both website and admin routes
 */

import { Router } from 'express';
import CategoryController from './category.controller';
import authMiddleware from '../../middlewares/auth.middleware';
import roleMiddleware from '../../middlewares/role.middleware';
import { ROLES } from '../../config/constants';

const router = Router();

// PUBLIC - Read operations (anyone can access)
router.get('/', CategoryController.getAllCategories);
router.get('/:id', CategoryController.getCategoryById);

// PRIVATE - Write operations (admin only)
router.post('/', authMiddleware, roleMiddleware(ROLES.ADMIN), CategoryController.createCategory);
router.put('/:id', authMiddleware, roleMiddleware(ROLES.ADMIN), CategoryController.updateCategory);
router.delete('/:id', authMiddleware, roleMiddleware(ROLES.ADMIN), CategoryController.deleteCategory);

export default router;
