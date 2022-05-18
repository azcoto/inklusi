import z from 'zod';

// For Client
export const zSignInForm = z.object({
  phone: z.string({ required_error: 'Phone is required' }),
  password: z.string({ required_error: 'Password is required' }),
});

export type SignInForm = z.infer<typeof zSignInForm>;

// For API Validation
export const zSignInDto = z.object({
  body: zSignInForm,
});

export type SignInDto = z.infer<typeof zSignInDto>;

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
