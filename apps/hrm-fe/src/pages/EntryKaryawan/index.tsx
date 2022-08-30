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
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useWatch,
} from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { EDatePicker } from '@/components/EDatePicker';
import { ESelect } from '@/components/ESelect';
import { useMutation, useQuery } from '@tanstack/react-query';
import services from '@/services';
import { notifySuccess } from '@/libs/notify';
import { showNotification } from '@mantine/notifications';
import { ETextarea } from '@/components/ETextArea';
import { EAutocomplete } from '@/components/EAutocomplete';

const zMyForm = z.object({
  nip: z.string().min(11, { message: 'NIP Invalid' }),
  nik: z.string().min(16, { message: 'No KTP Invalid' }),
  nama: z.string().min(1, { message: 'Nama Required' }),
  alamat: z.string().min(1, { message: 'Alamat Required' }),
  dati4: z.string().min(1, { message: 'Kelurahan Required' }),
  dati3: z.string().min(1, { message: 'Password Invalid' }),
  dati2: z.string().min(1, { message: 'Kota Required' }),
  dati1: z.string().min(1, { message: 'Kota Required' }),
  notelp: z.string().min(1, { message: 'Telepon Required' }),
  jabatan: z.string().min(1, { message: 'Telepon Required' }),
  nipAtasan: z.string().optional(),
});

type MyForm = z.infer<typeof zMyForm>;

export const EntryKaryawan = () => {
  const methods = useForm<MyForm>({
    resolver: zodResolver(zMyForm),
    defaultValues: {
      nip: '',
      nik: '',
      nama: '',
      alamat: '',
      dati4: '',
      dati3: '',
      dati2: '',
      dati1: '',
      notelp: '',
      jabatan: '',
      nipAtasan: undefined,
    },
  });

  const watchJabatan = useWatch({ control: methods.control, name: 'jabatan' });

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

  const mCreatekaryawan = useMutation(services.karyawan.createKaryawan, {
    onSuccess: () => {
      notifySuccess('Karyawan Berhasil Ditambahkan', showNotification);
      methods.reset();
    },
  });

  const onFormvalid: SubmitHandler<MyForm> = (value) => {
    mCreatekaryawan.mutate(value);
  };

  return (
    <Container fluid>
      <DevTool control={methods.control} />
      <Text size="xl" weight="bold">
        Entry Karyawan
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
                <ENumberInput rtl={false} name="nip" label="NIP" />
                <ENumberInput rtl={false} name="nik" label="NIK" />
                <ETextInput
                  uppercase
                  sx={{ flex: 1 }}
                  name="nama"
                  label="Nama"
                />
              </Group>
              <Group grow align="start">
                <ETextarea uppercase name="alamat" label="Alamat" />
                <ETextInput uppercase name="dati4" label="Kelurahan" />
              </Group>
              <Group grow align="start">
                <ETextInput uppercase name="dati3" label="Kecamatan" />
                <ETextInput uppercase name="dati2" label="Kota" />
                <ETextInput uppercase name="dati1" label="Provinsi" />
              </Group>
              <Group grow align="start">
                <ETextInput name="notelp" label="Telepon" />
                <EAutocomplete
                  data={[
                    { value: 'MR', label: 'MARKETING' },
                    { value: 'TL', label: 'TEAM LEADER' },
                  ]}
                  name="jabatan"
                  label="Jabatan"
                />
                {watchJabatan === 'MR' && qTl.data && (
                  <EAutocomplete
                    data={qTl.data}
                    name="nipAtasan"
                    label="Atasan"
                  />
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
