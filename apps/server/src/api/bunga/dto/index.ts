import { Decimal } from '@prisma/client/runtime';
import { z } from 'zod';

export const zGetBungaResponse = z.array(
  z.object({
    rate: z.instanceof(Decimal).transform((value) => value.toNumber()),
    skema: z.string(),
  }),
);

export type GetBungaResponse = z.infer<typeof zGetBungaResponse>;
