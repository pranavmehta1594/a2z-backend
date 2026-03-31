/**
 * Product Controller
 */

import { Response } from 'express';
import ProductService from '../services/product.service';
import asyncHandler from '../utils/asyncHandler';
import { successResponse } from '../utils/apiResponse';
import { AuthRequest } from '../middlewares/auth.middleware';
import { ValidatedRequest } from '../middlewares/validate.middleware';

interface ProductRequest extends AuthRequest, ValidatedRequest {}

class ProductController {
  static createProduct = asyncHandler(async (req: ProductRequest, res: Response) => {
    const product = await ProductService.createProduct(req.validated);
    successResponse(res, 'Product created successfully', product, 201);
  });

  static getProductById = asyncHandler(async (req: ProductRequest, res: Response) => {
    const product = await ProductService.getProductById(req.params.id);
    successResponse(res, 'Product retrieved successfully', product);
  });

  static getAllProducts = asyncHandler(async (req: ProductRequest, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const result = await ProductService.getAllProducts(page, limit);
    successResponse(res, 'Products retrieved successfully', result);
  });

  static updateProduct = asyncHandler(async (req: ProductRequest, res: Response) => {
    const product = await ProductService.updateProduct(req.params.id, req.validated);
    successResponse(res, 'Product updated successfully', product);
  });

  static deleteProduct = asyncHandler(async (req: ProductRequest, res: Response) => {
    const result = await ProductService.deleteProduct(req.params.id);
    successResponse(res, result.message);
  });

  static getTopProducts = asyncHandler(async (req: ProductRequest, res: Response) => {
    const limit = parseInt(req.query.limit as string) || 10;
    const products = await ProductService.getTopProducts(limit);
    successResponse(res, 'Top products retrieved successfully', products);
  });
}

export default ProductController;
