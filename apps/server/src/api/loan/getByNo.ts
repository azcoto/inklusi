import db from '@db/prisma-client';
import { NextFunction, Request, Response } from 'express';
import { GetLoanIn, GetLoanOut } from './dto';

const getByCIF = async (
  req: Request<GetLoanIn>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { noPengajuan } = req.params;

    const data = await db.loan.findUnique({
      include: {
        Debitur: true,
        TipeDebitur: true,
        Produk: true,
        KaryawanTL: true,
        KaryawanMR: true,
        Cabang: true,
      },
      where: {
        noPengajuan: noPengajuan,
      },
    });
    res.status(201).json(data);
  } catch (e) {
    next(e);
  }
};

export default getByCIF;
