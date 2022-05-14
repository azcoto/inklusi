import { z } from 'zod';

export const signinSchema = z.object({
  phone: z.string().regex(/^081\d+$/),
  password: z.string(),
});
