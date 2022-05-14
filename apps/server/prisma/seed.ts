import { PrismaClient, Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

const crypt = (pass: string) => {
  return bcrypt.hashSync(pass, 10);
};

const userData: Prisma.UsersCreateInput[] = [
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
