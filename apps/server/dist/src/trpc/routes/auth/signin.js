"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = __importDefault(require("@libs/prisma"));
const router_1 = require("@libs/router");
const schema_1 = require("./schema");
const server_1 = require("@trpc/server");
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("@libs/config");
const signin = (0, router_1.createRouter)().mutation('signin', {
    input: schema_1.signinSchema,
    async resolve({ input, ctx }) {
        const { phone, password } = input;
        const user = await prisma_1.default.users.findUnique({
            where: {
                notelp_appname: { notelp: phone, appname: 'sms-fe' },
            },
            select: {
                password: true,
                karyawan: {
                    select: {
                        nip: true,
                        nama: true,
                        jabatan: true,
                    },
                },
            },
        });
        if (!user) {
            throw new server_1.TRPCError({
                code: 'BAD_REQUEST',
                cause: 'User not found',
                message: 'User not found',
            });
        }
        if (!bcrypt_1.default.compareSync(password, user.password)) {
            throw new server_1.TRPCError({
                code: 'BAD_REQUEST',
                cause: 'Invalid password',
                message: 'Invalid password',
            });
        }
        const signOptions = {
            algorithm: 'HS256',
            expiresIn: '1m',
        };
        ctx.res.cookie('token', (0, jsonwebtoken_1.sign)(user.karyawan, config_1.secret, signOptions));
        return {
            message: 'Successfully signed in',
        };
    },
});
exports.default = signin;
