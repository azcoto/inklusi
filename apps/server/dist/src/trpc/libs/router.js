"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProtectedRouter = exports.createRouter = void 0;
const server_1 = require("@trpc/server");
const createRouter = () => {
    return (0, server_1.router)();
};
exports.createRouter = createRouter;
function createProtectedRouter() {
    return (0, server_1.router)().middleware(({ ctx, next }) => {
        if (ctx.user) {
            throw new server_1.TRPCError({ code: 'UNAUTHORIZED' });
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
exports.createProtectedRouter = createProtectedRouter;
