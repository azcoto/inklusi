import { Decimal } from '@prisma/client/runtime';
import { z } from 'zod';

export const zAllCabangResponse = z.array(
  z.object({
    id: z.number(),
    kanwil: z.string(),
    nama: z.string(),
    tipe: z.string(),
  }),
);

export type AllCabangResponse = z.infer<typeof zAllCabangResponse>;
