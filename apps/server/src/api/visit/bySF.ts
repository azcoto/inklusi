import db from '@db/prisma-client';
import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import { waitForDebugger } from 'inspector';
import { BySFParams } from './dto';

type DataSchema = Prisma.VisitCreateManyInput[];
const bySF = async (req: Request<BySFParams>, res: Response) => {
  const { nipSo } = req.params;
  const result = await db.visit.findMany({
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
      visited: false,
      nipSo,
    },
  });
  return res.status(200).send(result);
};

export default bySF;
