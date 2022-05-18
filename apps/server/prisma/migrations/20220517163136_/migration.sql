/*
  Warnings:

  - A unique constraint covering the columns `[tlNIP,dati2]` on the table `tl_city` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "_DistribusiToTlArea" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DistribusiToTlArea_AB_unique" ON "_DistribusiToTlArea"("A", "B");

-- CreateIndex
CREATE INDEX "_DistribusiToTlArea_B_index" ON "_DistribusiToTlArea"("B");

-- CreateIndex
CREATE UNIQUE INDEX "tl_city_tlNIP_dati2_key" ON "tl_city"("tlNIP", "dati2");

-- AddForeignKey
ALTER TABLE "_DistribusiToTlArea" ADD CONSTRAINT "_DistribusiToTlArea_A_fkey" FOREIGN KEY ("A") REFERENCES "distribusi"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DistribusiToTlArea" ADD CONSTRAINT "_DistribusiToTlArea_B_fkey" FOREIGN KEY ("B") REFERENCES "tl_city"("id") ON DELETE CASCADE ON UPDATE CASCADE;
