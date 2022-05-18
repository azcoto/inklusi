-- CreateTable
CREATE TABLE "Bunga" (
    "id" SERIAL NOT NULL,
    "rate" DECIMAL(4,2) NOT NULL,
    "skema" VARCHAR(255) NOT NULL,

    CONSTRAINT "Bunga_pkey" PRIMARY KEY ("id")
);
