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
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm, zodResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useAuthed } from 'context/auth';
import dayjs from 'dayjs';
import html2canvas from 'html2canvas';
import { xPMT } from 'libs/fin';
import { saveAs } from 'libs/save-as';
import { useEffect, useRef, useState } from 'react';
import services from 'services';
import z from 'zod';
import Rows from './rows';

interface SimulasiResult {
  angsuran: number;
  asuransi: number;
  provisi: number;
  administrasi: number;
  tBlokir: number;
  tBiaya: number;
  tBersih: number;
  tTerima: number;
}

const zSimulasiForm = z.object({
  nama: z.string().min(1, { message: 'Nama tidak boleh kosong' }),
  tgLahir: z
    .date({ required_error: 'Tanggal lahir tidak boleh kosong' })
    .default(new Date('1970-01-01')),
  kanBayarAsal: z.string().min(1, { message: 'Asal tidak boleh kosong' }),
  takeOver: z.boolean(),
  tipeDebitur: z.string(),
  produk: z.string(),
  skemaBunga: z.string(),
  jangkaWaktu: z
    .string()
    .or(z.number())
    .transform((s) => Number(s)),
  gaji: z
    .string()
    .transform((s) => Number(s))
    .refine((n) => n > 100000 && n < 20000000, 'Gaji invalid'),
  blokirAngsuran: z.string().transform((s) => Number(s)),
  plafond: z
    .string({ invalid_type_error: 'Harus Diisi' })
    .transform((s) => Number(s))
    .superRefine((arg, ctx) => ctx.addIssue),
  maksPlafond: z.number(),
  pelunasan: z
    .string({ invalid_type_error: 'Harus Diisi' })
    .transform((s) => Number(s))
    .superRefine((arg, ctx) => ctx.addIssue)
    .optional(),
});

type SimulasiForm = z.infer<typeof zSimulasiForm>;

const Calc = () => {
  const { currentUser } = useAuthed();
  const calcRef = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const simRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (calcRef.current) return;
    const fetchData = async () => {
      const pProduk = services.produk.getProduk();
      const pTipe = services.tipeDebitur.getAlltipeDebitur();
      const [produk, tipe] = await Promise.all([pProduk, pTipe]);
      setListProduk(produk);
      setListAllTipeDebitur(tipe);
    };
    fetchData();

    calcRef.current = true;
  }, []);

  const [listAllTipeDebitur, setListAllTipeDebitur] =
    useState<AlltipeDebiturResponse>([]);
  const [listProduk, setListProduk] = useState<GetProdukResponse>([]);
  const [selectedProduk, setSelectedProduk] = useState<GetProdukResponse[0]>();
  const [simulasiResult, setSimulasiResult] = useState<SimulasiResult>();

  const form = useForm<SimulasiForm>({
    schema: zodResolver(zSimulasiForm),
    initialValues: {
      nama: '',
      tgLahir: new Date('1970-01-01'),
      kanBayarAsal: '',
      takeOver: false,
      tipeDebitur: 'PNS/CPNS OTONOM',
      produk: 'KCU UMUM ANUITAS',
      skemaBunga: 'ANUITAS',
      jangkaWaktu: 12,
      gaji: 0,
      blokirAngsuran: 0,
      plafond: 0,
      maksPlafond: 0,
      pelunasan: 0,
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
    if (!selectedProduk) return;
    const { gaji, jangkaWaktu } = form.values;
    console.log(gaji);
    if (gaji >= 500000) {
      const p = await services.indeksPengali.getIndeksPengali(
        selectedProduk.id,
        jangkaWaktu,
      );
      console.log(p);
      const maksPlafond = p.pengali * gaji;
      console.log(maksPlafond);

      form.setFieldValue('maksPlafond', maksPlafond);
    }
  };

  const simulasi = () => {
    console.log('executed');
    if (!selectedProduk) return;
    const { plafond, maksPlafond, pelunasan, jangkaWaktu, blokirAngsuran } =
      form.values;
    if (plafond > maksPlafond) {
      form.setFieldError(
        'plafond',
        'Plafond tidak boleh melebihi maksimal plafond',
      );
      return;
    }
    const angsuran = xPMT(
      plafond,
      selectedProduk.bunga,
      jangkaWaktu,
      selectedProduk.skema,
    );
    const asuransi = (10 / 100) * plafond;
    const provisi = Math.round((1.5 / 100) * plafond);

    const administrasi = 0;
    const tBlokir = blokirAngsuran * angsuran;
    const tBiaya = asuransi + provisi + administrasi;
    const tBersih = plafond - tBiaya;
    let tTerima: number;
    if (pelunasan) {
      tTerima = plafond - tBiaya - pelunasan;
    } else {
      tTerima = tBersih;
    }
    const hasil: SimulasiResult = {
      angsuran,
      asuransi,
      provisi,
      administrasi,
      tBlokir,
      tBiaya,
      tBersih,
      tTerima,
    };

    setSimulasiResult(hasil);
  };
  const saveSimulasi = () => {
    if (simRef.current) {
      const original = {
        height: simRef.current.style.height,
        padding: simRef.current.style.padding,
        backgroundColor: simRef.current.style.backgroundColor,
      };

      simRef.current.style.height = 'auto';
      if (localStorage.getItem('mantine-color-scheme') === 'dark') {
        simRef.current.style.backgroundColor = '#1A1B1E';
      } else {
        simRef.current.style.backgroundColor = '#fff';
      }
      simRef.current.style.padding = '5px';

      html2canvas(simRef.current).then((canvas) => {
        saveAs(canvas.toDataURL(), `simulasi-${form.values.nama}.png`);
      });

      simRef.current.style.height = original.height;
      simRef.current.style.backgroundColor = original.backgroundColor;
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
              <Rows title="Sales Officer">
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
            <Rows title="Nama Calon Debitur">
              <TextInput size="xs" {...form.getInputProps('nama')} />
            </Rows>
            <Rows title="Tanggal Lahir">
              <DatePicker
                sx={{ div: { div: { paddingRight: 0 } } }}
                minDate={dayjs(new Date()).subtract(79, 'y').toDate()}
                maxDate={dayjs(new Date()).subtract(20, 'y').toDate()}
                locale="id"
                inputFormat="DD MMMM YYYY"
                size="xs"
                initialLevel="year"
                {...form.getInputProps('tgLahir')}
              />
            </Rows>
            <Rows title="Kantor Bayar Asal">
              <TextInput size="xs" {...form.getInputProps('kanBayarAsal')} />
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

            {listProduk && (
              <Rows title="Produk">
                <NativeSelect
                  data={listProduk.map((item) => item.nama)}
                  size="xs"
                  {...form.getInputProps('produk')}
                />
              </Rows>
            )}

            <Rows title="jangka Waktu">
              <NativeSelect
                itemType="number"
                data={[...Array(25).keys()].map((x) => String((x + 1) * 12))}
                rightSection={
                  <Text size="xs" mr={20}>
                    Bulan
                  </Text>
                }
                size="xs"
                {...form.getInputProps('jangkaWaktu')}
              />
            </Rows>
            <Grid.Col span={5}>
              <Text size="sm">Gaji</Text>
            </Grid.Col>
            <Grid.Col span={4}>
              <TextInput
                sx={{ input: { textAlign: 'right' } }}
                size="xs"
                onChange={(evt) => moneyMasker(evt, 'gaji')}
                error={form.errors.gaji}
              />
            </Grid.Col>

            <Grid.Col span={5}>
              <Text size="sm">Blokir</Text>
            </Grid.Col>
            <Grid.Col span={4}>
              <TextInput
                sx={{ input: { textAlign: 'right' } }}
                size="xs"
                onChange={(evt) => moneyMasker(evt, 'blokirAngsuran')}
                error={form.errors.blokirAngsuran}
              />
            </Grid.Col>
            <Grid.Col span={3}>
              <Button size="xs" sx={{ width: '90%' }} onClick={getMaksPlafond}>
                MAKS
              </Button>
            </Grid.Col>
            {form.values.maksPlafond !== 0 && (
              <Rows title="Maksimum Plafond">
                <Text size="xs" mr={14} align="right">
                  {form.values.maksPlafond.toLocaleString('id')}
                </Text>
              </Rows>
            )}
            <Rows title="Plafond">
              <TextInput
                disabled={form.values.maksPlafond === 0}
                sx={{ input: { textAlign: 'right' } }}
                size="xs"
                onChange={(evt) => moneyMasker(evt, 'plafond')}
                error={form.errors.plafond}
              />
            </Rows>
            {simulasiResult && selectedProduk && (
              <>
                <Grid.Col span={12}>
                  <Divider my="sm" />
                </Grid.Col>

                <Rows title="IIR">
                  <Text size="xs" mr={5} align="right">
                    {(
                      (simulasiResult.angsuran / form.values.gaji) *
                      100
                    ).toFixed(2)}{' '}
                    %
                  </Text>
                </Rows>

                <Rows title="Bunga">
                  <Text size="xs" mr={5} align="right">
                    {Math.round(selectedProduk.bunga * 10000) / 100} {'%'}
                  </Text>
                </Rows>
                <Rows title="Angsuran">
                  <Text size="xs" mr={5} align="right">
                    {simulasiResult.angsuran.toLocaleString('id')}
                  </Text>
                </Rows>
                <Grid.Col span={12}>
                  <Divider my="sm" />
                </Grid.Col>
                <Rows title="Asuransi">
                  <Text size="xs" mr={5} align="right">
                    {simulasiResult.asuransi.toLocaleString('id')}
                  </Text>
                </Rows>
                <Rows title="Provisi">
                  <Text size="xs" mr={5} align="right">
                    {simulasiResult.provisi.toLocaleString('id')}
                  </Text>
                </Rows>
                <Rows title="Administrasi">
                  <Text size="xs" mr={5} align="right">
                    {simulasiResult.administrasi.toLocaleString('id')}
                  </Text>
                </Rows>
                <Rows title="Total Blokir">
                  <Text size="xs" mr={5} align="right">
                    {simulasiResult.tBlokir.toLocaleString('id')}
                  </Text>
                </Rows>
                <Rows title="Total Biaya">
                  <Text size="xs" mr={5} align="right">
                    {simulasiResult.tBiaya.toLocaleString('id')}
                  </Text>
                </Rows>
                <Grid.Col span={12}>
                  <Divider my="sm" />
                </Grid.Col>
                <Rows title="Terima Bersih">
                  <Text size="xs" mr={5} align="right">
                    {simulasiResult.tBersih.toLocaleString('id')}
                  </Text>
                </Rows>

                <Rows title="Total Penerimaan">
                  <Text size="xs" mr={5} align="right">
                    {simulasiResult.tTerima.toLocaleString('id')}
                  </Text>
                </Rows>
              </>
            )}
          </Grid>
        </ScrollArea>

        <Box
          sx={{
            position: 'fixed',
            bottom: 10,
            left: 0,
            right: 0,
            display: 'flex',
            gap: '10px',
          }}
          mb={8}
          px={8}
        >
          {!simulasiResult ? (
            <Button
              sx={{ flexGrow: 1 }}
              type="submit"
              disabled={form.values.maksPlafond === 0}
              onClick={() => simulasi()}
            >
              Simulasi
            </Button>
          ) : (
            <>
              <Button
                onClick={() => {
                  form.reset();
                  if (formRef.current) formRef.current.reset();
                  setSimulasiResult(undefined);
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
