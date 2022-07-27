import bcrypt from 'bcrypt';
import db from '../../../prisma/prisma-client';
import { NextFunction, Request, Response } from 'express';
import { UserCabangSignInDTO } from './dto';
import { sign, SignOptions } from 'jsonwebtoken';
import {
  environment,
  jwtOptions,
  jwtRefreshOptions,
  refreshSecret,
  secret,
} from '../../trpc/libs/config';
import { ApiError } from '../errorHandler';

const signIn = async (
  req: Request<unknown, unknown, UserCabangSignInDTO>,
  res: Response,
  next: NextFunction,
) => {
  const { nip, pass } = req.body;
  try {
    const userCabang = await db.userCabang.findUnique({
      select: {
        pass: true,
        nip: true,
        nama: true,
        jabatan: true,
        Cabang: {
          select: {
            id: true,
            nama: true,
          },
        },
      },
      where: {
        nip,
      },
    });

    if (!userCabang)
      throw new ApiError({
        code: 401,
        name: 'USER_NOT_FOUND',
        message: 'User not found',
      });
    if (!bcrypt.compareSync(pass, userCabang.pass))
      throw new ApiError({
        code: 401,
        name: 'WRONG_PASSWORD',
        message: 'Wrong Password',
      });

    res.cookie(
      'refreshToken',
      sign(
        {
          appname: 'OPS',
          nip: userCabang.nip,
          nama: userCabang.nama,
          jabatan: userCabang.jabatan,
          cabangId: userCabang.Cabang.id,
        },
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
      user: {
        appname: 'OPS',
        nip: userCabang.nip,
        nama: userCabang.nama,
        jabatan: userCabang.jabatan,
        cabangId: userCabang.Cabang.id,
      },
      token: sign(
        {
          appname: 'OPS',
          nip: userCabang.nip,
          nama: userCabang.nama,
          jabatan: userCabang.jabatan,
          cabangId: userCabang.Cabang.id,
        },
        secret,
        jwtOptions,
      ),
    });
  } catch (error) {
    next(error);
  }
};

export default signIn;
