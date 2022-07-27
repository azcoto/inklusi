import { Prisma } from '@prisma/client';
import { optional, z } from 'zod';
import { parseISO, isValid } from 'date-fns';

const zCreateLoanBody = z.object({
  cif: z.string().length(6, 'Invalid CIF'),
  tglPengajuan: z.string().refine((s) => isValid(parseISO(s))),
  jenisPk: z.string().length(1, 'Invalid Jenis PK'),
  plafond: z.number().positive().optional(),
  plafondPengajuan: z.number().positive(),
  angsuran: z.number().positive().optional(),
  angsuranPengajuan: z.number().positive(),
  tenor: z.number().positive().lte(300).optional(),
  tenorPengajuan: z.number().positive().lte(300),
  tipeDebiturId: z.number().positive().int(),
  produkId: z.number().positive().int(),
  takeover: z.boolean(),
  pelunasan: z.number().positive().optional(),
  bankPelunasan: z.string().length(1).optional(),
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
  'plafondPengajuan' | 'angsuranPengajuan' | 'plafond' | 'angsuran'
>;

interface CleanLoanPayload extends LoanPayload {
  plafondPengajuan: number;
  angsuranPengajuan: number;
  plafond: number | null;
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
    | 'plafondPengajuan'
    | 'angsuranPengajuan'
    | 'pelunasan'
    | 'plafond'
    | 'angsuran'
  > {
  plafondPengajuan: number;
  angsuranPengajuan: number;
  pelunasan: number | null;
  plafond: number | null;
  angsuran: number | null;
}
