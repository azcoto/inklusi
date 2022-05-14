import { Request, Response, Router } from 'express';
import db from '@db/prisma-client';
import auth from './auth';

const apiRouter = Router();

apiRouter.get('/', async (_: Request, res: Response) => {
  const users = await db.users.findMany({});
  return res.status(200).send(users);
});

apiRouter.use('/auth', auth);

export default apiRouter;
