import db from '@db/prisma-client';
import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import { DataPotensiKotaTL, zDataPotensiKotaTL } from './dto';

const areaPotensiKotaTL = async (
  req: Request<{ nip: string }>,
  res: Response,
) => {
  const { nip } = req.params;
  const areaKerjaTL = await db.$queryRaw<DataPotensiKotaTL>(
    Prisma.sql`select sq.dati2, sq.count_potensi as cnt
      from leader l 
      join(
        select dati2, sum(count_potensi) as count_potensi
        from distribusi
        group by dati2
      ) as sq
      on l.dati2 = sq.dati2
      where l.nip = ${nip}`,
  );
  const parsed = zDataPotensiKotaTL.parse(areaKerjaTL);

  return res.status(200).send(parsed);
};

export default areaPotensiKotaTL;
