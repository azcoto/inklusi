import z from 'zod';

// For Client
export const zSignInDTO = z.object({
  phone: z.string({ required_error: 'Phone is required' }),
  password: z.string({ required_error: 'Password is required' }),
});

export type SignInDTO = z.infer<typeof zSignInDTO>;

// For API Validation
export const zSignInValidator = z.object({
  query: zSignInDTO,
});

export const zSignInResponse = z.object({
  user: z.object({
    nip: z.string(),
    nama: z.string(),
    telp: z.string(),
    jabatan: z.string(),
  }),
  token: z.string(),
});

export type SignInResponse = z.infer<typeof zSignInResponse>;
