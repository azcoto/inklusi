/*
  Warnings:

  - You are about to drop the column `areaDati2` on the `tl_city` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[dati1,dati2,dati3,dati4]` on the table `maspen` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[dati1,dati2,dati3,dati4]` on the table `wilayah` will be added. If there are existing duplicate values, this will fail.
  - Made the column `dati4` on table `maspen` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dati3` on table `maspen` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dati2` on table `maspen` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dati1` on table `maspen` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `dati2` to the `tl_city` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tl_city" DROP CONSTRAINT "tl_city_areaDati2_fkey";

-- DropIndex
DROP INDEX "wilayah_dati2_key";

-- AlterTable
ALTER TABLE "maspen" ALTER COLUMN "dati4" SET NOT NULL,
ALTER COLUMN "dati3" SET NOT NULL,
ALTER COLUMN "dati2" SET NOT NULL,
ALTER COLUMN "dati1" SET NOT NULL;

-- AlterTable
ALTER TABLE "tl_city" DROP COLUMN "areaDati2",
ADD COLUMN     "dati2" VARCHAR(256) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "maspen_dati1_dati2_dati3_dati4_key" ON "maspen"("dati1", "dati2", "dati3", "dati4");

-- CreateIndex
CREATE UNIQUE INDEX "wilayah_dati1_dati2_dati3_dati4_key" ON "wilayah"("dati1", "dati2", "dati3", "dati4");

-- AddForeignKey
ALTER TABLE "maspen" ADD CONSTRAINT "maspen_dati1_dati2_dati3_dati4_fkey" FOREIGN KEY ("dati1", "dati2", "dati3", "dati4") REFERENCES "wilayah"("dati1", "dati2", "dati3", "dati4") ON DELETE RESTRICT ON UPDATE CASCADE;
