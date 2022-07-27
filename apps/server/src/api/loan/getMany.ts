import db from '@db/prisma-client';
import { NextFunction, Request, Response } from 'express';
import { GetManyLoanIn } from './dto';

const getMany = async (
  req: Request<unknown, unknown, unknown, GetManyLoanIn>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { page, filter, cabangId } = req.query;

    const pCount = db.loan.count({
      where: {
        Debitur: {
          nama: {
            contains: filter ? `%${filter}%` : '%',
          },
        },
        ...(cabangId && { cabangId: Number(cabangId) }),
      },
    });
    const pData = db.loan.findMany({
      include: {
        Debitur: true,
        TipeDebitur: true,
        Produk: true,
        KaryawanTL: true,
        KaryawanMR: true,
      },
      skip: (Number(page) - 1) * 10,
      take: 10,
      where: {
        Debitur: {
          nama: {
            contains: filter ? `%${filter}%` : '%',
          },
        },
        ...(cabangId && { cabangId: Number(cabangId) }),
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
    const [count, data] = await db.$transaction([pCount, pData]);
    const response = {
      count,
      data,
    };
    res.status(201).json(response);
  } catch (e) {
    next(e);
  }
};

export default getMany;
