import db from '../../../prisma/prisma-client';
import { NextFunction, Request, Response } from 'express';
import { GetDisburseParam, PutDisburseBody } from './dto';

const getDisburse = async (
  req: Request<GetDisburseParam>,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    const all = await db.disburse.findUnique({
      include: {
        TipeDebitur: true,
        Produk: true,
        Cabang: true,
        KaryawanTl: true,
        KaryawanMr: true,
      },
      where: {
        id: Number(id),
      },
    });
    return res.status(200).send(all);
  } catch (error) {
    return next(error);
  }
};

export default getDisburse;
