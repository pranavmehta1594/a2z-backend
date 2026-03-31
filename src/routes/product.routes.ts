/**
 * Product Routes
 */

import { Router } from 'express';
import ProductController from '../controllers/product.controller';
import authMiddleware from '../middlewares/auth.middleware';
import roleMiddleware from '../middlewares/role.middleware';
import validateRequest from '../middlewares/validate.middleware';
import { createProductValidator, updateProductValidator } from '../validators/product.validator';
import { ROLES } from '../config/constants';

const router = Router();

router.post(
  '/',
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  validateRequest(createProductValidator, 'body'),
  ProductController.createProduct
);
router.get('/', ProductController.getAllProducts);
router.get('/top-products', ProductController.getTopProducts);
router.get('/:id', ProductController.getProductById);
router.put(
  '/:id',
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  validateRequest(updateProductValidator, 'body'),
  ProductController.updateProduct
);
router.delete('/:id', authMiddleware, roleMiddleware(ROLES.ADMIN), ProductController.deleteProduct);

export default router;
