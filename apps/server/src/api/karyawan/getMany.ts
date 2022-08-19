import db from '@db/prisma-client';
import { NextFunction, Request, Response } from 'express';
import { GetManyKaryawanIn } from './dto';

const getMany = async (
  req: Request<unknown, unknown, unknown, GetManyKaryawanIn>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { page, filter } = req.query;

    const pCount = db.karyawan.count({
      where: {
        nama: {
          contains: filter ? `%${filter}%` : '%',
        },
      },
    });
    const pData = db.karyawan.findMany({
      skip: (Number(page) - 1) * 10,
      take: 10,
      where: {
        nama: {
          contains: filter ? `%${filter}%` : '%',
        },
      },
      orderBy: {
        id: 'desc',
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
