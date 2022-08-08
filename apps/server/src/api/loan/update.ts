import db from '@db/prisma-client';
import { NextFunction, Request, Response } from 'express';
import { UpdateLoanIn, UpdateLoanParams } from './dto';

const update = async (
  req: Request<UpdateLoanParams, UpdateLoanIn>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { noPengajuan } = req.params;
    const updated = await db.loan.update({
      data: {
        ...req.body,
        updatedAt: new Date(),
      },
      where: {
        noPengajuan,
      },
    });
    res.status(201).json(updated);
  } catch (e) {
    next(e);
  }
};

export default update;
