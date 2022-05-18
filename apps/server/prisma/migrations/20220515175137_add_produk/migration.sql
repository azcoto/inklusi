-- CreateTable
CREATE TABLE "Produk" (
    "id" SERIAL NOT NULL,
    "nama" VARCHAR(256) NOT NULL,
    "rate_anuitas" DECIMAL(4,2) NOT NULL,
    "rate_flat" DECIMAL(4,2) NOT NULL,
    "persen_provisi" DECIMAL(4,2) NOT NULL,
    "persen_administrasi" DECIMAL(4,2) NOT NULL,
    "count_blokir" INTEGER NOT NULL,

    CONSTRAINT "Produk_pkey" PRIMARY KEY ("id")
);
