import mongoose from 'mongoose';
import Product, { IProduct } from './product.model';
import Category from '../category/category.model';

interface PaginationResult {
  products: IProduct[];
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

class ProductService {
  private static async resolveCategory(categoryRef: any): Promise<mongoose.Types.ObjectId | null> {
    if (!categoryRef) return null;

    // Check if it's already a valid MongoDB ObjectId
    if (mongoose.isValidObjectId(categoryRef)) {
      return categoryRef as any;
    }

    // Try finding by category_id (numeric) or name
    const query = isNaN(Number(categoryRef))
      ? { name: categoryRef }
      : { category_id: Number(categoryRef) };

    const category = await Category.findOne(query);
    return category ? (category._id as any) : null;
  }

  static async createProduct(productData: any): Promise<IProduct | null> {
    const categoryId = await this.resolveCategory(productData.category);
    if (categoryId) {
      productData.category = categoryId;
    }

    const product = new Product(productData);
    await product.save();
    return product.populate('category');
  }

  static async getProductById(productId: string): Promise<IProduct | null> {
    const product = await Product.findById(productId).populate('category');
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  static async getAllProducts(page: number = 1, limit: number = 10, filter: any = {}): Promise<PaginationResult> {
    const skip = (page - 1) * limit;
    const products = await Product.find(filter)
      .populate('category')
      .skip(skip)
      .limit(limit);
    const total = await Product.countDocuments(filter);

    return {
      products,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    };
  }

  static async updateProduct(productId: string, updateData: any): Promise<IProduct | null> {
    if (updateData.category) {
      const categoryId = await this.resolveCategory(updateData.category);
      if (categoryId) {
        updateData.category = categoryId;
      }
    }

    const product = await Product.findByIdAndUpdate(productId, updateData, { new: true }).populate('category');
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  static async deleteProduct(productId: string): Promise<MessageResponse> {
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      throw new Error('Product not found');
    }
    return { message: 'Product deleted successfully' };
  }

  static async getTopProducts(limit: number = 10): Promise<IProduct[]> {
    return Product.find()
      .sort({ ratings: -1 })
      .limit(limit)
      .populate('category');
  }
}

export default ProductService;
