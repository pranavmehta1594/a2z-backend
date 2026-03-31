/**
 * User Routes
 */

import { Router } from 'express';
import UserController from '../controllers/user.controller';
import authMiddleware from '../middlewares/auth.middleware';
import roleMiddleware from '../middlewares/role.middleware';
import validateRequest from '../middlewares/validate.middleware';
import { updateProfileValidator, changePasswordValidator } from '../validators/user.validator';
import { ROLES } from '../config/constants';

const router = Router();

router.get('/profile', authMiddleware, UserController.getProfile);
router.put(
  '/profile',
  authMiddleware,
  validateRequest(updateProfileValidator, 'body'),
  UserController.updateProfile
);
router.put(
  '/change-password',
  authMiddleware,
  validateRequest(changePasswordValidator, 'body'),
  UserController.changePassword
);

router.get('/', authMiddleware, roleMiddleware(ROLES.ADMIN), UserController.getAllUsers);
router.delete('/:id', authMiddleware, roleMiddleware(ROLES.ADMIN), UserController.deleteUser);

export default router;
