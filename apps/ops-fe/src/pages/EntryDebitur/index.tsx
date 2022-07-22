import {
  Container,
  Text,
  Stack,
  Group,
  Select,
  Button,
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
import { useMutation } from '@tanstack/react-query';
import { createDebitur } from '@/services/debitur';
import { notifySuccess } from '@/libs/notify';
import { showNotification } from '@mantine/notifications';

const zMyForm = z.object({
  nopen: z.string().min(11, { message: 'NIP Invalid' }),
  nik: z.string().min(16, { message: 'No KTP Invalid' }),
  nama: z.string().min(1, { message: 'Nama Required' }),
  tempatLahir: z.string().min(1, { message: 'Tempat Lahir Required' }),
  tglLahir: z.string().min(1, { message: 'Tanggal Lahir Required' }),
  alamat: z.string().min(1, { message: 'Alamat Required' }),
  kelurahan: z.string().min(1, { message: 'Kelurahan Required' }),
  kecamatan: z.string().min(1, { message: 'Password Invalid' }),
  kota: z.string().min(1, { message: 'Kota Required' }),
  namaIbu: z.string().min(1, { message: 'Nama Ibu Required' }),
  instansi: z.string().min(1, { message: 'Instansi Required' }).optional(),
  pangkat: z.string().min(1, { message: 'Pangkat Required' }).optional(),
  golongan: z.string().min(1, { message: 'Golongan Required' }).optional(),
  bup: z.string().min(1, { message: 'BUP Required' }).optional(),
  sisaMasaDinas: z.string().min(1, { message: 'BUP Required' }).optional(),
  telepon: z.string().min(1, { message: 'Telepon Required' }),
});

type MyForm = z.infer<typeof zMyForm>;

export const EntryDebitur = () => {
  const [statusKerja, setStatusKerja] = useState<'PENSIUN' | 'AKTIF' | ''>('');

  useEffect(() => {
    if (statusKerja === 'PENSIUN') {
      methods.setValue('bup', undefined);
      methods.setValue('pangkat', undefined);
      methods.setValue('golongan', undefined);
      methods.setValue('instansi', undefined);
      methods.setValue('sisaMasaDinas', undefined);
      methods.unregister('bup');
      methods.unregister('pangkat');
      methods.unregister('golongan');
      methods.unregister('instansi');
      methods.unregister('sisaMasaDinas');
      console.log('unregistered');
    } else if (statusKerja === 'AKTIF') {
      methods.setValue('bup', '');
      methods.setValue('pangkat', '');
      methods.setValue('golongan', '');
      methods.setValue('instansi', '');
      methods.setValue('sisaMasaDinas', '');
      methods.register('bup');
      methods.register('pangkat');
      methods.register('golongan');
      methods.register('instansi');
      methods.register('sisaMasaDinas');
    }
  }, [statusKerja]);

  const methods = useForm<MyForm>({
    resolver: zodResolver(zMyForm),
    defaultValues: {
      nopen: '',
      nik: '',
      nama: '',
      tempatLahir: '',
      tglLahir: '',
      namaIbu: '',
      telepon: '',
      alamat: '',
      kelurahan: '',
      kecamatan: '',
      kota: '',
      instansi: '',
      pangkat: '',
      golongan: '',
      bup: '',
      sisaMasaDinas: '',
    },
  });

  const mCreateDebitur = useMutation(createDebitur, {
    onSuccess: () => {
      notifySuccess('Debitur Berhasil Ditambahkan', showNotification);
      methods.reset();
    },
  });

  const watchBUP = methods.watch('bup');
  const watchTglLahir = methods.watch('tglLahir');

  useEffect(() => {
    if (
      !isNaN(Number(watchBUP)) &&
      Number(watchBUP) !== 0 &&
      watchTglLahir !== ''
    ) {
      const tglBUP = dayjs(new Date(methods.getValues('tglLahir'))).add(
        Number(watchBUP),
        'y',
      );
      methods.setValue('sisaMasaDinas', `${tglBUP.diff(dayjs(), 'M')}`);
    }
  }, [watchBUP, watchTglLahir]);

  const onFormvalid: SubmitHandler<MyForm> = (value) => {
    console.log(value);

    if (statusKerja === 'PENSIUN') {
      delete value.bup;
      delete value.sisaMasaDinas;
      delete value.golongan;
      delete value.instansi;
      delete value.pangkat;
    }
    const formData = {
      ...value,
      bup: Number(value.bup),
      sisaMasaDinas: Number(value.sisaMasaDinas),
      tglLahir: new Date(value.tglLahir),
    };
    mCreateDebitur.mutate(formData);
  };

  return (
    <Container fluid>
      <DevTool control={methods.control} />
      <Text size="xl" weight="bold">
        Entry Debitur
      </Text>
      <Divider my={20} />
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onFormvalid, () => {
            console.log(methods.formState.errors);
          })}
        >
          <Card sx={{ maxWidth: '700px' }}>
            <Stack>
              <Group grow align="start">
                <ETextInput name="nopen" label="NOPEN / NIP" />
                <ENumberInput name="nik" label="No KTP" />
                <ETextInput sx={{ flex: 1 }} name="nama" label="Nama" />
              </Group>
              <Group grow align="start">
                <ETextInput name="tempatLahir" label="Tempat Lahir" />
                <EDatePicker name="tglLahir" label="Tanggal Lahir" />
                <ETextInput name="namaIbu" label="Nama Ibu Kandung" />
              </Group>
              <Group grow align="start">
                <ENumberInput name="telepon" label="Telepon" />
                <ETextInput sx={{ flex: 1 }} name="alamat" label="Alamat" />
              </Group>

              <Group grow align="start">
                <ETextInput name="kelurahan" label="Kelurahan" />
                <ETextInput name="kecamatan" label="Kecamatan" />
                <ETextInput name="kota" label="Kota" />
              </Group>

              <Group grow align="start">
                <Select
                  data={['PENSIUN', 'AKTIF']}
                  defaultValue=""
                  name="statusKerja"
                  label="Status"
                  onChange={(value) =>
                    value === 'PENSIUN'
                      ? setStatusKerja('PENSIUN')
                      : setStatusKerja('AKTIF')
                  }
                />
                {statusKerja === 'AKTIF' && (
                  <>
                    <ETextInput name="instansi" label="Nama Instansi" />
                    <ETextInput name="pangkat" label="Pangkat" />
                  </>
                )}
              </Group>
              <Group align="start">
                {statusKerja === 'AKTIF' && (
                  <>
                    <ETextInput name="golongan" label="Golongan" />
                    <ESelect
                      data={['58', '60', '70']}
                      name="bup"
                      label="Usia BUP"
                    />
                    <ETextInput
                      readOnly
                      variant="unstyled"
                      name="sisaMasaDinas"
                      label="Sisa Masa Dinas (Bulan)"
                    />
                  </>
                )}
              </Group>
              <Button type="submit">SUBMIT</Button>
            </Stack>
          </Card>
        </form>
      </FormProvider>
    </Container>
  );
};
