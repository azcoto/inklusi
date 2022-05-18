"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContext = void 0;
const client_1 = require("@prisma/client");
const appUser = client_1.Prisma.validator()({
    select: {
        nip: true,
        nama: true,
        jabatan: true,
    },
});
const createContext = ({ req, res }) => {
    const ctx = {
        req,
        res,
    };
    if (req.cookies?.token) {
        ctx.user = {
            nip: '12121313',
            nama: 'John Doe',
            jabatan: 'Manager',
        };
        return ctx;
    }
    return ctx;
};
exports.createContext = createContext;
