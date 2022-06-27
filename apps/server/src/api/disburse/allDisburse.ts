import db from '../../../prisma/prisma-client';
import { NextFunction, Request, Response } from 'express';
import { PutDisburseBody } from './dto';

const allDisburse = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const all = await db.disburse.findMany({
      include: {
        TipeDebitur: true,
        Produk: true,
        Cabang: true,
        KaryawanTl: true,
        KaryawanMr: true,
      },
      where: {
        deleted: false,
      },
    });
    return res.status(200).send(all);
  } catch (error) {
    return next(error);
  }
};

export default allDisburse;
