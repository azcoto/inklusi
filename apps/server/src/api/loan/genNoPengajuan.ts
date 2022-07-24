import db from '@db/prisma-client';

export const genNoPengajuan = async () => {
  // Check highest NoPengajuan
  const latest = await db.loan.findFirst({
    select: {
      noPengajuan: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  if (!latest) {
    return 'JIKU00000001';
  }
  const lastNum = parseInt(latest.noPengajuan.replace('JIKU', ''));
  return 'JIKU' + String(lastNum + 1).padStart(8, '0');
};
