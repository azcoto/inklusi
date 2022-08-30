import db from '../../../prisma/prisma-client';
import {
  environment,
  jwtOptions,
  jwtRefreshOptions,
  refreshSecret,
  secret,
} from '../../trpc/libs/config';
import { NextFunction, Request, Response } from 'express';
import { JsonWebTokenError, JwtPayload, sign, verify } from 'jsonwebtoken';
import { AuthError } from '../errorHandler';

export const refresh = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization!.split(' ')[1];
    let decAccess;
    verify(token, secret, (err, decoded) => {
      if (!err) {
        throw new AuthError({
          code: 401,
          name: 'STILL_VALID',
          message: 'Token still valid',
        });
      }
      decAccess = decoded as JwtPayload;
    });

    const decRefresh = verify(
      req.cookies['refreshToken'] as string,
      refreshSecret,
    ) as JwtPayload;

    const user = await db.users.findUnique({
      select: {
        karyawan: {
          select: {
            nip: true,
            nama: true,
            notelp: true,
            jabatan: true,
          },
        },
        appname: true,
        enabled: true,
      },
      where: {
        notelp_appname: {
          notelp: decRefresh['nip'],
          appname: decRefresh['appname'],
        },
      },
    });

    if (!user?.enabled)
      throw new AuthError({
        code: 401,
        name: 'USER_DISABLED',
        message: 'User disabled',
      });

    res.cookie(
      'refreshToken',
      sign(
        { appname: user.appname, ...user.karyawan },
        refreshSecret,
        jwtRefreshOptions,
      ),
      {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: environment === 'production' ? true : false,
        sameSite: 'strict',
      },
    );
    return res.status(200).send({
      user: user.karyawan,
      token: sign(
        { appname: user.appname, ...user.karyawan },
        secret,
        jwtOptions,
      ),
    });
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      next(
        new AuthError({
          code: 401,
          name: 'INVALID_TOKEN',
          message: 'Invalid Token',
        }),
      );
    } else if (error instanceof AuthError) {
      next(error);
    }
    next(error);
  }
};
