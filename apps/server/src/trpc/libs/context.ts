import { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import { inferAsyncReturnType } from '@trpc/server';
import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
const appUser = Prisma.validator<Prisma.KaryawanArgs>()({
  select: {
    nip: true,
    nama: true,
    jabatan: true,
  },
});

type AppUser = Prisma.KaryawanGetPayload<typeof appUser>;

type CustomContext = {
  req: Request;
  res: Response;
  user?: AppUser;
};

export const createContext = ({ req, res }: CreateExpressContextOptions) => {
  const ctx: CustomContext = {
    req,
    res,
  };
  if (req.cookies?.token) {
    ctx.user = {
      nip: '12121313',
      nama: 'John Doe',
      jabatan: 'Manager',
    };
    return ctx;
  }

  return ctx;
};

export type Context = inferAsyncReturnType<typeof createContext>;
