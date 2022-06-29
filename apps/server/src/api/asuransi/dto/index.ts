import { Decimal } from '@prisma/client/runtime';
import { z } from 'zod';

export const zAllAsuransiResponse = z.array(
  z.object({
    id: z.number(),
    kategori: z.string(),
    tenor: z.number(),
    rate: z.instanceof(Decimal).transform((value) => value.toNumber()),
  }),
);

export type AllAsuransiResponse = z.infer<typeof zAllAsuransiResponse>;
