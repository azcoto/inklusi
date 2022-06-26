import db from '@db/prisma-client';
import { Request, Response } from 'express';
import { SoOfTlParams } from './dto';

const soOfTl = async (req: Request<SoOfTlParams>, res: Response) => {
  const { nipTl } = req.params;
  const so = await db.karyawan.findMany({
    select: {
      nip: true,
      nama: true,
    },
    where: {
      nipAtasan: nipTl,
    },
  });

  return res.status(200).send(so);
};

export default soOfTl;
