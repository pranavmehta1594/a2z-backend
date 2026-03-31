/**
 * JWT Token Generation
 */

import jwt from 'jsonwebtoken';
import config from '../config/env';

export interface TokenPayload {
  id: string;
  email: string;
  role: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

const generateAccessToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRE as any });
};

const generateRefreshToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, config.REFRESH_TOKEN_SECRET, { expiresIn: config.REFRESH_TOKEN_EXPIRE as any });
};

const generateTokens = (payload: TokenPayload): TokenResponse => {
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);
  return { accessToken, refreshToken };
};

const verifyToken = (token: string, secret: string = config.JWT_SECRET): jwt.JwtPayload | null => {
  try {
    return jwt.verify(token, secret) as jwt.JwtPayload;
  } catch (error) {
    return null;
  }
};

export { generateAccessToken, generateRefreshToken, generateTokens, verifyToken };
