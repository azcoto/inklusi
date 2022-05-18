"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const router_1 = require("@libs/router");
const signin_1 = __importDefault(require("./signin"));
exports.auth = (0, router_1.createRouter)().merge(signin_1.default);
