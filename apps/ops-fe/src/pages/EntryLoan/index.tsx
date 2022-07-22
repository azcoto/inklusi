import {
  Container,
  Text,
  Stack,
  Group,
  Select,
  Button,
  Switch,
  LoadingOverlay,
  Divider,
  Card,
} from '@mantine/core';
import { ETextInput } from '@/components/ETextInput';
import { ENumberInput } from '@/components/ENumberInput';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { EDatePicker } from '@/components/EDatePicker';
import { useEffect, useState } from 'react';
import { ESelect } from '@/components/ESelect';
import dayjs from 'dayjs';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createDebitur } from '@/services/debitur';
import { notifySuccess } from '@/libs/notify';
import { showNotification } from '@mantine/notifications';
import services from '@/services';
import { AlltipeDebiturResponse } from '@/../../server/src/api/tipeDebitur/dto';
import { GetProdukResponse } from '@/../../server/src/api/produk/dto';
import { ESwitch } from '@/components/ESwitch';
import { EAutocomplete } from '@/components/EAutocomplete';
import DebiturDisplay from '@/components/DebiturDisplay';

const zMyForm = z.object({
  cif: z.string().min(6, { message: 'CIF Invalid' }),
  tglPengajuan: z.string().min(1, { message: 'Jenis PK Required' }),
  jenisPK: z.string().min(1, { message: 'Jenis PK Required' }),
  plafond: z.string().min(1, { message: 'Tempat Lahir Required' }),
  angsuran: z.string().min(1, { message: 'Tanggal Lahir Required' }),
  tenor: z.string().min(1, { message: 'Alamat Required' }),
  tipeDebitur: z.string().min(1, { message: 'Kelurahan Required' }),
  produk: z.string().min(1, { message: 'Kelurahan Required' }),
  takeOver: z.string().min(1, { message: 'Password Invalid' }),
  nominalPelunasan: z.string().min(1, { message: 'Kota Required' }),
  bankPelunasan: z.string().min(1, { message: 'Nama Ibu Required' }),
  cabang: z.string().min(1, { message: 'Instansi Required' }),
  tl: z.string().min(1, { message: 'Pangkat Required' }),
  mr: z.string().min(1, { message: 'Golongan Required' }),
});

type MyForm = z.infer<typeof zMyForm>;

type TipeDebiturData = {
  value: string;
  label: string;
}[];

type ProdukData = {
  value: string;
  label: string;
}[];

type TLData = {
  value: string;
  label: string;
}[];

type MRData = {
  value: string;
  label: string;
}[];

type CabangData = {
  value: string;
  label: string;
}[];

export const EntryLoan = () => {
  const [allTipeDebitur, setAlltipeDebitur] = useState<TipeDebiturData>([]);
  const [allProduk, setAllProduk] = useState<ProdukData>([]);
  const [allTl, setAllTl] = useState<TLData>([]);
  const [allMr, setAllMr] = useState<MRData>([]);
  const [allCabang, setAllCabang] = useState<CabangData>([]);

  const methods = useForm<MyForm>({
    resolver: zodResolver(zMyForm),
    defaultValues: {
      cif: '',
      tglPengajuan: '',
      jenisPK: '',
      plafond: '',
      angsuran: '',
      tenor: '',
      tipeDebitur: '',
      produk: '',
      takeOver: '0',
      nominalPelunasan: '',
      bankPelunasan: '',
      cabang: '',
      tl: '',
      mr: '',
    },
  });

  const qTipeDebitur = useQuery(
    ['get-all-tipe-debitur'],
    () => services.tipeDebitur.getAlltipeDebitur(),
    {
      onSuccess: (data) => {
        setAlltipeDebitur(
          data.map((item) => ({
            value: String(item.id),
            label: item.nama,
          })),
        );
      },
    },
  );

  const qProduk = useQuery(
    ['get-all-produk'],
    () => services.produk.getProduk(),
    {
      onSuccess: (data) => {
        setAllProduk(
          data.map((item) => ({
            value: String(item.id),
            label: item.nama,
          })),
        );
      },
    },
  );

  const qTl = useQuery(['get-all-tl'], () => services.tlso.getAllTl(), {
    onSuccess: (data) => {
      setAllTl(
        data.map((item) => ({
          value: String(item.nip),
          label: item.nama,
        })),
      );
    },
  });

  const watchTl = methods.watch('tl');

  const qMr = useQuery(
    ['get-all-mr', watchTl],
    () => services.tlso.getSoByTl(watchTl),
    {
      enabled: methods.getValues('tl') !== '' ? true : false,
      onSuccess: (data) => {
        setAllMr(
          data.map((item) => ({
            value: String(item.nip),
            label: item.nama,
          })),
        );
      },
    },
  );

  const qCabang = useQuery(['cabang'], services.cabang.getAllCabang, {
    onSuccess(data) {
      setAllCabang(
        data.map((item) => ({
          value: String(item.id),
          label: item.nama,
        })),
      );
    },
  });

  const watchTakeOver = methods.watch('takeOver');
  const watchCIF = methods.watch('cif');

  return (
    <Container sx={{ position: 'relative' }} fluid>
      <DevTool control={methods.control} />
      <Group grow align="start">
        <FormProvider {...methods}>
          <form>
            <Card sx={{ position: 'relative' }}>
              <LoadingOverlay
                visible={
                  qTipeDebitur.isFetching ||
                  qProduk.isFetching ||
                  qCabang.isFetching ||
                  qTl.isFetching ||
                  qMr.isFetching
                }
              />

              <Stack>
                <Text size="lg" weight="bold">
                  ENTRY PENGAJUAN KREDIT
                </Text>
                <Divider my={4} />
                <Group grow>
                  <ETextInput uppercase name="cif" label="CIF" />
                  <EDatePicker name="tglPengajuan" label="Tanggal Pengajuan" />
                  <ESelect
                    sx={{ flex: 1 }}
                    name="jenisPK"
                    label="Jenis PK"
                    data={[
                      {
                        value: '1',
                        label: 'PK I',
                      },
                      {
                        value: '2',
                        label: 'PK II',
                      },
                      {
                        value: '3',
                        label: 'PK III',
                      },
                    ]}
                  />
                </Group>
                <Group grow>
                  <ENumberInput
                    name="plafond"
                    label="Plafond (Rp.)"
                    currencyMask={true}
                    rtl
                  />
                  <ENumberInput
                    name="angsuran"
                    label="Angsuran (Rp.)"
                    currencyMask={true}
                    rtl
                  />
                  <ENumberInput
                    sx={{ width: '100px' }}
                    name="tenor"
                    label="Jangka Waktu (Bulan)"
                  />
                </Group>
                <Group align="end">
                  {qTipeDebitur.isSuccess && qProduk.isSuccess && (
                    <>
                      <ESelect
                        sx={{ flex: 1 }}
                        name="tipeDebitur"
                        label="Tipe Debitur"
                        data={allTipeDebitur}
                      />
                      <ESelect
                        sx={{ flex: 1 }}
                        name="produk"
                        label="Produk"
                        data={allProduk}
                      />
                    </>
                  )}
                  <ESwitch
                    size="md"
                    name="takeOver"
                    onSideLabel="Take Over"
                    offSideLabel="SK On Hand"
                  />
                </Group>

                {watchTakeOver === '1' && (
                  <Group grow>
                    <ENumberInput
                      sx={{ flex: 1 }}
                      name="nominalPelunasan"
                      label="Nominal Pelunasan (Rp.)"
                      currencyMask
                      rtl
                    />
                    <ETextInput
                      sx={{ flex: 1 }}
                      name="bankPelunasan"
                      label="Bank Pelunasan"
                      uppercase
                    />
                  </Group>
                )}
                <Group grow>
                  {qTl.isFetched && (
                    <ESelect
                      name="tl"
                      data={allTl}
                      label="Team Leader"
                      searchable
                    />
                  )}

                  {qMr.isFetched && (
                    <ESelect
                      name="mr"
                      data={allMr}
                      label="Marketing Representative"
                      searchable
                    />
                  )}
                  {qCabang.isFetched && (
                    <ESelect
                      name="cabang"
                      data={allCabang}
                      label="Cabang Pengajuan"
                      searchable
                    />
                  )}
                </Group>

                <Button type="submit">SUBMIT</Button>
              </Stack>
            </Card>
          </form>
        </FormProvider>
        {watchCIF && watchCIF.length === 6 && <DebiturDisplay cif={watchCIF} />}
      </Group>
    </Container>
  );
};
