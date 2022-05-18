import z from 'zod';

// For Client
export const zDataPotensiKotaTL = z.array(
  z.object({
    dati2: z.string(),
    cnt: z.number(),
  }),
);

export type DataPotensiKotaTL = z.infer<typeof zDataPotensiKotaTL>;

export const zDataPotensiKecamatanTL = z.array(
  z.object({
    dati3: z.string(),
    cnt: z.number(),
  }),
);

export type DataPotensiKecamatanTL = z.infer<typeof zDataPotensiKecamatanTL>;

export const zDataPotensiKelurahanTL = z.array(
  z.object({
    dati4: z.string(),
    cnt: z.number(),
  }),
);

export type DataPotensiKelurahanTL = z.infer<typeof zDataPotensiKelurahanTL>;
// // For API Validation
// export const zSignInDto = z.object({
//   body: zSignInForm,
// });

// export type SignInDto = z.infer<typeof zSignInDto>;
