import db from '../../../prisma/prisma-client';
import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import { ByTLParams } from './dto';

const allVisitByTl = async (req: Request<ByTLParams>, res: Response) => {
  const { nipTl } = req.params;
  const result = await db.visit.findMany({
    select: {
      id: true,
      nipSo: true,
      visited: true,
      alamatValid: true,
      interaksi: true,
      prospek: true,
      alasan: true,

      Maspen: {
        select: {
          notas: true,
          namaPenerima: true,
          tgLahirPenerima: true,
          alamat: true,
          dati4: true,
          dati3: true,
          dati2: true,
        },
      },
      soKaryawan: {
        select: {
          nip: true,
          nama: true,
        },
      },
    },
    where: {
      nipTl,
    },
    orderBy: {
      id: 'desc',
    },
  });
  return res.status(200).send(result);
};

export default allVisitByTl;
