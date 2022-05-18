"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_client_1 = __importDefault(require("@db/prisma-client"));
const auth_1 = __importDefault(require("./auth"));
const apiRouter = (0, express_1.Router)();
apiRouter.get('/', async (_, res) => {
    const users = await prisma_client_1.default.users.findMany({});
    return res.status(200).send(users);
});
apiRouter.use('/auth', auth_1.default);
exports.default = apiRouter;
