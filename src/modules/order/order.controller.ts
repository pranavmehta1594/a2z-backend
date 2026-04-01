/**
 * Order Controller
 */

import { Response } from 'express';
import OrderService from './order.service';
import asyncHandler from '../../utils/asyncHandler';
import { successResponse } from '../../utils/apiResponse';
import { AuthRequest } from '../../middlewares/auth.middleware';
import { ValidatedRequest } from '../../middlewares/validate.middleware';

interface OrderRequest extends AuthRequest, ValidatedRequest {}

class OrderController {
  static createOrder = asyncHandler(async (req: OrderRequest, res: Response) => {
    const orderData = {
      ...req.validated,
      user: req.user?.id,
    };
    const order = await OrderService.createOrder(orderData);
    successResponse(res, 'Order created successfully', order, 201);
  });

  static getOrderById = asyncHandler(async (req: OrderRequest, res: Response) => {
    const order = await OrderService.getOrderById(req.params.id);
    successResponse(res, 'Order retrieved successfully', order);
  });

  static getUserOrders = asyncHandler(async (req: OrderRequest, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const result = await OrderService.getUserOrders(req.user?.id as string, page, limit);
    successResponse(res, 'Orders retrieved successfully', result);
  });

  static getAllOrders = asyncHandler(async (req: OrderRequest, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const result = await OrderService.getAllOrders(page, limit);
    successResponse(res, 'Orders retrieved successfully', result);
  });

  static updateOrderStatus = asyncHandler(async (req: OrderRequest, res: Response) => {
    const { status } = req.body;
    const order = await OrderService.updateOrderStatus(req.params.id, status);
    successResponse(res, 'Order status updated successfully', order);
  });

  static deleteOrder = asyncHandler(async (req: OrderRequest, res: Response) => {
    const result = await OrderService.deleteOrder(req.params.id);
    successResponse(res, result.message);
  });
}

export default OrderController;
