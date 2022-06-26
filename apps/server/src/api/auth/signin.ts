import bcrypt from 'bcrypt';
import db from '@db/prisma-client';
import { NextFunction, Request, Response } from 'express';
import { SignInDTO } from './dto';
import { sign, SignOptions } from 'jsonwebtoken';
import {
  environment,
  jwtOptions,
  jwtRefreshOptions,
  refreshSecret,
  secret,
} from '@libs/config';
import { ApiError } from '../errorHandler';

const signIn = async (
  req: Request<unknown, unknown, SignInDTO>,
  res: Response,
  next: NextFunction,
) => {
  const { phone, password, app } = req.body;
  try {
    const user = await db.users.findUnique({
      select: {
        appname: true,
        password: true,
        karyawan: {
          select: {
            nip: true,
            nama: true,
            notelp: true,
            jabatan: true,
          },
        },
      },
      where: {
        notelp_appname: {
          notelp: phone,
          appname: app,
        },
      },
    });

    if (!user)
      throw new ApiError({
        code: 401,
        name: 'USER_NOT_FOUND',
        message: 'User not found',
      });
    if (!bcrypt.compareSync(password, user.password))
      throw new ApiError({
        code: 401,
        name: 'WRONG_PASSWORD',
        message: 'Wrong Password',
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
        httpOnly: environment === 'production' ? true : false,
        secure: environment === 'production' ? true : false,
        // sameSite: environment === 'production' ? 'strict' : 'none',
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
    next(error);
  }
};

export default signIn;
