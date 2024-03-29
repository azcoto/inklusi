import db from '../../../prisma/prisma-client';
import { Request, Response } from 'express';

const allTl = async (req: Request, res: Response) => {
  const tl = await db.karyawan.findMany({
    select: {
      nip: true,
      nama: true,
    },
    where: {
      jabatan: 'TL',
      aktif: true,
    },
  });

  return res.status(200).send(tl);
};

export default allTl;
