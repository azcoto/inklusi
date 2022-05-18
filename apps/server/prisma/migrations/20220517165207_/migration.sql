/*
  Warnings:

  - You are about to drop the `_DistribusiToTlArea` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_DistribusiToTlArea" DROP CONSTRAINT "_DistribusiToTlArea_A_fkey";

-- DropForeignKey
ALTER TABLE "_DistribusiToTlArea" DROP CONSTRAINT "_DistribusiToTlArea_B_fkey";

-- DropTable
DROP TABLE "_DistribusiToTlArea";

-- CreateTable
CREATE TABLE "distribusi_kota" (
    "dati2" VARCHAR(256) NOT NULL,
    "count_potensi" BIGINT NOT NULL,

    CONSTRAINT "distribusi_kota_pkey" PRIMARY KEY ("dati2")
);

-- CreateTable
CREATE TABLE "_DistribusiKotaToTlArea" (
    "A" VARCHAR(256) NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "distribusi_kota_dati2_key" ON "distribusi_kota"("dati2");

-- CreateIndex
CREATE UNIQUE INDEX "_DistribusiKotaToTlArea_AB_unique" ON "_DistribusiKotaToTlArea"("A", "B");

-- CreateIndex
CREATE INDEX "_DistribusiKotaToTlArea_B_index" ON "_DistribusiKotaToTlArea"("B");

-- AddForeignKey
ALTER TABLE "_DistribusiKotaToTlArea" ADD CONSTRAINT "_DistribusiKotaToTlArea_A_fkey" FOREIGN KEY ("A") REFERENCES "distribusi_kota"("dati2") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DistribusiKotaToTlArea" ADD CONSTRAINT "_DistribusiKotaToTlArea_B_fkey" FOREIGN KEY ("B") REFERENCES "tl_city"("id") ON DELETE CASCADE ON UPDATE CASCADE;
