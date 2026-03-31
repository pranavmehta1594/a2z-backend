/**
 * Category Routes
 */

import { Router } from 'express';
import CategoryController from '../controllers/category.controller';
import authMiddleware from '../middlewares/auth.middleware';
import roleMiddleware from '../middlewares/role.middleware';
import { ROLES } from '../config/constants';

const router = Router();

router.post('/', authMiddleware, roleMiddleware(ROLES.ADMIN), CategoryController.createCategory);
router.get('/', CategoryController.getAllCategories);
router.get('/:id', CategoryController.getCategoryById);
router.put('/:id', authMiddleware, roleMiddleware(ROLES.ADMIN), CategoryController.updateCategory);
router.delete(':id', authMiddleware, roleMiddleware(ROLES.ADMIN), CategoryController.deleteCategory);

export default router;
