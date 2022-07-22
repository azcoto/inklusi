import db from '@db/prisma-client';
export const genCIF = async () => {
  return (async function checkCIF() {
    const p = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    // eslint-disable-next-line no-bitwise
    const generated = [...Array(6)].reduce(
      (a) => a + p[~~(Math.random() * p.length)],
      '',
    );
    const cifExist = await db.debitur.findUnique({
      where: {
        cif: generated,
      },
    });
    if (cifExist) {
      checkCIF();
    }
    return generated;
  })();
};
