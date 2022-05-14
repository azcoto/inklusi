import { router, TRPCError } from '@trpc/server';
import { Context } from '@libs/context';

export const createRouter = () => {
  return router<Context>();
};

export function createProtectedRouter() {
  return router<Context>().middleware(({ ctx, next }) => {
    if (ctx.user) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
    return next({
      ctx: {
        ...ctx,
        // infers that `user` is non-nullable to downstream procedures
        user: ctx.user,
      },
    });
  });
}
