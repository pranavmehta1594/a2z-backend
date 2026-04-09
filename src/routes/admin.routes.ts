import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import roleMiddleware from '../middlewares/role.middleware';
import { ROLES } from '../config/constants';
import authRoutes from '../modules/auth/auth.routes';
import userRoutes from '../modules/user/user.routes';
import productRoutes from '../modules/product/product.routes';
import categoryRoutes from '../modules/category/category.routes';
import orderRoutes from '../modules/order/order.routes';

const router = Router();

// ADMIN ROUTES - ALL REQUIRE AUTHENTICATION and ADMIN ROLE
router.use(authMiddleware); // All admin routes must be authenticated

// Auth routes (login/refresh don't need role check - they're handled in auth module)
router.use('/auth', authRoutes);

// Admin-only operations require admin role
router.use('/users', roleMiddleware(ROLES.ADMIN), userRoutes);
router.use('/products', roleMiddleware(ROLES.ADMIN), productRoutes);
router.use('/categories', roleMiddleware(ROLES.ADMIN), categoryRoutes);
router.use('/orders', roleMiddleware(ROLES.ADMIN), orderRoutes);

export default router;
