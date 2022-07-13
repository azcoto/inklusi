import db from '../../../prisma/prisma-client';
import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import { DataPotensiKotaTL, zDataPotensiKotaTL } from './dto';

const areaPotensiKotaTL = async (
  req: Request<{ tlNIP: string }>,
  res: Response,
) => {
  const { tlNIP } = req.params;
  const areaKerjaTL = await db.$queryRaw<DataPotensiKotaTL>(
    Prisma.sql`select sq.dati2, sq.count_potensi as cnt
      from leader l 
      join(
        select dati2, sum(count_potensi) as count_potensi
        from distribusi
        group by dati2
      ) as sq
      on l.dati2 = sq.dati2
      where l.nip = ${tlNIP}
      order by sq.count_potensi desc`,
  );
  const parsed = zDataPotensiKotaTL.parse(areaKerjaTL);

  return res.status(200).send(parsed);
};

export default areaPotensiKotaTL;
