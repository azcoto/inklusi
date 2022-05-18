import { Decimal } from '@prisma/client/runtime';
import { z } from 'zod';

export const zGetProdukResponse = z.array(
  z.object({
    nama: z.string(),
    rateAnuitas: z.instanceof(Decimal).transform((value) => value.toNumber()),
    rateFlat: z.instanceof(Decimal).transform((value) => value.toNumber()),
    pProvisi: z.instanceof(Decimal).transform((value) => value.toNumber()),
    pAdministrasi: z.instanceof(Decimal).transform((value) => value.toNumber()),
    cBlokir: z.number(),
  }),
);

export type GetProdukResponse = z.infer<typeof zGetProdukResponse>;
