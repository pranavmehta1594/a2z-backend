/**
 * Authentication Routes
 */

import { Router } from 'express';
import AuthController from './auth.controller';
import validateRequest from '../../middlewares/validate.middleware';
import { loginValidator, registerValidator } from './auth.validator';

const router = Router();

router.post('/register', validateRequest(registerValidator, 'body'), AuthController.register);
router.post('/login', validateRequest(loginValidator, 'body'), AuthController.login);
router.post('/logout', AuthController.logout);

export default router;
