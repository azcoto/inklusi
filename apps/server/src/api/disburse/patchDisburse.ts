import db from '../../../prisma/prisma-client';
import { NextFunction, Request, Response } from 'express';
import { PatchDisburseBody } from './dto';

const patchDisburse = async (
  req: Request<unknown, unknown, PatchDisburseBody>,
  res: Response,
  next: NextFunction,
) => {
  const { body } = req;
  try {
    const put = await db.disburse.update({
      data: body,
      where: {
        id: Number(body.id),
      },
    });
    return res.status(200).send(put);
  } catch (error) {
    return next(error);
  }
};

export default patchDisburse;
