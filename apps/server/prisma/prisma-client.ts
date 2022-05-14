import { PrismaClient } from '@prisma/client';

type Global = typeof globalThis;

interface CustomNodeJsGlobal extends Global {
  db: PrismaClient;
}

declare const global: CustomNodeJsGlobal;

const db = global.db || new PrismaClient();

if (process.env.NODE_ENV === 'development') global.db = db;

export default db;
