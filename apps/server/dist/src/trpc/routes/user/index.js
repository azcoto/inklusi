"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@libs/router");
const user = (0, router_1.createRouter)().query('me', {
    resolve() {
        return { message: 'User Me Route' };
    },
});
exports.default = user;
