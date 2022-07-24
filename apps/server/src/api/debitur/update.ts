import db from '@db/prisma-client';
import { NextFunction, Request, Response } from 'express';
import { UpdateDebiturIn, UpdateDebiturParams } from './dto';
import { genCIF } from './genCIF';

const update = async (
  req: Request<UpdateDebiturParams, UpdateDebiturIn>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { cif } = req.params;
    const updated = await db.debitur.update({
      data: {
        ...req.body,
        updatedAt: new Date(),
      },
      where: {
        cif,
      },
    });
    res.status(201).json(updated);
  } catch (e) {
    next(e);
  }
};

export default update;
