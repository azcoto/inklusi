import db from '../../../prisma/prisma-client';
import { NextFunction, Request, Response } from 'express';
import { zAllAsuransiResponse } from './dto';

const allAsuransi = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const rate = await db.asuransi.findMany();
    const parsed = zAllAsuransiResponse.parse(rate);
    return res.status(200).send(parsed);
  } catch (error) {
    return next(error);
  }
};

export default allAsuransi;
