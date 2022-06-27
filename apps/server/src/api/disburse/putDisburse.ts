import db from '../../../prisma/prisma-client';
import { NextFunction, Request, Response } from 'express';
import { PutDisburseBody } from './dto';

const putDisburse = async (
  req: Request<unknown, unknown, PutDisburseBody>,
  res: Response,
  next: NextFunction,
) => {
  const { body } = req;
  try {
    const put = await db.disburse.create({
      data: body,
    });
    return res.status(200).send(put);
  } catch (error) {
    return next(error);
  }
};

export default putDisburse;
