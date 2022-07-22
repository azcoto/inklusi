import db from '@db/prisma-client';
import { NextFunction, Request, Response } from 'express';
import { CreateDebiturIn } from './dto';
import { genCIF } from './genCIF';

const create = async (
  req: Request<unknown, CreateDebiturIn>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const generatedCif = await genCIF();
    const created = await db.debitur.create({
      data: {
        cif: generatedCif,
        ...req.body,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    res.status(201).json(created);
  } catch (e) {
    next(e);
  }
};

export default create;
