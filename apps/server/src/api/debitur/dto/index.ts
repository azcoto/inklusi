import { Prisma } from '@prisma/client';
import { z } from 'zod';

export const zPutDisburseBody = z.object({
  nopen: z.string(),
  nik: z.string(),
  nama: z.string(),
  tempatLahir: z.string(),
  tglLahir: z.date(),
  alamat: z.string(),
  kelurahan: z.string(),
  kecamatan: z.string(),
  kota: z.string(),
  instansi: z.string().optional(),
  pangkat: z.string().optional(),
  golongan: z.string().optional(),
  bup: z.number().optional(),
  sisaMasaDinas: z.number().optional(),
  telepon: z.string(),
});

export type CreateDebiturIn = z.infer<typeof zPutDisburseBody>;
export type CreateDebiturOut = Prisma.DebiturCreateInput;

export const zGetManyDebiturParams = z.object({
  page: z.string(),
  filter: z.string().optional(),
});

export type GetManyDebiturIn = z.infer<typeof zGetManyDebiturParams>;
const getManyDebiturOut = Prisma.validator<Prisma.DebiturFindManyArgs>()({});

export type GetManyDebiturOut = {
  count: number;
  data: Prisma.DebiturGetPayload<typeof getManyDebiturOut>[];
};

export const zGetDebiturParams = z.object({
  cif: z.string(),
});

export type GetDebiturIn = z.infer<typeof zGetDebiturParams>;
const getDebiturOut = Prisma.validator<Prisma.DebiturArgs>()({});

export type GetDebiturOut = Prisma.DebiturGetPayload<typeof getDebiturOut>;
