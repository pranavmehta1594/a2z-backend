/**
 * Authentication Service
 * Business logic for authentication
 */

import bcrypt from 'bcryptjs';
import User, { IUser } from '../user/user.model';
import { generateTokens, type TokenPayload } from '../../utils/generateToken';
import config from '../../config/env';

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface LoginResponse {
  user: Partial<IUser>;
  accessToken: string;
  refreshToken: string;
}

class AuthService {
  static async register(userData: RegisterData): Promise<Partial<IUser>> {
    const { name, email, password } = userData;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, config.BCRYPT_ROUNDS);

    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    return this._sanitizeUser(user);
  }

  static async login(email: string, password: string): Promise<LoginResponse> {
    // Find user by email
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    if (!user.isActive) {
      throw new Error('User account is inactive');
    }

    // Generate tokens
    const payload: TokenPayload = {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    };
    const tokens = generateTokens(payload);

    return {
      user: this._sanitizeUser(user),
      ...tokens,
    };
  }

  private static _sanitizeUser(user: IUser): Partial<IUser> {
    const userObj = user.toObject();
    delete userObj.password;
    return userObj;
  }
}

export default AuthService;
