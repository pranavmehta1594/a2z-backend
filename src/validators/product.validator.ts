/**
 * Product Validators
 */

import Joi from 'joi';

export const createProductValidator = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Product name is required',
  }),
  description: Joi.string(),
  price: Joi.number().required().positive().messages({
    'number.positive': 'Price must be a positive number',
    'any.required': 'Price is required',
  }),
  discount: Joi.number().min(0).max(100),
  category: Joi.string().required().messages({
    'any.required': 'Category is required',
  }),
  image: Joi.string(),
  images: Joi.array().items(Joi.string()),
  stock: Joi.number().min(0).optional(),
});

export const updateProductValidator = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  price: Joi.number().positive(),
  discount: Joi.number().min(0).max(100),
  category: Joi.string(),
  image: Joi.string(),
  images: Joi.array().items(Joi.string()),
  stock: Joi.number().min(0).optional(),
});
