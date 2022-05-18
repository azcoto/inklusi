-- CreateTable
CREATE TABLE "distribusi" (
    "id" SERIAL NOT NULL,
    "dati1" VARCHAR(256) NOT NULL,
    "dati2" VARCHAR(256) NOT NULL,
    "dati3" VARCHAR(256) NOT NULL,
    "dati4" VARCHAR(256) NOT NULL,
    "count_potensi" BIGINT NOT NULL,

    CONSTRAINT "distribusi_pkey" PRIMARY KEY ("id")
);
