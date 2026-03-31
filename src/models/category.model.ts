/**
 * Category Model
 */

import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  category_id?: number;
  description?: string;
  image?: string;
  slug: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    category_id: {
      type: Number,
      unique: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    slug: {
      type: String,
      unique: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

import Counter from './counter.model';

categorySchema.pre('save', async function (next) {
  if (!this.isNew) {
    return next();
  }

  try {
    const counter = await Counter.findOneAndUpdate(
      { modelName: 'Category' },
      { $inc: { count: 1 } },
      { new: true, upsert: true }
    );
    this.category_id = counter?.count;
    next();
  } catch (error: any) {
    next(error);
  }
});

export default mongoose.model<ICategory>('Category', categorySchema);
