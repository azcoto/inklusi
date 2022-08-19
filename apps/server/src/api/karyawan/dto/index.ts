import { Prisma } from '@prisma/client';
import { z } from 'zod';

export const zPutKaryawanBody = z.object({
  nip: z.string(),
  nik: z.string(),
  nama: z.string(),
  alamat: z.string(),
  dati4: z.string(),
  dati3: z.string(),
  dati2: z.string(),
  dati1: z.string(),
  notelp: z.string(),
  jabatan: z.string(),
  nipAtasan: z.string().optional(),
});

export type CreateKaryawanIn = z.infer<typeof zPutKaryawanBody>;
export type CreateKaryawanOut = Prisma.KaryawanCreateInput;

export const zGetManyKaryawanParams = z.object({
  page: z.string(),
  filter: z.string().optional(),
});

export type GetManyKaryawanIn = z.infer<typeof zGetManyKaryawanParams>;
const getManyKaryawanOut = Prisma.validator<Prisma.KaryawanFindManyArgs>()({});
export type GetManykaryawanOut = {
  count: number;
  data: Prisma.KaryawanGetPayload<typeof getManyKaryawanOut>[];
};

export const zGetKaryawanParams = z.object({
  nip: z.string(),
});

export type GetKaryawanIn = z.infer<typeof zGetKaryawanParams>;
const getKaryawanOut = Prisma.validator<Prisma.KaryawanArgs>()({});

export type GetKaryawanOut = Prisma.KaryawanGetPayload<typeof getKaryawanOut>;
