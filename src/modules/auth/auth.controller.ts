import { Response } from 'express';
import AuthService from './auth.service';
import asyncHandler from '../../utils/asyncHandler';
import { successResponse } from '../../utils/apiResponse';
import { ValidatedRequest } from '../../middlewares/validate.middleware';

class AuthController {
  static register = asyncHandler(async (req: ValidatedRequest, res: Response) => {
    const { name, email, password } = req.validated;
    const user = await AuthService.register({ name, email, password });
    successResponse(res, 'User registered successfully', user, 201);
  });

  static login = asyncHandler(async (req: ValidatedRequest, res: Response) => {
    const { email, password } = req.validated;
    const result = await AuthService.login(email, password);
    successResponse(res, 'Login successful', result);
  });

  static logout = asyncHandler(async (_req: ValidatedRequest, res: Response) => {
    // TODO: Implement logout logic (blacklist token, etc.)
    successResponse(res, 'Logout successful');
  });
}

export default AuthController;
