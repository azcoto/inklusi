import bcrypt from 'bcrypt';
import db from '@db/prisma-client';
import { Request, Response } from 'express';
import { SignInDto } from './dto';
import { sign, SignOptions } from 'jsonwebtoken';
import { secret } from '@libs/config';

const signIn = async (
  req: Request<unknown, unknown, SignInDto['body']>,
  res: Response,
) => {
  console.log(req.body);
  const { phone, password } = req.body;
  const user = await db.users.findUnique({
    select: {
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
        appname: 'sms-fe',
      },
    },
  });

  if (!user)
    return res
      .status(400)
      .send({ from: 'API Handler', data: { message: 'User Not Found' } });
  if (!bcrypt.compareSync(password, user.password))
    return res.status(400).send({ error: 'Wrong Password' });

  const jwtOptions: SignOptions = {
    algorithm: 'HS256',
    expiresIn: '1m',
  };

  return res
    .status(200)
    .send({
      user: user.karyawan,
      token: sign(user.karyawan, secret, jwtOptions),
    });
};

export default signIn;
