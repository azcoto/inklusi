import { AllAsuransiResponse } from '@api/asuransi/dto';
import { AllIndeksPengaliResponse } from '@api/indeksPengali/dto';
import { GetProdukResponse } from '@api/produk/dto';
import { AlltipeDebiturResponse } from '@api/tipeDebitur/dto';
import {
  Box,
  Text,
  Container,
  Grid,
  Button,
  ScrollArea,
  TextInput,
  NativeSelect,
  Divider,
  Switch,
  Select,
  NumberInput,
  useMantineColorScheme,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm, zodResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useAuthed } from 'context/auth';
import dayjs from 'dayjs';
import html2canvas from 'html2canvas';
import exactAge from 'libs/exact-age';
import { xPMT } from 'libs/fin';
import { saveAs } from 'libs/save-as';
import { useEffect, useRef, useState } from 'react';
import services from 'services';
import z, { unknown } from 'zod';
import Rows from './Rows';
import SimResult from './SimResult';
import SumResult from './SumResult';

export interface SimulasiResult {
  tenor: number;
  plafond: number;
  angsuran: number;
  sisaGaji: number;
  asuransi: number;
  provisiOrAdmin: number;
  tBlokir: number;
  tBiaya: number;
  tBersih: number;
}

export interface SumSimulasi {
  plafond: number;
  angsuran: number;
  asuransi: number;
  provisiOrAdmin: number;
  tBlokir: number;
  tBiaya: number;
  tBersih: number;
  tPelunasan: number;
  tPenerimaan: number;
}

interface ListPlafond {
  p1: number;
  p2: number | null;
  p3: number | null;
  c: number;
}

const zSimulasiForm = z.object({
  nama: z.string().min(1, { message: 'Nama tidak boleh kosong' }),
  tgLahir: z
    .date({ required_error: 'Tanggal lahir tidak boleh kosong' })
    .nullable(),
  // .default(new Date('1970-01-01')),
  kanBayarAsal: z.string().min(1, { message: 'Asal tidak boleh kosong' }),
  takeOver: z.boolean(),
  tipeDebitur: z.string(),
  produk: z.string(),
  skemaBunga: z.string(),
  jangkaWaktu: z.number(),
  gaji: z.number(),

  blokirAngsuran: z
    .string()
    .or(z.number())
    .transform((s) => Number(s)),
  plafond: z.number(),
  maksPlafond: z.number(),
  pelunasan: z
    .string({ invalid_type_error: 'Harus Diisi' })
    .transform((s) => Number(s))
    .superRefine((arg, ctx) => ctx.addIssue)
    .optional(),
  jumlahAkad: z.string(),
  bup: z.string().nullable(),
});

type SimulasiForm = z.infer<typeof zSimulasiForm>;

const jumlahAkadData = [
  { value: '1', label: '1 AKAD PINJAMAN' },
  { value: '2', label: '2 AKAD PINJAMAN' },
  { value: '3', label: 'SELANG 2 WAKTU' },
];

const bupData = [
  { value: '58', label: '58' },
  { value: '60', label: '60' },
  { value: '65', label: '65' },
  { value: '70', label: '70' },
];

const Calc = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { currentUser } = useAuthed();
  const calcRef = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const simRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (calcRef.current) return;
    const fetchData = async () => {
      const pProduk = services.produk.getProduk();
      const pTipe = services.tipeDebitur.getAlltipeDebitur();
      const pAsuransi = services.asuransi.allAsuransi();
      const pIndeksPengali = services.indeksPengali.allIndeksPengali();
      const [produk, tipe, asuransi, indeksPengali] = await Promise.all([
        pProduk,
        pTipe,
        pAsuransi,
        pIndeksPengali,
      ]);
      setListProduk(produk);
      setListAllTipeDebitur(tipe);
      setListRateAsuransi(asuransi);
      setListPengali(indeksPengali);
    };
    fetchData();

    calcRef.current = true;
  }, []);

  const [listAllTipeDebitur, setListAllTipeDebitur] =
    useState<AlltipeDebiturResponse>([]);
  const [listProduk, setListProduk] = useState<GetProdukResponse>([]);
  const [listRateAsuransi, setListRateAsuransi] = useState<AllAsuransiResponse>(
    [],
  );
  const [selectedProduk, setSelectedProduk] = useState<GetProdukResponse[0]>();
  const [simulasiResult, setSimulasiResult] = useState<SimulasiResult>();
  const [simulasiResult2, setSimulasiResult2] =
    useState<SimulasiResult | null>();
  const [simulasiResult3, setSimulasiResult3] =
    useState<SimulasiResult | null>();
  const [sumSimulasiResult, setSumSimulasiResult] = useState<SumSimulasi>();
  const [currentIndeksPengali, setCurrentIndeksPengali] = useState<number>(0);
  const [currentRateAsuransi, setCurrentRateAsuransi] = useState<number>(0);
  const [currentKonven, setCurrentKonven] = useState<string>('');
  const [listPengali, setListPengali] = useState<AllIndeksPengaliResponse>();
  const [listPlafond, setListPlafond] = useState<ListPlafond>();

  const form = useForm<SimulasiForm>({
    schema: zodResolver(zSimulasiForm),
    initialValues: {
      nama: '',
      tgLahir: null,
      kanBayarAsal: '',
      takeOver: false,
      tipeDebitur: 'PNS/CPNS OTONOM',
      produk: 'KCU UMUM ANUITAS',
      skemaBunga: 'ANUITAS',
      jangkaWaktu: 60,
      gaji: 0,
      blokirAngsuran: 2,
      plafond: 0,
      maksPlafond: 0,
      pelunasan: 0,
      jumlahAkad: '1',
      bup: null,
    },
  });

  useEffect(() => {
    if (listProduk.length > 0 && form.values.produk) {
      const filtered = listProduk.find(
        (obj) => obj.nama === form.values.produk,
      );
      setSelectedProduk(filtered);
    }
  }, [listProduk, form.values.produk]);

  const getMaksPlafond = async () => {
    const { gaji, jangkaWaktu, jumlahAkad } = form.values;
    if (!selectedProduk || !jumlahAkad || !gaji || !jangkaWaktu) return;
    if (gaji >= 500000) {
      const pengali = listPengali?.find((p) => {
        return p.produkId === selectedProduk.id && p.tenor === jangkaWaktu;
      })?.pengali as number;

      let maksPlafond: number;
      if (form.values.jumlahAkad === '3') {
        const p1 = (pengali * gaji * 75) / 100;
        const a1 = xPMT(
          p1,
          selectedProduk.bunga,
          jangkaWaktu,
          selectedProduk.skema,
        );
        const p2 = pengali * ((gaji * 75) / 100 - a1);
        const a2 = xPMT(
          p2,
          selectedProduk.bunga,
          jangkaWaktu,
          selectedProduk.skema,
        );
        const pengali3 = listPengali?.find((p) => {
          return p.produkId === selectedProduk.id && p.tenor === untilBUP();
        })?.pengali as number;
        const p3 = pengali3 * ((gaji * 75) / 100 - a1 - a2);

        console.log('Plafond 1', p1);
        console.log('Plafond 2', p2);

        console.log('Angsuran 1', a1);
        console.log('Angsuran 2', a2);
        console.log('Faktor Pengali 3', (gaji * 75) / 100 - a1 - a2);
        console.log('Indeks Pengali 3', pengali3);
        maksPlafond = p1 + p2 + p3;
        setListPlafond({ p1, p2, p3, c: 3 });
        console.log({ p1, p2, p3, c: 3 });
      } else if (form.values.jumlahAkad === '2') {
        const p1 = pengali * gaji;
        const a1 = xPMT(
          p1,
          selectedProduk.bunga,
          jangkaWaktu,
          selectedProduk.skema,
        );

        const p2 = pengali * (gaji - a1);

        maksPlafond = p1 + p2;
        setListPlafond({ p1, p2, p3: null, c: 2 });
        console.log('Indeks Pengali', pengali);
        console.log({ p1, p2, p3: null, c: 3 });
      } else {
        maksPlafond = pengali * gaji;
        setListPlafond({ p1: maksPlafond, p2: null, p3: null, c: 1 });
      }

      form.setFieldValue('maksPlafond', maksPlafond);
    }
  };

  const simulasi = () => {
    const {
      plafond,
      gaji,
      maksPlafond,
      pelunasan,
      jangkaWaktu,
      blokirAngsuran,
      jumlahAkad,
      takeOver,
      produk,
    } = form.values;
    if (
      !listPlafond ||
      !selectedProduk ||
      !listPengali ||
      !gaji ||
      !jangkaWaktu ||
      !plafond
    )
      return;

    if (
      (listPlafond.c === 1 && plafond > listPlafond.p1) ||
      (listPlafond.c === 2 &&
        (plafond > listPlafond.p1 + (listPlafond.p2 || 0) ||
          plafond <= listPlafond.p1)) ||
      (listPlafond.c === 3 &&
        (plafond >
          listPlafond.p1 + (listPlafond.p2 || 0) + (listPlafond.p3 || 0) ||
          plafond <= listPlafond.p1 + (listPlafond.p2 || 0)))
    ) {
      form.setErrors({ plafond: 'Plafond Error' });
      return;
    }

    const px = listPlafond.c === 1 ? plafond : listPlafond.p1;
    const angsuran = xPMT(
      px,
      selectedProduk.bunga,
      jangkaWaktu,
      selectedProduk.skema,
    );

    // Check kategori asuransi using tipe Debitur
    let kategoriAsuransi: string;
    if (Number(form.values.jumlahAkad) < 3) {
      kategoriAsuransi = listAllTipeDebitur.find((p) => {
        return p.nama === form.values.tipeDebitur;
      })?.kategoriAsuransi as string;
    } else {
      kategoriAsuransi = '2';
    }

    // Find rate asuransi
    const rateAsuransi = listRateAsuransi.find((p) => {
      return p.kategori === kategoriAsuransi && p.tenor === Number(jangkaWaktu);
    })?.rate as number;

    const tipeProduk = listProduk.find((p) => p.nama === produk)
      ?.konven as string;
    setCurrentKonven(tipeProduk);
    let rateProvisiOrAdmin: number;
    if (!takeOver && tipeProduk === 'SYARIAH' && Number(jumlahAkad) === 3) {
      rateProvisiOrAdmin = 2 / 100;
    } else if (!takeOver) {
      rateProvisiOrAdmin = 1.5 / 100;
    } else {
      rateProvisiOrAdmin = 0;
    }
    const asuransi = Math.round(rateAsuransi * px);
    const provisiOrAdmin = Math.round(rateProvisiOrAdmin * px);

    const tBlokir = blokirAngsuran * angsuran;
    const tBiaya = asuransi + provisiOrAdmin + tBlokir;
    const tBersih = px - tBiaya;
    const sisaGaji =
      jumlahAkad === '3'
        ? Math.round((gaji * 75) / 100 - angsuran)
        : gaji - angsuran;
    const hasil: SimulasiResult = {
      tenor: Number(jangkaWaktu),
      plafond: px,
      angsuran,
      sisaGaji,
      asuransi,
      provisiOrAdmin,
      tBlokir,
      tBiaya,
      tBersih,
    };
    setSimulasiResult(hasil);
    let hasil2: SimulasiResult | undefined;
    let hasil3: SimulasiResult | undefined;
    if (Number(form.values.jumlahAkad) === 2) {
      hasil2 = simulateNext(
        2,
        selectedProduk,
        listPlafond,
        plafond,
        Number(jangkaWaktu),
        hasil.sisaGaji,
        rateAsuransi,
        rateProvisiOrAdmin,
      );
      setSimulasiResult2(hasil2);
    } else if (Number(form.values.jumlahAkad) === 3) {
      hasil2 = simulateNext(
        2,
        selectedProduk,
        listPlafond,
        plafond,
        Number(jangkaWaktu),
        hasil.sisaGaji,
        rateAsuransi,
        rateProvisiOrAdmin,
      );
      setSimulasiResult2(hasil2);
      hasil3 = simulateNext(
        3,
        selectedProduk,
        listPlafond,
        plafond,
        Number(untilBUP()), // jangka waktu III
        hasil2.sisaGaji,
        rateAsuransi,
        rateProvisiOrAdmin,
      );
      setSimulasiResult3(hasil3);
    }
    console.log('asuransi', asuransi);
    console.log('provisi  1', hasil.provisiOrAdmin);
    console.log('blokir ', hasil.tBlokir);
    console.log('biaya ', hasil.tBiaya);

    const sum: SumSimulasi = {
      plafond:
        Number(hasil.plafond) +
        Number(hasil2?.plafond || 0) +
        Number(hasil3?.plafond || 0),
      angsuran:
        hasil.angsuran + (hasil2?.angsuran || 0) + (hasil3?.angsuran || 0),
      asuransi:
        hasil.asuransi + (hasil2?.asuransi || 0) + (hasil3?.asuransi || 0),
      provisiOrAdmin:
        hasil.provisiOrAdmin +
        (hasil2?.provisiOrAdmin || 0) +
        (hasil3?.provisiOrAdmin || 0),
      tBlokir: hasil.tBlokir + (hasil2?.tBlokir || 0) + (hasil3?.tBlokir || 0),
      tBiaya: hasil.tBiaya + (hasil2?.tBiaya || 0) + (hasil3?.tBiaya || 0),
      tBersih: hasil.tBersih + (hasil2?.tBersih || 0) + (hasil3?.tBersih || 0),
      tPelunasan: pelunasan || 0,
      tPenerimaan:
        hasil.tBersih +
        (hasil2?.tBersih || 0) +
        (hasil3?.tBersih || 0) -
        (pelunasan || 0),
    };
    setSumSimulasiResult(sum);
  };

  const simulateNext = (
    iter: number,
    selectedProduk: GetProdukResponse[0],
    listPlafond2: ListPlafond,
    inputPlafond: number,
    jangkaWaktu: number,
    sisaGaji: number,
    rateAsuransi: number,
    rateProvisiOrAdmin: number,
  ) => {
    const pengali = listPengali?.find((p) => {
      return p.produkId === selectedProduk.id && p.tenor === jangkaWaktu;
    })?.pengali as number;
    const { blokirAngsuran, plafond } = form.values;
    let px2;
    console.log(listPlafond2.c, iter);
    if (listPlafond2.c === 2 && iter === 2) {
      px2 = inputPlafond - listPlafond2.p1 || 0;
      console.log('c2 iter 2', px2);
    } else if (listPlafond2.c === 3 && iter === 2) {
      px2 = listPlafond2.p2 || 0;
      console.log('c3 iter 2', px2);
    } else {
      px2 = inputPlafond - listPlafond2.p1 - (listPlafond2.p2 || 0);
    }
    const angsuran2 = xPMT(
      px2,
      selectedProduk.bunga,
      jangkaWaktu,
      selectedProduk.skema,
    );
    const asuransi2 = Math.round(rateAsuransi * px2);
    const provisiOrAdmin2 = Math.round(rateProvisiOrAdmin * px2);
    const tBlokir2 = blokirAngsuran * angsuran2;
    const tBiaya2 = asuransi2 + provisiOrAdmin2 + tBlokir2;

    const tBersih = px2 - tBiaya2;
    const hasil2: SimulasiResult = {
      tenor: Number(jangkaWaktu),
      plafond: px2,
      angsuran: angsuran2,
      sisaGaji: sisaGaji - angsuran2,
      asuransi: asuransi2,
      provisiOrAdmin: provisiOrAdmin2,
      tBlokir: tBlokir2,
      tBiaya: tBiaya2,
      tBersih: tBersih,
    };
    return hasil2;
  };

  const saveSimulasi = async () => {
    if (simRef.current) {
      const original = {
        height: simRef.current.style.height,
        padding: simRef.current.style.padding,
      };

      simRef.current.style.height = 'auto';
      if (colorScheme === 'dark') {
        await toggleColorScheme();
        simRef.current.style.padding = '5px';

        html2canvas(simRef.current).then((canvas) => {
          saveAs(canvas.toDataURL(), `simulasi-${form.values.nama}.png`);
        });
        simRef.current.style.height = original.height;
        await toggleColorScheme();
      } else {
        simRef.current.style.padding = '5px';
        html2canvas(simRef.current).then((canvas) => {
          saveAs(canvas.toDataURL(), `simulasi-${form.values.nama}.png`);
        });
        simRef.current.style.height = original.height;
      }
    }
    showNotification({
      message: 'Simulasi berhasil disimpan',
      color: 'green',
      autoClose: 2000,
    });
  };
  const moneyMasker = (
    evt: React.ChangeEvent<HTMLInputElement>,
    field: keyof SimulasiForm,
  ) => {
    evt.target.value = evt.target.value.replaceAll('.', '');
    form.setFieldValue(field, evt.target.value);
    evt.target.value = Number(evt.target.value).toLocaleString('id');
  };

  const displayAge = () => {
    const age = exactAge(dayjs(form.values.tgLahir));
    return `${age.years} Tahun ${age.months} Bulan ${age.days} Hari`;
  };

  const untilBUP = () => {
    if (!form.values.bup) return 0;
    const tglBUP = dayjs(form.values.tgLahir).add(Number(form.values.bup), 'y');
    return tglBUP.diff(dayjs(), 'M') - 1;
  };

  const untilPlatinum = () => {
    const tglPlatinum = dayjs(form.values.tgLahir).add(75, 'y');
    return tglPlatinum.diff(dayjs(), 'M') - 1;
  };

  return (
    <Container size="xs">
      <form ref={formRef} onSubmit={form.onSubmit(simulasi)}>
        <Text weight={'bold'} align="center">
          SIMULASI PERHITUNGAN KREDIT
        </Text>
        <ScrollArea
          ref={simRef}
          offsetScrollbars
          style={{ height: '75vh' }}
          mt={10}
          scrollbarSize={2}
          sx={{ div: { div: { paddingRight: '3px' } } }}
        >
          <Grid gutter={'xs'} align="flex-end">
            {currentUser && currentUser.jabatan === 'SF' && (
              <Rows title="Marketing Representative">
                <Text weight="bold">{currentUser.nama}</Text>
              </Rows>
            )}

            {currentUser && currentUser.jabatan === 'TL' && (
              <Rows title="Team Leader">
                <Text weight="bold">{currentUser.nama}</Text>
              </Rows>
            )}

            {/* DIVIDER */}
            <Grid.Col span={12}>
              <Divider my="sm" />
            </Grid.Col>
            <Rows title="Nama Debitur">
              <TextInput
                autoFocus
                sx={{ input: { textTransform: 'uppercase' } }}
                size="xs"
                {...form.getInputProps('nama')}
              />
            </Rows>
            <Rows title="Tanggal Lahir">
              <DatePicker
                sx={{ div: { div: { paddingRight: 0 } } }}
                minDate={dayjs(new Date()).subtract(79, 'y').toDate()}
                maxDate={dayjs(new Date()).subtract(20, 'y').toDate()}
                clearable={true}
                locale="id"
                inputFormat="DD MMMM YYYY"
                size="xs"
                initialLevel="year"
                {...form.getInputProps('tgLahir')}
              />
            </Rows>
            {form.values.tgLahir && (
              <Rows title="Usia">
                <Text size="xs">{displayAge()}</Text>
              </Rows>
            )}

            <Rows title="Kantor Bayar Asal">
              <TextInput
                sx={{ input: { textTransform: 'uppercase' } }}
                size="xs"
                {...form.getInputProps('kanBayarAsal')}
              />
            </Rows>
            <Rows title="Take Over">
              <Switch
                label={form.values.takeOver ? 'Ya' : 'Tidak'}
                {...form.getInputProps('takeOver')}
              />
            </Rows>

            {form.values.takeOver && (
              <>
                <Rows title="Pelunasan">
                  <TextInput
                    sx={{ input: { textAlign: 'right' } }}
                    size="xs"
                    onChange={(evt) => moneyMasker(evt, 'pelunasan')}
                    error={form.errors.pelunasan}
                  />
                </Rows>
              </>
            )}
            {listAllTipeDebitur && (
              <Rows title="Tipe Debitur">
                <NativeSelect
                  data={listAllTipeDebitur.map((item) => item.nama)}
                  size="xs"
                  {...form.getInputProps('tipeDebitur')}
                />
              </Rows>
            )}

            {form.values.tipeDebitur !== 'PENSIUN' && (
              <>
                <Grid.Col span={5}>
                  <Text size="sm">Batas Usia Pensiun</Text>
                </Grid.Col>
                <Grid.Col span={3}>
                  <Select
                    size="xs"
                    data={bupData}
                    {...form.getInputProps('bup')}
                  />
                </Grid.Col>
                <Grid.Col span={4}>
                  <Text size="sm">Tahun</Text>
                </Grid.Col>
              </>
            )}
            {form.values.tipeDebitur === 'PNS/CPNS OTONOM' &&
              form.values.bup &&
              Number(form.values.bup) >= 56 &&
              Number(form.values.bup) <= 65 && (
                <>
                  <Grid.Col span={5}>
                    <Text size="sm">Bulan s/d BUP</Text>
                  </Grid.Col>
                  <Grid.Col span={7}>
                    <Text size="sm">{`${untilBUP()} Bulan`}</Text>
                  </Grid.Col>
                </>
              )}

            <Rows title="Jumlah Akad">
              <Select
                data={
                  form.values.tipeDebitur === 'PNS/CPNS OTONOM'
                    ? jumlahAkadData
                    : jumlahAkadData.slice(0, 2)
                }
                size="xs"
                {...form.getInputProps('jumlahAkad')}
              />
            </Rows>

            {listProduk && (
              <Rows title="Produk">
                <NativeSelect
                  data={listProduk.map((item) => item.nama)}
                  size="xs"
                  {...form.getInputProps('produk')}
                />
              </Rows>
            )}
            <Grid.Col span={5}>
              <Text size="sm">Tenor (Bulan)</Text>
            </Grid.Col>
            <Grid.Col span={2}>
              <NumberInput
                itemType="number"
                placeholder=""
                min={60}
                max={300}
                size="xs"
                hideControls={true}
                {...form.getInputProps('jangkaWaktu')}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <Text size="sm">Bulan</Text>
            </Grid.Col>

            <Grid.Col span={5}>
              <Text size="sm">Gaji</Text>
            </Grid.Col>
            <Grid.Col span={4}>
              <NumberInput
                sx={{ input: { textAlign: 'right' } }}
                size="xs"
                parser={(value) => value?.replace(/\$\s?|(\.*)/g, '')}
                formatter={(value) =>
                  value && !Number.isNaN(parseInt(value))
                    ? `${Number(value).toLocaleString('Id')}`
                    : ''
                }
                hideControls={true}
                {...form.getInputProps('gaji')}
              />
            </Grid.Col>

            <Grid.Col span={5}>
              <Text size="sm">Blokir</Text>
            </Grid.Col>
            <Grid.Col span={2}>
              <NumberInput
                min={0}
                max={4}
                sx={{ input: { textAlign: 'right' } }}
                size="xs"
                hideControls={true}
                {...form.getInputProps('blokirAngsuran')}
              />
            </Grid.Col>
            <Grid.Col span={3}>
              <Text size="sm">x Angsuran</Text>
            </Grid.Col>

            <Grid.Col span={5}>
              <Text size="sm">Maksimum Plafond</Text>
            </Grid.Col>
            <Grid.Col span={4}>
              <Button size="xs" sx={{ width: '90%' }} onClick={getMaksPlafond}>
                HITUNG
              </Button>
            </Grid.Col>
            <Grid.Col span={3}>
              {form.values.maksPlafond !== 0 && (
                <Text size="xs" mr={14} align="right">
                  {form.values.maksPlafond.toLocaleString('id')}
                </Text>
              )}
            </Grid.Col>

            <Rows title="Plafond">
              <NumberInput
                sx={{ input: { textAlign: 'right' } }}
                size="xs"
                parser={(value) => value?.replace(/\$\s?|(\.*)/g, '')}
                formatter={(value) =>
                  value && !Number.isNaN(parseInt(value))
                    ? `${Number(value).toLocaleString('Id')}`
                    : ''
                }
                hideControls={true}
                {...form.getInputProps('plafond')}
              />
            </Rows>
            {simulasiResult && selectedProduk && (
              <SimResult
                s={simulasiResult}
                akadTitle="PK 1"
                currentKonven={currentKonven}
                gaji={form.values.gaji || 0}
                selectedProduk={selectedProduk}
              />
            )}
            {simulasiResult && simulasiResult2 && selectedProduk && (
              <SimResult
                s={simulasiResult2}
                akadTitle="PK 2"
                currentKonven={currentKonven}
                gaji={simulasiResult.sisaGaji}
                selectedProduk={selectedProduk}
              />
            )}
            {simulasiResult &&
              simulasiResult2 &&
              simulasiResult3 &&
              selectedProduk && (
                <SimResult
                  s={simulasiResult3}
                  akadTitle="PK 3"
                  currentKonven={currentKonven}
                  gaji={simulasiResult2.sisaGaji}
                  selectedProduk={selectedProduk}
                />
              )}

            {sumSimulasiResult && selectedProduk && (
              <SumResult
                s={sumSimulasiResult}
                currentKonven={currentKonven}
                selectedProduk={selectedProduk}
              />
            )}
          </Grid>
        </ScrollArea>

        <Box
          sx={{
            position: sumSimulasiResult ? 'fixed' : 'static',
            bottom: 10,
            left: 0,
            right: 0,
            display: 'flex',
            gap: '10px',
          }}
          mb={8}
          px={8}
        >
          <Button
            sx={{ flexGrow: 1 }}
            type="submit"
            disabled={form.values.maksPlafond === 0}
            onClick={() => simulasi()}
          >
            Simulasi
          </Button>
          {simulasiResult && (
            <>
              <Button
                onClick={() => {
                  form.reset();
                  if (formRef.current) formRef.current.reset();
                  setSimulasiResult(undefined);
                  setSimulasiResult2(undefined);
                  setSimulasiResult3(undefined);
                  setSumSimulasiResult(undefined);
                }}
              >
                Reset
              </Button>
              <Button sx={{ flexGrow: 1 }} onClick={saveSimulasi}>
                SAVE
              </Button>
            </>
          )}
        </Box>
      </form>
    </Container>
  );
};

export default Calc;
