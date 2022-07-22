import db from '@db/prisma-client';
import { NextFunction, Request, Response } from 'express';
import { GetManyDebiturIn } from './dto';

const getMany = async (
  req: Request<unknown, unknown, unknown, GetManyDebiturIn>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { page, filter } = req.query;

    const pCount = db.debitur.count({
      where: {
        nama: {
          contains: filter ? `%${filter}%` : '%',
        },
      },
    });
    const pData = db.debitur.findMany({
      skip: (Number(page) - 1) * 10,
      take: 10,
      where: {
        nama: {
          contains: filter ? `%${filter}%` : '%',
        },
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
