"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.zSignInDto = exports.zSignInForm = void 0;
const zod_1 = __importDefault(require("zod"));
// For Client
exports.zSignInForm = zod_1.default.object({
    phone: zod_1.default.string({ required_error: 'Phone is required' }),
    password: zod_1.default.string({ required_error: 'Password is required' }),
});
// For API Validation
exports.zSignInDto = zod_1.default.object({
    body: exports.zSignInForm,
});
