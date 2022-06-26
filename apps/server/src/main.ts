import express, { Application, Response } from 'express';
import { createContext } from '@libs/context';
import { appRouter } from './trpc/routes';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import { errorHandler } from './api/errorHandler';

const app: Application = express();
const port = 3003;

import * as trpcExpress from '@trpc/server/adapters/express';
import apiRouter from './api';

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:3002',
    ],
    credentials: true,
  }),
);
app.get('/', (_, res: Response) => {
  res.status(200).send('Hello World!');
});

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

app.use('/api', apiRouter);
app.use(errorHandler);
app.listen(port, 'localhost', () => {
  console.log(`Development Server Started ${port}`);
});

export default appRouter;
