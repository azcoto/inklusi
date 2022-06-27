import { z } from 'zod';

export const zAlltipeDebiturResponse = z.array(
  z.object({
    id: z.number(),
    nama: z.string(),
    kategoriAsuransi: z.string(),
  }),
);

export type AlltipeDebiturResponse = z.infer<typeof zAlltipeDebiturResponse>;
