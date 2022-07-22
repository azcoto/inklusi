import { Request, Response, Router } from 'express';
import db from '../../prisma/prisma-client';
import auth from './auth';
import produk from './produk';
import areaPotensiTL from './leader';
import potensi from './potensi';
import tlSo from './tlso';
import visit from './visit';
import tipeDebitur from './tipeDebitur';
import cabang from './cabang';
import disburse from './disburse';
import asuransi from './asuransi';
import indeksPengali from './indeksPengali';
import debitur from './debitur';

const apiRouter = Router();

apiRouter.get('/', async (_: Request, res: Response) => {
  const users = await db.users.findMany({});
  return res.status(200).send(users);
});

apiRouter.use('/auth', auth);
apiRouter.use('/produk', produk);
apiRouter.use('/cabang', cabang);
apiRouter.use('/leader', areaPotensiTL);
apiRouter.use('/potensi', potensi);
apiRouter.use('/visit', visit);
apiRouter.use('/tlso', tlSo);
apiRouter.use('/tipe-debitur', tipeDebitur);
apiRouter.use('/disburse', disburse);
apiRouter.use('/asuransi', asuransi);
apiRouter.use('/pengali', indeksPengali);
apiRouter.use('/debitur', debitur);

export default apiRouter;
