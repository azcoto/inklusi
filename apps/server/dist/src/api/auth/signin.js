"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_client_1 = __importDefault(require("@db/prisma-client"));
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("@libs/config");
const signIn = async (req, res) => {
    console.log(req.body);
    const { phone, password } = req.body;
    const user = await prisma_client_1.default.users.findUnique({
        select: {
            password: true,
            karyawan: {
                select: {
                    nip: true,
                    nama: true,
                    notelp: true,
                },
            },
        },
        where: {
            notelp_appname: {
                notelp: phone,
                appname: 'sms-fe',
            },
        },
    });
    if (!user)
        return res
            .status(400)
            .send({ from: 'API Handler', data: { message: 'User Not Found' } });
    if (!bcrypt_1.default.compareSync(password, user.password))
        return res.status(400).send({ error: 'Wrong Password' });
    const jwtOptions = {
        algorithm: 'HS256',
        expiresIn: '1m',
    };
    return res
        .status(200)
        .send({ token: (0, jsonwebtoken_1.sign)(user.karyawan, config_1.secret, jwtOptions) });
};
exports.default = signIn;
