import { Prisma } from '@prisma/client';
import { z } from 'zod';

const zSoOfTlParams = z.object({
  nipTl: z.string(),
});

export const zSoOfTlValidator = z.object({
  params: zSoOfTlParams,
});

export type SoOfTlParams = z.infer<typeof zSoOfTlParams>;

const argsSoByTl = Prisma.validator<Prisma.KaryawanArgs>()({
  select: {
    nip: true,
    nama: true,
  },
});

export type GetSoByTlResponse = Prisma.KaryawanGetPayload<typeof argsSoByTl>[];
export type GetAllTlResponse = Prisma.KaryawanGetPayload<typeof argsSoByTl>[];
