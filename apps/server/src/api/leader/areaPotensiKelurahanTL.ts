import db from '../../../prisma/prisma-client';

import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import { join } from 'path';
import { DataPotensiKelurahanTL, zDataPotensiKelurahanTL } from './dto';

const areaPotensiKelurahanTL = async (
  req: Request<
    { tlNIP: string },
    unknown,
    unknown,
    { dati2: string; dati3: string }
  >,
  res: Response,
) => {
  const { tlNIP } = req.params;
  const { dati2, dati3 } = req.query;
  const areaKerjaTL = await db.$queryRaw<DataPotensiKelurahanTL>(
    Prisma.sql`select sq.dati4, sq.count_potensi as cnt
      from leader l 
      join(
        select dati2, dati3, dati4, sum(count_potensi) as count_potensi
        from distribusi
        where dati3 = ${dati3}
        group by dati2, dati3, dati4
      ) as sq
      on l.dati2 = sq.dati2
      where l.nip = ${tlNIP}
      and l.dati2 = ${dati2}
      order by sq.count_potensi desc`,
  );
  const parsed = zDataPotensiKelurahanTL.parse(areaKerjaTL);

  return res.status(200).send(parsed);
};

export default areaPotensiKelurahanTL;
