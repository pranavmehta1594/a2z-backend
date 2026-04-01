/**
 * User Controller
 */

import { Response } from 'express';
import UserService from './user.service';
import asyncHandler from '../../utils/asyncHandler';
import { successResponse } from '../../utils/apiResponse';
import { AuthRequest } from '../../middlewares/auth.middleware';
import { ValidatedRequest } from '../../middlewares/validate.middleware';

interface UserRequest extends AuthRequest, ValidatedRequest {}

class UserController {
  static getProfile = asyncHandler(async (req: UserRequest, res: Response) => {
    const user = await UserService.getUserById(req.user?.id as string);
    successResponse(res, 'Profile retrieved successfully', user);
  });

  static updateProfile = asyncHandler(async (req: UserRequest, res: Response) => {
    const user = await UserService.updateProfile(req.user?.id as string, req.validated);
    successResponse(res, 'Profile updated successfully', user);
  });

  static changePassword = asyncHandler(async (req: UserRequest, res: Response) => {
    const { oldPassword, newPassword } = req.validated;
    const result = await UserService.changePassword(req.user?.id as string, oldPassword, newPassword);
    successResponse(res, result.message);
  });

  static getAllUsers = asyncHandler(async (req: UserRequest, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const result = await UserService.getAllUsers(page, limit);
    successResponse(res, 'Users retrieved successfully', result);
  });

  static deleteUser = asyncHandler(async (req: UserRequest, res: Response) => {
    const result = await UserService.deleteUser(req.params.id);
    successResponse(res, result.message);
  });
}

export default UserController;
