-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "notelp" VARCHAR(13) NOT NULL,
    "appname" VARCHAR(20) NOT NULL,
    "password" CHAR(60) NOT NULL,
    "last_login" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "karyawan" (
    "id" SERIAL NOT NULL,
    "nip" VARCHAR(14) NOT NULL,
    "nik" VARCHAR(16) NOT NULL,
    "nama" VARCHAR(40) NOT NULL,
    "alamat" VARCHAR(256),
    "dati4" VARCHAR(256),
    "dati3" VARCHAR(256),
    "dati2" VARCHAR(256),
    "dati1" VARCHAR(256),
    "notelp" VARCHAR(13) NOT NULL,
    "jabatan" VARCHAR(10) NOT NULL,
    "nip_atasan" VARCHAR(14),

    CONSTRAINT "karyawan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "area" (
    "id" SERIAL NOT NULL,
    "dati1" VARCHAR(256) NOT NULL,
    "dati2" VARCHAR(256) NOT NULL,
    "dati3" VARCHAR(256) NOT NULL,
    "dati4" VARCHAR(256) NOT NULL,

    CONSTRAINT "area_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tl_city" (
    "id" SERIAL NOT NULL,
    "tlNIP" VARCHAR(14) NOT NULL,
    "areaDati2" VARCHAR(40) NOT NULL,

    CONSTRAINT "tl_city_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visit" (
    "id" SERIAL NOT NULL,
    "tlNIP" VARCHAR(14) NOT NULL,
    "soNIP" VARCHAR(40) NOT NULL,
    "visited" BOOLEAN NOT NULL DEFAULT false,
    "notas" VARCHAR(256) NOT NULL,
    "alamatValid" BOOLEAN,
    "interaksi" BOOLEAN,
    "prospek" VARCHAR(256),
    "alasan" VARCHAR(256),
    "assigned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "visit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maspen" (
    "notas" VARCHAR(20) NOT NULL,
    "jenis" CHAR(4) NOT NULL,
    "kdjiwa" VARCHAR(4) NOT NULL,
    "nama_pensiunan" VARCHAR(256) NOT NULL,
    "tg_lahir_pensiunan" DATE NOT NULL,
    "nama_penerima" VARCHAR(256) NOT NULL,
    "tg_lahir_penerima" DATE NOT NULL,
    "penpok" DECIMAL(10,0) NOT NULL,
    "tanak" DECIMAL(10,0) NOT NULL,
    "tistri" DECIMAL(10,0) NOT NULL,
    "tberas" DECIMAL(10,0) NOT NULL,
    "penyesuaian" DECIMAL(10,0) NOT NULL,
    "tbulat" DECIMAL(10,0) NOT NULL,
    "kotor" DECIMAL(10,0) NOT NULL,
    "bersih" DECIMAL(10,0) NOT NULL,
    "alamat" VARCHAR(256),
    "dati4" VARCHAR(256),
    "dati3" VARCHAR(256),
    "dati2" VARCHAR(256),
    "dati1" VARCHAR(256),
    "kodebyr" VARCHAR(12) NOT NULL,
    "nmkanbyr" VARCHAR(256) NOT NULL,
    "norek" VARCHAR(256),
    "tmtpensiun" DATE,
    "noskep" VARCHAR(256),
    "tglskep" DATE,
    "penerbitskep" VARCHAR(256),
    "npwp" VARCHAR(256),
    "tmtstop" DATE,
    "nmstop" VARCHAR(256),
    "telepon" VARCHAR(256),
    "awalflag" DATE,
    "akhirflag" DATE,
    "mitraflag" DATE,
    "jk" CHAR(1),
    "agama" CHAR(1),
    "noktp" CHAR(20),
    "cleaned" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "maspen_pkey" PRIMARY KEY ("notas")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_notelp_appname_key" ON "users"("notelp", "appname");

-- CreateIndex
CREATE UNIQUE INDEX "karyawan_nip_key" ON "karyawan"("nip");

-- CreateIndex
CREATE UNIQUE INDEX "karyawan_nik_key" ON "karyawan"("nik");

-- CreateIndex
CREATE UNIQUE INDEX "karyawan_notelp_key" ON "karyawan"("notelp");

-- CreateIndex
CREATE UNIQUE INDEX "area_dati2_key" ON "area"("dati2");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_notelp_fkey" FOREIGN KEY ("notelp") REFERENCES "karyawan"("notelp") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "karyawan" ADD CONSTRAINT "karyawan_nip_atasan_fkey" FOREIGN KEY ("nip_atasan") REFERENCES "karyawan"("nip") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tl_city" ADD CONSTRAINT "tl_city_tlNIP_fkey" FOREIGN KEY ("tlNIP") REFERENCES "karyawan"("nip") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tl_city" ADD CONSTRAINT "tl_city_areaDati2_fkey" FOREIGN KEY ("areaDati2") REFERENCES "area"("dati2") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visit" ADD CONSTRAINT "visit_tlNIP_fkey" FOREIGN KEY ("tlNIP") REFERENCES "karyawan"("nip") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visit" ADD CONSTRAINT "visit_soNIP_fkey" FOREIGN KEY ("soNIP") REFERENCES "karyawan"("nip") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visit" ADD CONSTRAINT "visit_notas_fkey" FOREIGN KEY ("notas") REFERENCES "maspen"("notas") ON DELETE RESTRICT ON UPDATE CASCADE;
