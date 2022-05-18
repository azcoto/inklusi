import { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import { inferAsyncReturnType } from '@trpc/server';
import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
declare const appUser: {
    select: {
        nip: true;
        nama: true;
        jabatan: true;
    };
};
declare type AppUser = Prisma.KaryawanGetPayload<typeof appUser>;
declare type CustomContext = {
    req: Request;
    res: Response;
    user?: AppUser;
};
export declare const createContext: ({ req, res }: CreateExpressContextOptions) => CustomContext;
export declare type Context = inferAsyncReturnType<typeof createContext>;
export {};
//# sourceMappingURL=context.d.ts.map