import db from '@db/prisma-client';
import { NextFunction, Request, Response } from 'express';
import { CreateLoanIn, CreateLoanOut } from './dto';
import { genNoPengajuan } from './genNoPengajuan';

const create = async (
  req: Request<unknown, CreateLoanIn>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const generatedNoPengajuan = await genNoPengajuan();
    console.log(req.body);
    const created = await db.loan.create({
      data: {
        noPengajuan: generatedNoPengajuan,
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
