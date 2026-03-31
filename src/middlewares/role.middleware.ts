/**
 * Role-Based Access Control Middleware
 */

import { Response, NextFunction } from 'express';
import { type Role } from '../config/constants';
import { AuthRequest } from './auth.middleware';

const roleMiddleware = (...allowedRoles: Role[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ message: 'User not authenticated' });
      return;
    }

    if (!allowedRoles.includes(req.user.role as Role)) {
      res.status(403).json({ message: 'Access denied. Insufficient role' });
      return;
    }

    next();
  };
};

export default roleMiddleware;
