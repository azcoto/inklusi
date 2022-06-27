import db from '../../../prisma/prisma-client';
import { NextFunction, Request, Response } from 'express';

const allCabang = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const cabang = await db.cabang.findMany();
    return res.status(200).send(cabang);
  } catch (error) {
    return next(error);
  }
};

export default allCabang;
