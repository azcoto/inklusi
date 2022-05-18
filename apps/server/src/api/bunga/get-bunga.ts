import prisma from '@libs/prisma';
import { NextFunction, Request, Response } from 'express';
import { zGetBungaResponse } from './dto';

const getBunga = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const bunga = await prisma.bunga.findMany();
    const parsed = zGetBungaResponse.parse(bunga);
    return res.status(200).send(parsed);
  } catch (error) {
    return next(error);
  }
};

export default getBunga;
