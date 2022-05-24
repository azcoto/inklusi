import { Request, Response, Router } from 'express';
import db from '@db/prisma-client';
import auth from './auth';
import bunga from './bunga';
import produk from './produk';
import areaPotensiTL from './area-potensi-tl';
import potensi from './potensi';

const apiRouter = Router();

apiRouter.get('/', async (_: Request, res: Response) => {
  const users = await db.users.findMany({});
  return res.status(200).send(users);
});

apiRouter.use('/auth', auth);
apiRouter.use('/produk', produk);
apiRouter.use('/bunga', bunga);
apiRouter.use('/area-potensi-tl', areaPotensiTL);
apiRouter.use('/potensi', potensi);

export default apiRouter;
