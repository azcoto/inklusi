import { NextFunction, Request, Response } from 'express';
import { decode, JsonWebTokenError, verify } from 'jsonwebtoken';
import { JWTData, SignInResponse } from '../auth/dto';
import { secret } from '@libs/config';
import { AuthError } from '../errorHandler';

export enum Roles {
  tl = 'TL',
  so = 'SF',
  adm = 'ADM',
}
export enum AppName {
  sms = 'sms-fe',
  ops = 'ops-fe',
}

export interface RBAC {
  role: Roles[];
  appname: AppName[];
}

const authorize =
  (role: RBAC) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization!.split(' ')[1];
      const dec = verify(token, secret);
      const jwtData = dec as JWTData;
      console.log(jwtData);
      console.log(role);
      if (
        role.role.includes(jwtData.jabatan as Roles) &&
        role.appname.includes(jwtData.appname as AppName)
      )
        return next();
      throw new AuthError({
        code: 401,
        name: 'UNAUTHORIZED',
        message: 'You are not authorized to access this resource',
      });
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        if (error.message === 'jwt expired') {
          next(
            new AuthError({
              code: 401,
              name: 'JWT_EXPIRED',
              message: 'Token Expired',
            }),
          );
        }
        next(
          new AuthError({
            code: 401,
            name: 'INVALID_TOKEN',
            message: 'Invalid Token',
          }),
        );
      } else if (error instanceof TypeError || error instanceof SyntaxError) {
        next(
          new AuthError({
            code: 401,
            name: 'INVALID_HEADER',
            message: 'You are not authorized to access this resource',
          }),
        );
      } else if (error instanceof AuthError) {
        next(error);
      }
    }
  };

export default authorize;
