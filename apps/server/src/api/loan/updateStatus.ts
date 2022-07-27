import db from '@db/prisma-client';
import { NextFunction, Request, Response } from 'express';
import { UpdateStatusBodyIn, UpdateStatusParamsIn } from './dto';

const updateStatus = async (
  req: Request<UpdateStatusParamsIn, UpdateStatusBodyIn>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { noPengajuan } = req.params;

    const updatedStatus = await db.loan.update({
      data: {
        updatedAt: new Date(),
        ...req.body,
      },
      where: {
        noPengajuan,
      },
    });
    res.status(201).json(updatedStatus);
  } catch (e) {
    next(e);
  }
};

export default updateStatus;
