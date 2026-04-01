/**
 * Order Service
 * Business logic for order management
 */

import Order, { IOrder } from './order.model';

interface PaginationResult {
  orders: IOrder[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

interface MessageResponse {
  message: string;
}

class OrderService {
  static async createOrder(orderData: Partial<IOrder>): Promise<IOrder | null> {
    const order = new Order(orderData);
    await order.save();
    return order.populate(['user', 'items.product']);
  }

  static async getOrderById(orderId: string): Promise<IOrder | null> {
    const order = await Order.findById(orderId).populate(['user', 'items.product']);
    if (!order) {
      throw new Error('Order not found');
    }
    return order;
  }

  static async getUserOrders(userId: string, page: number = 1, limit: number = 10): Promise<PaginationResult> {
    const skip = (page - 1) * limit;
    const orders = await Order.find({ user: userId })
      .populate('items.product')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    const total = await Order.countDocuments({ user: userId });

    return {
      orders,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    };
  }

  static async getAllOrders(page: number = 1, limit: number = 10): Promise<PaginationResult> {
    const skip = (page - 1) * limit;
    const orders = await Order.find()
      .populate(['user', 'items.product'])
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    const total = await Order.countDocuments();

    return {
      orders,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    };
  }

  static async updateOrderStatus(orderId: string, status: string): Promise<IOrder | null> {
    const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true }).populate([
      'user',
      'items.product',
    ]);
    if (!order) {
      throw new Error('Order not found');
    }
    return order;
  }

  static async deleteOrder(orderId: string): Promise<MessageResponse> {
    const order = await Order.findByIdAndDelete(orderId);
    if (!order) {
      throw new Error('Order not found');
    }
    return { message: 'Order deleted successfully' };
  }
}

export default OrderService;
