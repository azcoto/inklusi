import db from '../../../prisma/prisma-client';
import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import { PatchVisitBody } from './dto';

const patchVisit = async (
  req: Request<any, any, PatchVisitBody>,
  res: Response,
) => {
  const { id, alamatValid, interaksi, prospek, alasan } = req.body;
  const result = await db.visit.update({
    data: {
      alamatValid,
      interaksi,
      prospek,
      alasan,
      visited: true,
      Maspen: {
        update: {
          onVisit: false,
        },
      },
    },
    where: {
      id,
    },
  });
  return res.status(200).send({
    message: 'Success',
  });
};

export default patchVisit;
