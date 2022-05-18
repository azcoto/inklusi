"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const context_1 = require("@libs/context");
const routes_1 = require("./trpc/routes");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
require("dotenv/config");
const errorHandler_1 = require("./api/errorHandler");
const app = (0, express_1.default)();
const port = 8080;
const trpcExpress = __importStar(require("@trpc/server/adapters/express"));
const api_1 = __importDefault(require("./api"));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: '*' }));
app.get('/', (_, res) => {
    res.status(200).send('Hello World!');
});
app.use('/trpc', trpcExpress.createExpressMiddleware({
    router: routes_1.appRouter,
    createContext: context_1.createContext,
}));
app.use('/api', api_1.default);
app.use(errorHandler_1.errorHandler);
app.listen(port, 'localhost', () => {
    console.log(`Development Server Started ${port}`);
});
exports.default = routes_1.appRouter;
