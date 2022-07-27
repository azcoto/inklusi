import z from 'zod';

// For Client
export const zSignInDTO = z.object({
  phone: z.string({ required_error: 'Phone is required' }),
  password: z.string({ required_error: 'Password is required' }),
  app: z.string({ required_error: 'App is required' }),
});

export type SignInDTO = z.infer<typeof zSignInDTO>;

// For API Validation
export const zSignInValidator = z.object({
  body: zSignInDTO,
});

export const zUserCabangSignInDTO = z.object({
  nip: z.string({ required_error: 'Phone is required' }),
  pass: z.string({ required_error: 'Password is required' }),
});

export type UserCabangSignInDTO = z.infer<typeof zUserCabangSignInDTO>;

// For API Validation
export const zUserCabangSignInValidator = z.object({
  body: zUserCabangSignInDTO,
});

export const zSignInResponse = z.object({
  user: z.object({
    nip: z.string(),
    nama: z.string(),
    telp: z.string(),
    jabatan: z.string(),
    appname: z.string(),
  }),
  token: z.string(),
});

export type SignInResponse = z.infer<typeof zSignInResponse>;

export const zUserCabangSignInResponse = z.object({
  user: z.object({
    nip: z.string(),
    nama: z.string(),
    telp: z.string().optional(),
    jabatan: z.string(),
    appname: z.string(),
  }),
  token: z.string(),
});

export type UserCabangSignInResponse = z.infer<typeof zSignInResponse>;

const zRefreshResponse = z.object({
  token: z.string(),
});

const zJWTData = zSignInResponse.shape.user;
export type JWTData = z.infer<typeof zJWTData>;
export type RefreshResponse = z.infer<typeof zRefreshResponse>;
