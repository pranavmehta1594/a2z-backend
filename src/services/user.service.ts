/**
 * User Service
 * Business logic for user management
 */

import bcrypt from 'bcryptjs';
import User, { IUser } from '../models/user.model';
import config from '../config/env';

interface PaginationResult {
  users: IUser[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

interface MessageResponse {
  message: string;
}

class UserService {
  static async getUserById(userId: string): Promise<IUser> {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  static async updateProfile(userId: string, updateData: Partial<IUser>): Promise<IUser | null> {
    const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  static async changePassword(userId: string, oldPassword: string, newPassword: string): Promise<MessageResponse> {
    const user = await User.findById(userId).select('+password');
    if (!user) {
      throw new Error('User not found');
    }

    // Check if oldPassword matches
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      throw new Error('Old password is incorrect');
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, config.BCRYPT_ROUNDS);
    user.password = hashedPassword;
    await user.save();

    return { message: 'Password changed successfully' };
  }

  static async getAllUsers(page: number = 1, limit: number = 10): Promise<PaginationResult> {
    const skip = (page - 1) * limit;
    const users = await User.find().skip(skip).limit(limit);
    const total = await User.countDocuments();

    return {
      users,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    };
  }

  static async deleteUser(userId: string): Promise<MessageResponse> {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return { message: 'User deleted successfully' };
  }
}

export default UserService;
