/**
 * Category Routes
 */

import { Router } from 'express';
import CategoryController from './category.controller';
import authMiddleware from '../../middlewares/auth.middleware';
import roleMiddleware from '../../middlewares/role.middleware';
import { ROLES } from '../../config/constants';

const router = Router();

router.use(authMiddleware);
router.get('/', roleMiddleware(ROLES.ADMIN), CategoryController.getAllCategories);
router.post('/', authMiddleware, roleMiddleware(ROLES.ADMIN), CategoryController.createCategory);
router.get('/:id', CategoryController.getCategoryById);
router.put('/:id',  roleMiddleware(ROLES.ADMIN), CategoryController.updateCategory);
router.delete('/:id', roleMiddleware(ROLES.ADMIN), CategoryController.deleteCategory);

export default router;
