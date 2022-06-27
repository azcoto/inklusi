import { Decimal } from '@prisma/client/runtime';
import { z } from 'zod';

export const zGetProdukResponse = z.array(
  z.object({
    id: z.number(),
    nama: z.string(),
    bunga: z.instanceof(Decimal).transform((value) => value.toNumber()),
    skema: z.string(),
  }),
);

export type GetProdukResponse = z.infer<typeof zGetProdukResponse>;

export type IndeksPengaliParams = {
  produkId: string;
  tenor: string;
};

export type IndeksPengaliResponse = {
  id: number;
  produkId: number;
  tenor: number;
  pengali: number;
};
