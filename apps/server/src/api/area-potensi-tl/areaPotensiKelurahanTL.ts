import db from '@db/prisma-client';
import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import { join } from 'path';
import { DataPotensiKelurahanTL, zDataPotensiKelurahanTL } from './dto';

const areaPotensiKelurahanTL = async (
  req: Request<{ tlNIP: string; dati2: string; dati3: string }>,
  res: Response,
) => {
  const { tlNIP, dati2, dati3 } = req.params;
  const areaKerjaTL = await db.$queryRaw<DataPotensiKelurahanTL>(
    Prisma.sql`select sq.dati4, sq.count_potensi as cnt
      from tl_city tc 
      join(
        select dati2, dati3, dati4, sum(count_potensi) as count_potensi
        from distribusi
        where dati3 = ${dati3}
        group by dati2, dati3, dati4
      ) as sq
      on tc.dati2 = sq.dati2
      where tc."tlNIP" = ${tlNIP}
      and tc.dati2 = ${dati2}`,
  );
  const parsed = zDataPotensiKelurahanTL.parse(areaKerjaTL);

  return res.status(200).send(parsed);
};

export default areaPotensiKelurahanTL;
