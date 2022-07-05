import { date, number, z } from 'zod';

// For Client
const zAssignVisitBody = z.object({
  nopen: z.array(z.string()),
});

const zAssignVisitParams = z.object({
  nipTl: z.string(),
  nipSo: z.string(),
});

export const zAssignVisitValidator = z.object({
  params: zAssignVisitParams,
  body: zAssignVisitBody,
});

export type AssignVisitBody = z.infer<typeof zAssignVisitBody>;
export type AssignVisitParams = z.infer<typeof zAssignVisitParams>;

const zBySFParams = z.object({
  nipSo: z.string(),
});

export const zBySFValidator = z.object({
  params: zBySFParams,
});

export type BySFParams = z.infer<typeof zAssignVisitParams>;

export type BySFResponse = {
  id: number;
  nipSo: string;
  Maspen: {
    notas: string;
    namaPenerima: string;
    tgLahirPenerima: Date;
    alamat: string;
    dati4: string;
    dati3: string;
    dati2: string;
  };
};

const zVisitDetailParams = z.object({
  nipSo: z.string(),
  notas: z.string(),
});

export const zVisitDetailValidator = z.object({
  params: zVisitDetailParams,
});

export type VisitDetailParams = z.infer<typeof zVisitDetailParams>;

export type VisitDetailResponse = {
  id: number;
  nipSo: string;
  Maspen: {
    notas: string;
    namaPenerima: string;
    tgLahirPenerima: Date;
    alamat: string;
    dati4: string;
    dati3: string;
    dati2: string;
  };
};

const zPatchVisitBody = z.object({
  id: z.number(),
  alamatValid: z.boolean(),
  interaksi: z.boolean(),
  prospek: z.string().nullable(),
  alasan: z.string().nullable(),
});
export const zPatchVisitValidator = z.object({
  body: zPatchVisitBody,
});

export type PatchVisitBody = z.infer<typeof zPatchVisitBody>;

const zByTLParams = z.object({
  nipTl: z.string(),
});

export const zByTLValidator = z.object({
  params: zByTLParams,
});

export type ByTLParams = z.infer<typeof zByTLParams>;

export type AllVisitByTLResponse = {
  id: number;
  nipSo: string;
  visited: boolean;
  alamatValid: boolean | null;
  interaksi: boolean | null;
  prospek: string | null;
  alasan: string | null;
  Maspen: {
    notas: string;
    namaPenerima: string;
    tgLahirPenerima: Date;
    alamat: string;
    dati4: string;
    dati3: string;
    dati2: string;
  };
  soKaryawan: {
    nip: string;
    nama: string;
  };
};
