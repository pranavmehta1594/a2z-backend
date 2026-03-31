/**
 * Standardized API Response
 */

import { Response } from 'express';

const apiResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data: any = null,
  success: boolean = true
): Response => {
  return res.status(statusCode).json({
    success,
    statusCode,
    message,
    data,
  });
};

const successResponse = (
  res: Response,
  message: string,
  data: any = null,
  statusCode: number = 200
): Response => {
  return res.status(statusCode).json({
    success: true,
    statusCode,
    message,
    data,
  });
};

const errorResponse = (
  res: Response,
  message: string,
  statusCode: number = 500,
  errors: any = null
): Response => {
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errors,
  });
};

export { apiResponse, successResponse, errorResponse };
