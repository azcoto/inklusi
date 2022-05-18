"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validator_1 = __importDefault(require("../util/validator"));
const dto_1 = require("./dto");
const signin_1 = __importDefault(require("./signin"));
const auth = (0, express_1.Router)();
auth.use('/signin', (0, validator_1.default)(dto_1.zSignInDto), signin_1.default);
exports.default = auth;
