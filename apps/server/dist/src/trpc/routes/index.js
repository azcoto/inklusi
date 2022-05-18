"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const router_1 = require("@libs/router");
const auth_1 = require("./auth");
const user_1 = __importDefault(require("./user"));
exports.appRouter = (0, router_1.createRouter)()
    .merge('auth.', auth_1.auth)
    .merge('user.', user_1.default);
