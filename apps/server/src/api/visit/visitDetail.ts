import db from '../../../prisma/prisma-client';
import { Request, Response } from 'express';
import { VisitDetailParams } from './dto';

const visitDetail = async (req: Request<VisitDetailParams>, res: Response) => {
  const { nipSo, notas } = req.params;
  const result = await db.visit.findFirst({
    select: {
      id: true,
      nipSo: true,
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
    },
    where: {
      nipSo,
      notas,
    },
  });
  return res.status(200).send(result);
};

export default visitDetail;
