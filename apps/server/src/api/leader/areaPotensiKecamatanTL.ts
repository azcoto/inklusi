import db from '../../../prisma/prisma-client';
import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import { join } from 'path';
import { DataPotensiKecamatanTL, zDataPotensiKecamatanTL } from './dto';

const areaPotensiKecamatanTL = async (
  req: Request<{ tlNIP: string }, unknown, unknown, { dati2: string }>,
  res: Response,
) => {
  const { tlNIP } = req.params;
  const { dati2 } = req.query;
  const areaKerjaTL = await db.$queryRaw<DataPotensiKecamatanTL>(
    Prisma.sql`select sq.dati3, sq.count_potensi as cnt
      from leader l 
      join(
        select dati2, dati3, sum(count_potensi)::int as count_potensi
        from distribusi
        group by dati2, dati3
      ) as sq
      on l.dati2 = sq.dati2
      where l.nip = ${tlNIP}
      and l.dati2 = ${dati2}
      order by sq.count_potensi desc`,
  );
  const parsed = zDataPotensiKecamatanTL.parse(areaKerjaTL);

  return res.status(200).send(parsed);
};

export default areaPotensiKecamatanTL;
