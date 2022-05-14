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
