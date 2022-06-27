import { createRouter } from '../libs/router';
import { auth } from './auth';
import user from './user';

export const appRouter = createRouter()
  .merge('auth.', auth)
  .merge('user.', user);

export type AppRouter = typeof appRouter;
