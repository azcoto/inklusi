import prisma from '@libs/prisma';
import { NextFunction, Request, Response } from 'express';
import { zGetProdukResponse } from './dto';

const getProduk = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const produk = await prisma.produk.findMany();
    const parsed = zGetProdukResponse.parse(produk);
    return res.status(200).send(parsed);
  } catch (error) {
    return next(error);
  }
};

export default getProduk;
