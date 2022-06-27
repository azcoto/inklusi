import prisma from '@libs/prisma';
import { NextFunction, Request, Response } from 'express';
import { IndeksPengaliParams, zGetProdukResponse } from './dto';

const getIndeksPengali = async (
  req: Request<IndeksPengaliParams>,
  res: Response,
  next: NextFunction,
) => {
  const { produkId, tenor } = req.params;

  try {
    const pengali = await prisma.indeksPengali.findFirst({
      where: {
        tenor: Number(tenor),
        produkId: Number(produkId),
      },
    });
    return res.status(200).send(pengali);
  } catch (error) {
    return next(error);
  }
};

export default getIndeksPengali;
