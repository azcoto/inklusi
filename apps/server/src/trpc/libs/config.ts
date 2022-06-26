import { SignOptions } from 'jsonwebtoken';

export const secret = process.env.SECRET ?? '';
export const refreshSecret = process.env.REFRESH_SECRET ?? '';
export const environment = process.env.NODE_ENV ?? '';
export const jwtOptions: SignOptions = {
  algorithm: 'HS256',
  expiresIn: '1m',
};

export const jwtRefreshOptions: SignOptions = {
  algorithm: 'HS256',
  expiresIn: '7d',
};
