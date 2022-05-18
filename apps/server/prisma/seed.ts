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

const bungaData: Prisma.BungaCreateInput[] = [
  {
    rate: 11.0,
    skema: 'anuitas',
  },
  {
    rate: 9.96,
    skema: 'flat',
  },
];

const produkData: Prisma.ProdukCreateInput[] = [
  {
    nama: 'PENSIUN',
    rateAnuitas: 11.0,
    rateFlat: 9.96,
    pProvisi: 1.0,
    pAdministrasi: 1.0,
    cBlokir: 3,
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

  for (const u of bungaData) {
    const bunga = await prisma.bunga.create({
      data: u,
    });
    console.log(`Created bunga with id: ${bunga.id}`);
  }

  for (const u of produkData) {
    const produk = await prisma.produk.create({
      data: u,
    });
    console.log(`Created produk with id: ${produk.id}`);
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
