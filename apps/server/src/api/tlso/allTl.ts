import db from '@db/prisma-client';
import { Request, Response } from 'express';

const allTl = async (req: Request, res: Response) => {
  const tl = await db.karyawan.findMany({
    select: {
      nip: true,
      nama: true,
    },
    where: {
      jabatan: 'TL',
    },
  });

  return res.status(200).send(tl);
};

export default allTl;
