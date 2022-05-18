/*
  Warnings:

  - You are about to drop the `area` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tl_city" DROP CONSTRAINT "tl_city_areaDati2_fkey";

-- DropTable
DROP TABLE "area";

-- CreateTable
CREATE TABLE "wilayah" (
    "id" SERIAL NOT NULL,
    "dati1" VARCHAR(256) NOT NULL,
    "dati2" VARCHAR(256) NOT NULL,
    "dati3" VARCHAR(256) NOT NULL,
    "dati4" VARCHAR(256) NOT NULL,

    CONSTRAINT "wilayah_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "wilayah_dati2_key" ON "wilayah"("dati2");

-- AddForeignKey
ALTER TABLE "tl_city" ADD CONSTRAINT "tl_city_areaDati2_fkey" FOREIGN KEY ("areaDati2") REFERENCES "wilayah"("dati2") ON DELETE RESTRICT ON UPDATE CASCADE;
