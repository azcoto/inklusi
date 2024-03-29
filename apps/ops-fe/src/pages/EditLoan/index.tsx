import formatISO from 'date-fns/formatISO';
import {
  Container,
  Text,
  Stack,
  Group,
  Button,
  LoadingOverlay,
  Divider,
  Card,
} from '@mantine/core';
import { ETextInput } from '@/components/ETextInput';
import { ENumberInput } from '@/components/ENumberInput';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
  useWatch,
} from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { EDatePicker } from '@/components/EDatePicker';
import { useEffect, useState } from 'react';
import { ESelect } from '@/components/ESelect';
import { useMutation, useQuery } from '@tanstack/react-query';
import services from '@/services';
import { ESwitch } from '@/components/ESwitch';
import DebiturDisplay from '@/components/DebiturDisplay';
import { notifySuccess } from '@/libs/notify';
import { showNotification } from '@mantine/notifications';
import { useParams } from 'react-router-dom';

const zMyForm = z.object({
  cif: z.string().min(6, { message: 'CIF Invalid' }),
  tglPengajuan: z.string().min(1, { message: 'Jenis PK Required' }),
  jenisPk: z.string().min(1, { message: 'Jenis PK Required' }),
  plafond: z.string().min(1, { message: 'Tempat Lahir Required' }),
  angsuran: z.string().optional(),
  tenor: z.string().min(1, { message: 'Alamat Required' }),
  tipeDebiturId: z.string().min(1, { message: 'Kelurahan Required' }),
  produkId: z.string().min(1, { message: 'Kelurahan Required' }),
  takeover: z.string().min(1, { message: 'Password Invalid' }),
  pelunasan: z.string().min(1, { message: 'Kota Required' }).optional(),
  bankPelunasan: z.string().min(1, { message: 'Nama Ibu Required' }).optional(),
  cabangId: z.string().min(1, { message: 'Instansi Required' }),
  tlNip: z.string().min(1, { message: 'Pangkat Required' }),
  mrNip: z.string().min(1, { message: 'Golongan Required' }),
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

export const EditLoan = () => {
  const [isTakeOver, setIsTakeOver] = useState(false);
  const { noPengajuan } = useParams() as { noPengajuan: string };
  const methods = useForm<MyForm>({
    resolver: zodResolver(zMyForm),
    defaultValues: {
      cif: '',
      tglPengajuan: '',
      jenisPk: '',
      plafond: '',
      angsuran: '',
      tenor: '',
      tipeDebiturId: '',
      produkId: '',
      takeover: '0',
      pelunasan: '',
      bankPelunasan: '',
      cabangId: '',
      tlNip: '',
      mrNip: '',
    },
    shouldUnregister: true,
  });

  const qTipeDebitur = useQuery(
    ['get-all-tipe-debitur'],
    async () => await services.tipeDebitur.getAlltipeDebitur(),
    {
      refetchOnMount: 'always',
      staleTime: Infinity,
      select: (data) => {
        return data.map((item) => ({
          value: String(item.id),
          label: item.nama,
        }));
      },
    },
  );

  const qProduk = useQuery(
    ['get-all-produk'],
    async () => await services.produk.getProduk(),
    {
      refetchOnMount: 'always',
      staleTime: Infinity,
      select: (data) => {
        return data.map((item) => ({
          value: String(item.id),
          label: item.nama,
        }));
      },
    },
  );

  const qTl = useQuery(
    ['get-all-tl'],
    async () => await services.tlso.getAllTl(),
    {
      refetchOnMount: 'always',
      staleTime: Infinity,
      select: (data) => {
        return data.map((item) => ({
          value: String(item.nip),
          label: item.nama,
        }));
      },
    },
  );

  const qGetLoan = useQuery(
    ['get-loan', noPengajuan],
    async () => await services.loan.getLoan(noPengajuan),
    {
      refetchOnMount: 'always',
      onSuccess: (data) => {
        methods.reset({
          cif: data.cif,
          tglPengajuan: String(data.tglPengajuan),
          jenisPk: data.jenisPk,
          plafond: new Intl.NumberFormat('Id').format(data.plafond),
          angsuran: data.angsuran
            ? new Intl.NumberFormat('Id').format(data.angsuran)
            : '',
          tenor: String(data.tenor),
          tipeDebiturId: String(data.tipeDebiturId),
          produkId: String(data.produkId),
          takeover: data.takeover ? '1' : '0',
          pelunasan: data.pelunasan
            ? new Intl.NumberFormat('Id').format(data.pelunasan)
            : '',
          bankPelunasan: data.bankPelunasan ? data.bankPelunasan : '',
          tlNip: data.tlNip,
          mrNip: data.mrNip,
          cabangId: String(data.cabangId),
        });
        // setIsTakeOver(data.takeover);
      },
    },
  );

  const watchTakeOver = useWatch({
    control: methods.control,
    name: 'takeover',
  });

  useEffect(() => {
    if (watchTakeOver === '0') {
      methods.setValue('pelunasan', undefined);
      methods.setValue('bankPelunasan', undefined);
      methods.unregister('pelunasan');
      methods.unregister('bankPelunasan');
      console.log('unreg');
    } else if (watchTakeOver === '1') {
      methods.setValue('pelunasan', '');
      methods.setValue('bankPelunasan', '');
      methods.register('pelunasan');
      methods.register('bankPelunasan');
      console.log('reg');
    }
  }, [watchTakeOver]);

  const mUpdateLoan = useMutation(['update-loan'], services.loan.updateLoan, {
    onSuccess: (data) => {
      notifySuccess(
        `Pengajuan ${data.noPengajuan} Berhasil Diubah`,
        showNotification,
      );
      qGetLoan.refetch();
      qCabang.refetch();
      qMr.refetch();
      qTl.refetch();
      qProduk.refetch();
      qTipeDebitur.refetch();
    },
  });

  const watchTl = methods.watch('tlNip');

  const qMr = useQuery(
    ['get-all-mr', watchTl],
    () => services.tlso.getSoByTl(watchTl),
    {
      refetchOnMount: 'always',
      staleTime: Infinity,
      enabled: methods.getValues('tlNip') !== '' ? true : false,
      select: (data) => {
        return data.map((item) => ({
          value: String(item.nip),
          label: item.nama,
        }));
      },
    },
  );

  const qCabang = useQuery(['cabang'], services.cabang.getAllCabang, {
    refetchOnMount: 'always',
    staleTime: Infinity,
    select(data) {
      return data.map((item) => ({
        value: String(item.id),
        label: item.nama,
      }));
    },
  });

  const watchCIF = methods.watch('cif');

  const submitHandler: SubmitHandler<MyForm> = async (values) => {
    const parsedValues = {
      ...values,
      tglPengajuan: formatISO(new Date(values.tglPengajuan)),
      tipeDebiturId: Number(values.tipeDebiturId),
      produkId: Number(values.produkId),
      takeover: values.takeover === '1' ? true : false,
      pelunasan: isNaN(Number(values.pelunasan?.replaceAll('.', '')))
        ? undefined
        : Number(values.pelunasan?.replaceAll('.', '')),
      plafond: Number(values.plafond?.replaceAll('.', '')),
      angsuran: Number(values.angsuran?.replaceAll('.', '')),
      tenor: Number(values.tenor),
      cabangId: Number(values.cabangId),
    };
    if (parsedValues.takeover === false) {
      delete parsedValues.pelunasan;
      delete parsedValues.bankPelunasan;
    }
    mUpdateLoan.mutate({ params: { noPengajuan }, body: parsedValues });
  };

  const submitErrorHandler: SubmitErrorHandler<MyForm> = (errors) => {
    console.log(errors);
  };

  return (
    <Container sx={{ position: 'relative' }} fluid>
      <DevTool control={methods.control} />
      <Group grow align="start">
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(submitHandler, submitErrorHandler)}
          >
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
                    name="jenisPk"
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
                  {qTipeDebitur.data && qProduk.data && (
                    <>
                      <ESelect
                        sx={{ flex: 1 }}
                        name="tipeDebiturId"
                        label="Tipe Debitur"
                        data={qTipeDebitur.data}
                      />
                      <ESelect
                        sx={{ flex: 1 }}
                        name="produkId"
                        label="Produk"
                        data={qProduk.data}
                      />
                    </>
                  )}
                  <ESwitch
                    size="md"
                    name="takeover"
                    onSideLabel="Take Over"
                    offSideLabel="SK On Hand"
                  />
                </Group>

                {watchTakeOver !== '0' && (
                  <Group grow>
                    <ENumberInput
                      sx={{ flex: 1 }}
                      name="pelunasan"
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
                  {qTl.data && (
                    <ESelect
                      name="tlNip"
                      data={qTl.data}
                      label="Team Leader"
                      searchable
                    />
                  )}

                  {qMr.data && (
                    <ESelect
                      name="mrNip"
                      data={qMr.data}
                      label="Marketing Representative"
                      searchable
                    />
                  )}
                  {qCabang.data && (
                    <ESelect
                      name="cabangId"
                      data={qCabang.data}
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
