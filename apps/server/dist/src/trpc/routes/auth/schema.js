"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signinSchema = void 0;
const zod_1 = require("zod");
exports.signinSchema = zod_1.z.object({
    phone: zod_1.z.string().regex(/^081\d+$/),
    password: zod_1.z.string(),
});
