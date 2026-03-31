/**
 * Request Validation Middleware
 * Validates request body against a schema
 */

import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';

export interface ValidatedRequest extends Request {
  validated?: any;
}

type ValidateSource = 'body' | 'query' | 'params';

const validateRequest = (schema: Schema, source: ValidateSource = 'body') => {
  return (req: ValidatedRequest, res: Response, next: NextFunction): void => {
    const { error, value } = schema.validate(req[source], {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const messages = error.details.map((detail) => detail.message);
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: messages,
      });
      return;
    }

    req.validated = value;
    next();
  };
};

export default validateRequest;
