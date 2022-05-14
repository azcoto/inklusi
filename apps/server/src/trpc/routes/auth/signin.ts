import bcrypt from 'bcrypt';
import prisma from '@libs/prisma';

import { createRouter } from '@libs/router';
import { signinSchema } from './schema';
import { TRPCError } from '@trpc/server';
import { sign, SignOptions } from 'jsonwebtoken';
import { secret } from '@libs/config';

const signin = createRouter().mutation('signin', {
  input: signinSchema,
  async resolve({ input, ctx }) {
    const { phone, password } = input;
    const user = await prisma.users.findUnique({
      where: {
        notelp_appname: { notelp: phone, appname: 'sms-fe' },
      },
      select: {
        password: true,
        karyawan: {
          select: {
            nip: true,
            nama: true,
            jabatan: true,
          },
        },
      },
    });
    if (!user) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        cause: 'User not found',
        message: 'User not found',
      });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        cause: 'Invalid password',
        message: 'Invalid password',
      });
    }
    const signOptions: SignOptions = {
      algorithm: 'HS256',
      expiresIn: '1m',
    };

    ctx.res.cookie('token', sign(user.karyawan, secret, signOptions));
    return {
      message: 'Successfully signed in',
    };
  },
});

export default signin;
