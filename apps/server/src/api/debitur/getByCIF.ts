import db from '@db/prisma-client';
import { NextFunction, Request, Response } from 'express';
import { GetDebiturIn, GetManyDebiturIn } from './dto';

const getByCIF = async (
  req: Request<GetDebiturIn>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { cif } = req.params;

    const data = await db.debitur.findUnique({
      where: {
        cif: cif,
      },
    });
    res.status(201).json(data);
  } catch (e) {
    next(e);
  }
};

export default getByCIF;
