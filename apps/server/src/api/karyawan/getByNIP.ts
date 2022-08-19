import db from '@db/prisma-client';
import { NextFunction, Request, Response } from 'express';
import { GetKaryawanIn } from './dto';

const getByNIP = async (
  req: Request<GetKaryawanIn>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { nip } = req.params;
    console.log(nip);

    const data = await db.karyawan.findUnique({
      where: {
        nip: nip,
      },
    });
    res.status(201).json(data);
  } catch (e) {
    next(e);
  }
};

export default getByNIP;
