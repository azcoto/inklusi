import db from '@db/prisma-client';
import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import { AssignVisitBody, AssignVisitParams } from './dto';

type DataSchema = Prisma.VisitCreateManyInput[];
const assignVisit = async (
  req: Request<AssignVisitParams, any, AssignVisitBody>,
  res: Response,
) => {
  const { nipTl, nipSo } = req.params;
  const { nopen } = req.body;
  const d: DataSchema = nopen.map((o) => ({
    nipTl: nipTl,
    nipSo,
    notas: o,
  }));

  const qVisit = db.visit.createMany({
    data: d,
  });

  const qMaspen = db.maspen.updateMany({
    where: {
      notas: {
        in: nopen,
      },
    },
    data: {
      onVisit: true,
    },
  });
  const [_resVisit, _resMaspen] = await db.$transaction([qVisit, qMaspen]);
  return res.status(200).send({
    message: 'Success',
  });
};

export default assignVisit;
