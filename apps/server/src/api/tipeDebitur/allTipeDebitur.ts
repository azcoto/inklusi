import db from '../../../prisma/prisma-client';
import { NextFunction, Request, Response } from 'express';

const allTipeDebitur = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const tipeDebitur = await db.tipeDebitur.findMany();
    return res.status(200).send(tipeDebitur);
  } catch (error) {
    return next(error);
  }
};

export default allTipeDebitur;
