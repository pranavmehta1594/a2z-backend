/**
 * Category Controller
 */

import { Response } from 'express';
import Category from './category.model';
import asyncHandler from '../../utils/asyncHandler';
import { successResponse, errorResponse } from '../../utils/apiResponse';
import { AuthRequest } from '../../middlewares/auth.middleware';
import { ValidatedRequest } from '../../middlewares/validate.middleware';

interface CategoryRequest extends AuthRequest, ValidatedRequest {}

class CategoryController {
  static createCategory = asyncHandler(async (req: CategoryRequest, res: Response) => {
    
    const { name, description, image } = req.body;
    const slug = name.toLowerCase().replace(/\s+/g, '-');

    const category = new Category({ name, description, image, slug });
    await category.save();

    successResponse(res, 'Category created successfully', category, 201);
  });

  static getAllCategories = asyncHandler(async (_req: CategoryRequest, res: Response) => {
    const categories = await Category.find({ isActive: true });
    successResponse(res, 'Categories retrieved successfully', categories);
  });

  static getCategoryById = asyncHandler(async (req: CategoryRequest, res: Response) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
      errorResponse(res, 'Category not found', 404);
      return;
    }
    successResponse(res, 'Category retrieved successfully', category);
  });

  static updateCategory = asyncHandler(async (req: CategoryRequest, res: Response) => {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!category) {
      errorResponse(res, 'Category not found', 404);
      return;
    }
    successResponse(res, 'Category updated successfully', category);
  });

  static deleteCategory = asyncHandler(async (req: CategoryRequest, res: Response) => {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      errorResponse(res, 'Category not found', 404);
      return;
    }
    successResponse(res, 'Category deleted successfully');
  });
}

export default CategoryController;
