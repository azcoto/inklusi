import db from '../../../prisma/prisma-client';
import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import { ByTLParams, SummaryByTLResponse } from './dto';

const summaryByTL = async (req: Request<ByTLParams>, res: Response) => {
  const { nipTl } = req.params;
  const result = await db.$queryRaw<SummaryByTLResponse>(
    Prisma.sql`SELECT karyawan.nama as nama,
        count(case when visit.visited = true then 1 end)::int as feedback,
        count(case when visit.visited = false then 1 end)::int  as pending,
        count(case when visit."alamatValid" = false  then 1 end)::int  as "alamatTidakValid",
        count(case when visit.interaksi = false  then 1 end)::int  as "tidakInteraksi",
        count(case when prospek = 'Tidak Dapat Dilayani' then 1 end)::int  as "tidakDapatDilayani",
        count(case when prospek = 'Tidak Berminat' then 1 end)::int  as "tidakBerminat",
        count(case when prospek = 'Ragu-Ragu' then 1 end)::int  as "raguRagu",
        count(case when prospek = 'Berminat' then 1 end)::int  as berminat
      FROM visit
      INNER JOIN karyawan AS karyawan
          ON karyawan.nip = visit.nip_so
      WHERE visit.nip_tl like ${nipTl}
      GROUP BY karyawan.nama ;`,
  );
  console.log(result);
  return res.status(200).send(result);
};

export default summaryByTL;
