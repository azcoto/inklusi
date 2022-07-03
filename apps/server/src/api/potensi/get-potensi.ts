import db from '../../../prisma/prisma-client';

import { NextFunction, Request, Response } from 'express';
import { GetPotensiByAreaDTO, selectPotensiByArea } from './dto';

export const getPotensiByArea = async (
  req: Request<unknown, unknown, unknown, GetPotensiByAreaDTO>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { kota, kecamatan, kelurahan, page } = req.query;
    const result = await db.maspen.findMany({
      skip: (Number(page) - 1) * 10,
      take: 10,
      select: selectPotensiByArea,
      where: {
        dati2: kota,
        dati3: kecamatan,
        dati4: kelurahan,
      },
      orderBy: {
        tgLahirPenerima: 'desc',
      },
    });
    return res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};

export default getPotensiByArea;
