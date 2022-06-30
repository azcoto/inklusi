import db from '../../../prisma/prisma-client';
import { NextFunction, Request, Response } from 'express';
import {} from './dto';

const allIndeksPengali = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const pengali = await db.indeksPengali.findMany();
    return res.status(200).send(pengali);
  } catch (error) {
    return next(error);
  }
};

export default allIndeksPengali;
