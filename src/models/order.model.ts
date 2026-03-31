/**
 * Order Model
 */

import mongoose, { Document, Schema } from 'mongoose';
import { ORDER_STATUS, PAYMENT_STATUS, type OrderStatus, type PaymentStatus } from '../config/constants';

export interface IOrderItem {
  product?: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
  _id?: mongoose.Types.ObjectId;
}

export interface IShippingAddress {
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}

export interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  items: IOrderItem[];
  totalAmount: number;
  shippingAddress: IShippingAddress;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
        quantity: Number,
        price: Number,
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    shippingAddress: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
    status: {
      type: String,
      enum: Object.values(ORDER_STATUS),
      default: ORDER_STATUS.PENDING,
    },
    paymentStatus: {
      type: String,
      enum: Object.values(PAYMENT_STATUS),
      default: PAYMENT_STATUS.PENDING,
    },
    paymentMethod: String,
    notes: String,
  },
  { timestamps: true }
);

export default mongoose.model<IOrder>('Order', orderSchema);
