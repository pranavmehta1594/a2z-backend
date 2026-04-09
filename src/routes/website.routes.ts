import { Router } from 'express';
import productRoutes from '../modules/product/product.routes';
import orderRoutes from '../modules/order/order.routes';
import authRoutes from '../modules/auth/auth.routes';
import websitecategoryroutes from '../modules/category/category.website.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/categories', websitecategoryroutes);
router.use('/orders', orderRoutes);

export default router;
