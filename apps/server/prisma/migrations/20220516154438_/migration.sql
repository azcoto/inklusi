/*
  Warnings:

  - A unique constraint covering the columns `[dati1,dati2,dati3,dati4]` on the table `distribusi` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "distribusi_dati1_dati2_dati3_dati4_key" ON "distribusi"("dati1", "dati2", "dati3", "dati4");
