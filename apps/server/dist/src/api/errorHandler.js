"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const zod_1 = require("zod");
const errorHandler = (error, _req, res, _next) => {
    if (error instanceof zod_1.ZodError) {
        const err = {
            from: 'API Validator',
            data: error.issues,
        };
        return res.status(400).json(err);
    }
};
exports.errorHandler = errorHandler;
