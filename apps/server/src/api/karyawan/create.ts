import db from '@db/prisma-client';
import { NextFunction, Request, Response } from 'express';
import { CreateKaryawanIn } from './dto';

const create = async (
  req: Request<unknown, CreateKaryawanIn>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const created = await db.karyawan.create({
      data: req.body,
    });
    res.status(201).json(created);
  } catch (e) {
    next(e);
  }
};

export default create;
