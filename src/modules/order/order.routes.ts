/**
 * Order Routes
 */

import { Router } from 'express';
import OrderController from './order.controller';
import authMiddleware from '../../middlewares/auth.middleware';
import roleMiddleware from '../../middlewares/role.middleware';
import { ROLES } from '../../config/constants';

const router = Router();

router.post('/', authMiddleware, OrderController.createOrder);
router.get('/user/my-orders', authMiddleware, OrderController.getUserOrders);
router.get('/:id', authMiddleware, OrderController.getOrderById);
router.get('/', authMiddleware, roleMiddleware(ROLES.ADMIN), OrderController.getAllOrders);
router.put('/:id', authMiddleware, roleMiddleware(ROLES.ADMIN), OrderController.updateOrderStatus);
router.delete('/:id', authMiddleware, roleMiddleware(ROLES.ADMIN), OrderController.deleteOrder);

export default router;
