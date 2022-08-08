import { Prisma } from '@prisma/client';
import { parseISO, isValid } from 'date-fns';

import { z } from 'zod';

const zCreateLoanBody = z.object({
  cif: z.string().length(6, 'Invalid CIF'),
  tglPengajuan: z.string().refine((s) => isValid(parseISO(s))),
  jenisPk: z.string().length(1, 'Invalid Jenis PK'),
  plafond: z.number().positive().optional(),
  angsuran: z.number().positive().nullable(),
  tenor: z.number().positive().lte(300).optional(),
  tipeDebiturId: z.number().positive().int(),
  produkId: z.number().positive().int(),
  takeover: z.boolean(),
  pelunasan: z.number().positive().optional(),
  bankPelunasan: z.string().min(1).optional(),
  tlNip: z.string().length(11),
  mrNip: z.string().length(11),
  cabangId: z.number().positive().int(),
  noRekKredit: z.string().optional(),
  status: z.string().length(1).optional(),
  keterangan: z.string().length(1).optional(),
});

export const zCreateLoanValidator = z.object({
  body: zCreateLoanBody,
});

export type CreateLoanIn = z.infer<typeof zCreateLoanBody>;
export type CreateLoanOut = Prisma.LoanCreateInput;

export const zGetManyLoanParams = z.object({
  page: z.string(),
  filter: z.string().optional(),
  cabangId: z.string().regex(new RegExp(/^\d+$/)).optional(),
  status: z.string().optional(),
});

export type GetManyLoanIn = z.infer<typeof zGetManyLoanParams>;

const getManyLoanOut = Prisma.validator<Prisma.LoanFindManyArgs>()({
  include: {
    Debitur: true,
    TipeDebitur: true,
    Produk: true,
    KaryawanTL: true,
    KaryawanMR: true,
    Cabang: true,
  },
});

type LoanPayload = Omit<
  Prisma.LoanGetPayload<typeof getManyLoanOut>,
  'plafond' | 'angsuran'
>;

interface CleanLoanPayload extends LoanPayload {
  plafond: number;
  angsuran: number | null;
}

export type GetManyLoanOut = {
  count: number;
  data: CleanLoanPayload[];
};

const zGetLoanParams = z.object({
  noPengajuan: z.string(),
});

export const zGetLoanValidator = z.object({
  params: zGetLoanParams,
});

export type GetLoanIn = z.infer<typeof zGetLoanParams>;
const getLoanOut = Prisma.validator<Prisma.LoanArgs>()({
  include: {
    Debitur: true,
    TipeDebitur: true,
    Produk: true,
    KaryawanTL: true,
    KaryawanMR: true,
    Cabang: true,
  },
});

export interface GetLoanOut
  extends Omit<
    Prisma.LoanGetPayload<typeof getLoanOut>,
    'pelunasan' | 'plafond' | 'angsuran'
  > {
  pelunasan: number | null;
  plafond: number;
  angsuran: number | null;
}

const zUpdateStatusParams = z.object({
  noPengajuan: z.string(),
});

const zUpdateStatusBody = z.object({
  keterangan: z.string(),
  plafond: z.number().optional(),
  angsuran: z.number().optional(),
  tenor: z.number().optional(),
});

export const zUpdateStatusValidator = z.object({
  params: zUpdateStatusParams,
  body: zUpdateStatusBody,
});

export type UpdateStatusParamsIn = z.infer<typeof zUpdateStatusParams>;
export type UpdateStatusBodyIn = z.infer<typeof zUpdateStatusBody>;

const updateStatusOut = Prisma.validator<Prisma.DebiturArgs>()({});
export type UpdateStatusOut = Prisma.LoanGetPayload<typeof updateStatusOut>;

export const zUpdateLoanBody = z.object({
  cif: z.string().length(6, 'Invalid CIF'),
  tglPengajuan: z.string().refine((s) => isValid(parseISO(s))),
  jenisPk: z.string().length(1, 'Invalid Jenis PK'),
  plafond: z.number().positive().optional(),
  angsuran: z.number().positive().nullable(),
  tenor: z.number().positive().lte(300).optional(),
  tipeDebiturId: z.number().positive().int(),
  produkId: z.number().positive().int(),
  takeover: z.boolean(),
  pelunasan: z.number().positive().optional(),
  bankPelunasan: z.string().min(1).optional(),
  tlNip: z.string().length(11),
  mrNip: z.string().length(11),
  cabangId: z.number().positive().int(),
  noRekKredit: z.string().optional(),
});

export const zUpdateLoanParams = z.object({
  noPengajuan: z.string(),
});

export type UpdateLoanIn = z.infer<typeof zUpdateLoanBody>;
export type UpdateLoanParams = z.infer<typeof zUpdateLoanParams>;
export type UpdateDebiturOut = Prisma.LoanUpdateInput;
