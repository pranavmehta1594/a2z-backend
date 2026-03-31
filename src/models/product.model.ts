/**
 * Product Model
 */

import mongoose, { Document, Schema } from 'mongoose';
import { PRODUCT_STATUS, type ProductStatus } from '../config/constants';

export interface IReview {
  rating: number;
  comment: string;
  user?: mongoose.Types.ObjectId;
  _id?: mongoose.Types.ObjectId;
}

export interface IProduct extends Document {
  name: string;
  description?: string;
  price: number;
  discount: number;
  category: mongoose.Types.ObjectId;
  image?: string;
  images?: string[];
  stock: number;
  status: ProductStatus;
  ratings: number;
  reviews: IReview[];
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    image: {
      type: String,
    },
    images: [String],
    stock: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: Object.values(PRODUCT_STATUS),
      default: PRODUCT_STATUS.ACTIVE,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        rating: Number,
        comment: String,
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>('Product', productSchema);
