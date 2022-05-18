"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
const crypt = (pass) => {
    return bcrypt_1.default.hashSync(pass, 10);
};
const userData = [
    {
        appname: 'sms-fe',
        password: crypt('123'),
        karyawan: {
            create: {
                nip: '123456789',
                nik: '123456789',
                nama: 'John Doe',
                jabatan: 'TL',
                notelp: '08123456789',
            },
        },
    },
];
async function main() {
    console.log(`Start seeding ...`);
    for (const u of userData) {
        const user = await prisma.users.create({
            data: u,
        });
        console.log(`Created user with id: ${user.id}`);
    }
    console.log(`Seeding finished.`);
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
