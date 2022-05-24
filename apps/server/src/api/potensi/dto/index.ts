import { Prisma } from '@prisma/client';
import z from 'zod';

export const zGetPotensiByAreaDTO = z.object({
  kota: z.string(),
  kecamatan: z.string(),
  kelurahan: z.string(),
  page: z.string().regex(/^\d+$/),
});

export const zGetPotensiByAreaValidator = z.object({
  query: zGetPotensiByAreaDTO,
});

export type GetPotensiByAreaDTO = z.infer<typeof zGetPotensiByAreaDTO>;

export const selectPotensiByArea = Prisma.validator<Prisma.MaspenSelect>()({
  namaPenerima: true,
  tgLahirPenerima: true,
  notas: true,
  alamat: true,
  dati2: true,
  dati3: true,
  dati4: true,
});

export const argsPotensiByArea = Prisma.validator<Prisma.MaspenArgs>()({
  select: selectPotensiByArea,
});

export type PotensiDTO = Prisma.MaspenGetPayload<typeof argsPotensiByArea>;
