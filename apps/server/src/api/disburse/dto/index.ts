import { Prisma } from '@prisma/client';
import { z } from 'zod';

export const zPutDisburseBody = z.object({
  nopen: z.string(),
  nama: z.string(),
  tipeDebiturId: z.number(),
  produkId: z.number(),
  tenor: z.number(),
  plafond: z.number(),
  cabangId: z.number(),
  norekKredit: z.string(),
  nikTl: z.string(),
  nikMr: z.string(),
  tgRealisasi: z.date(),
});

export const zPutDisbursevalidator = z.object({
  body: zPutDisburseBody,
});

export type PutDisburseBody = z.infer<typeof zPutDisburseBody>;
export type PutDisburseResponse = Prisma.DisburseCreateInput;

export const zPatchDisburseBody = z.object({
  id: z.number(),
  nopen: z.string(),
  nama: z.string(),
  tipeDebiturId: z.number(),
  produkId: z.number(),
  tenor: z.number(),
  plafond: z.number(),
  cabangId: z.number(),
  norekKredit: z.string(),
  nikTl: z.string(),
  nikMr: z.string(),
  tgRealisasi: z.date(),
});

export const zPatchDisbursevalidator = z.object({
  body: zPatchDisburseBody,
});

export type PatchDisburseBody = z.infer<typeof zPatchDisburseBody>;
export type PatchtDisburseResponse = Prisma.DisburseUpdateInput;

const allDisburseArgs = Prisma.validator<Prisma.DisburseArgs>()({
  include: {
    TipeDebitur: true,
    Produk: true,
    Cabang: true,
    KaryawanTl: true,
    KaryawanMr: true,
  },
});

export type AllDisburseResponse = Prisma.DisburseGetPayload<
  typeof allDisburseArgs
>[];

export const zGetDisburseParam = z.object({
  id: z.number(),
});

export const zGetDisburseValidator = z.object({
  params: zGetDisburseParam,
});

export type GetDisburseParam = z.infer<typeof zGetDisburseParam>;

export type GetDisburseResponse = Prisma.DisburseGetPayload<
  typeof allDisburseArgs
>;
