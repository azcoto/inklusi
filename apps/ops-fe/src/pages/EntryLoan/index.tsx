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

const zMyForm = z.object({
  cif: z.string().min(6, { message: 'CIF Invalid' }),
  tglPengajuan: z.string().min(1, { message: 'Jenis PK Required' }),
  jenisPk: z.string().min(1, { message: 'Jenis PK Required' }),
  plafondPengajuan: z.string().min(1, { message: 'Tempat Lahir Required' }),
  angsuranPengajuan: z.string().min(1, { message: 'Tanggal Lahir Required' }),
  tenorPengajuan: z.string().min(1, { message: 'Alamat Required' }),
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

export const EntryLoan = () => {
  const methods = useForm<MyForm>({
    resolver: zodResolver(zMyForm),
    defaultValues: {
      cif: '',
      tglPengajuan: '',
      jenisPk: '',
      plafondPengajuan: '',
      angsuranPengajuan: '',
      tenorPengajuan: '',
      tipeDebiturId: '',
      produkId: '',
      takeover: '0',
      pelunasan: '',
      bankPelunasan: '',
      cabangId: '',
      tlNip: '',
      mrNip: '',
    },
  });

  const qTipeDebitur = useQuery(
    ['get-all-tipe-debitur'],
    async () => await services.tipeDebitur.getAlltipeDebitur(),
    {
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
      select: (data) => {
        return data.map((item) => ({
          value: String(item.nip),
          label: item.nama,
        }));
      },
    },
  );

  const mCreateLoan = useMutation(['create-loan'], services.loan.createLoan, {
    onSuccess: (data) => {
      notifySuccess(
        `Pengajuan ${data.noPengajuan} Berhasil Ditambahkan`,
        showNotification,
      );
      methods.reset();
    },
  });

  const watchTl = methods.watch('tlNip');

  const qMr = useQuery(
    ['get-all-mr', watchTl],
    () => services.tlso.getSoByTl(watchTl),
    {
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
    select(data) {
      return data.map((item) => ({
        value: String(item.id),
        label: item.nama,
      }));
    },
  });

  const watchTakeOver = methods.watch('takeover');
  useEffect(() => {
    if (watchTakeOver === '0') {
      methods.setValue('pelunasan', undefined);
      methods.setValue('bankPelunasan', undefined);
      methods.unregister('pelunasan');
      methods.unregister('bankPelunasan');
    } else if (watchTakeOver === '1') {
      methods.setValue('pelunasan', '');
      methods.setValue('bankPelunasan', '');
      methods.register('pelunasan');
      methods.register('bankPelunasan');
    }
  }, [watchTakeOver]);

  const watchCIF = methods.watch('cif');

  const submitHandler: SubmitHandler<MyForm> = async (values) => {
    const parsedValues = {
      ...values,
      tglPengajuan: new Date(values.tglPengajuan),
      tipeDebiturId: Number(values.tipeDebiturId),
      produkId: Number(values.produkId),
      takeover: values.takeover === '1' ? true : false,
      pelunasan: isNaN(Number(values.pelunasan?.replaceAll('.', '')))
        ? undefined
        : Number(values.pelunasan?.replaceAll('.', '')),
      plafondPengajuan: Number(values.plafondPengajuan?.replaceAll('.', '')),
      angsuranPengajuan: Number(values.angsuranPengajuan?.replaceAll('.', '')),
      tenorPengajuan: Number(values.tenorPengajuan),
      cabangId: Number(values.cabangId),
    };
    if (parsedValues.takeover === false) {
      delete parsedValues.pelunasan;
      delete parsedValues.bankPelunasan;
    }
    //@ts-ignore
    console.log(parsedValues);
    //@ts-ignore
    mCreateLoan.mutate(parsedValues);
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
                    name="plafondPengajuan"
                    label="Plafond (Rp.)"
                    currencyMask={true}
                    rtl
                  />
                  <ENumberInput
                    name="angsuranPengajuan"
                    label="Angsuran (Rp.)"
                    currencyMask={true}
                    rtl
                  />
                  <ENumberInput
                    sx={{ width: '100px' }}
                    name="tenorPengajuan"
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

                {watchTakeOver === '1' && (
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
