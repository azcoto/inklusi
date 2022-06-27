import {
  Select,
  TextInput,
  Text,
  Container,
  Divider,
  Stack,
  Group,
  Switch,
  Button,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm, zodResolver } from '@mantine/form';
import { useRef } from 'react';
import { z } from 'zod';

const tipeDebitur = [
  'PNS/CPNS OTONOM',
  'PENSIUN',
  'PNS/CPNS VERTIKAL PAYROLL',
  'PNS/CPNS VERTIKAL NON PAYROLL',
  'BUMN/BUMD PAYROLL',
  'BUMN/BUMD NON PAYROLL',
  'BUMS PAYROLL',
  'BUMS NON PAYROLL',
  'PPPK',
];

const produk = [
  'KCU UMUM ANUITAS',
  'KCU UMUM FLAT',
  'KCU UMUM SLIDING',
  'MURABAHAH PLUS',
  'MUSYARAKAH MUTANAQISHAH (MMQ)',
];

const zEntryForm = z.object({
  nopen: z.string().min(1, { message: 'Nopen tidak boleh kosong' }),
  nama: z.string().min(1, { message: 'Nama tidak boleh kosong' }),
  tgRealisasi: z
    .date({ required_error: 'Tanggal Realisasi tidak boleh kosong' })
    .default(new Date()),
  tipeDebitur: z.string(),
  produk: z.string(),
  jangkaWaktu: z
    .string()
    .or(z.number())
    .transform((s) => Number(s)),
  plafond: z
    .string({ invalid_type_error: 'Harus Diisi' })
    .transform((s) => Number(s))
    .superRefine((arg, ctx) => ctx.addIssue),
  norekKredit: z
    .string()
    .min(1, { message: 'Norek Kredit tidak boleh kosong' }),
  nikTl: z.string(),
  nikMr: z.string(),
  cabang: z.string(),
});

type EntryForm = z.infer<typeof zEntryForm>;

const DisburseEntry = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<EntryForm>({
    schema: zodResolver(zEntryForm),
    initialValues: {
      nopen: '',
      nama: '',
      produk: '',
      cabang: '',
      tipeDebitur: '',
      jangkaWaktu: 0,
      plafond: 0,
      norekKredit: '',
      tgRealisasi: new Date(),
      nikTl: '',
      nikMr: '',
    },
  });

  const moneyMasker = (
    evt: React.ChangeEvent<HTMLInputElement>,
    field: keyof EntryForm,
  ) => {
    console.log(evt);
    evt.target.value = evt.target.value.replaceAll('.', '');
    form.setFieldValue(field, evt.target.value);
    evt.target.value = Number(evt.target.value).toLocaleString('id');
  };

  return (
    <Container fluid>
      <form ref={formRef}>
        <Text size="lg" weight={'bold'}>
          Form Entry Disburse
        </Text>
        <Divider mb={20} />
        <Stack sx={{ maxWidth: 500 }} align="flex-start">
          <TextInput
            sx={{ alignSelf: 'stretch' }}
            size="xs"
            label="Nopen / NIP"
            {...form.getInputProps('nopen')}
          />
          <TextInput
            sx={{ alignSelf: 'stretch' }}
            size="xs"
            label="Nama"
            {...form.getInputProps('nama')}
          />
          <Select
            sx={{ alignSelf: 'stretch' }}
            size="xs"
            label="Tipe Debitur"
            data={tipeDebitur}
            {...form.getInputProps('tipeDebitur')}
          />

          <Group sx={{ alignSelf: 'stretch', alignItems: 'flex-end' }}>
            <Select
              sx={{ flexGrow: 1 }}
              size="xs"
              label="Produk"
              data={produk}
              {...form.getInputProps('produk')}
            />
            <Switch label="SK On Hand" />
          </Group>

          <Group sx={{ alignSelf: 'stretch' }}>
            <TextInput
              sx={{ width: '150px' }}
              size="xs"
              label="Jangka Waktu"
              rightSection={
                <Text size="xs" weight="lighter" pr={8}>
                  Bulan
                </Text>
              }
              onChange={(evt) => moneyMasker(evt, 'jangkaWaktu')}
              error={form.errors.jangkaWaktu}
            />
            <TextInput
              sx={{
                flexGrow: 1,
                input: { textAlign: 'right' },
              }}
              size="xs"
              label="Plafond"
              onChange={(evt) => moneyMasker(evt, 'plafond')}
              error={form.errors.plafond}
            />
          </Group>

          <Group sx={{ alignSelf: 'stretch' }}>
            <DatePicker
              sx={{ width: '150px' }}
              size="xs"
              locale="id"
              inputFormat="DD MMMM YYYY"
              label="Tanggal Realisasi"
              {...form.getInputProps('tgRealisasi')}
            />
            <Select
              sx={{ flexGrow: 1 }}
              size="xs"
              label="Cabang"
              data={[]}
              {...form.getInputProps('cabang')}
            />
          </Group>
          <Group sx={{ alignSelf: 'stretch' }} grow>
            <Select
              size="xs"
              label="Team Leader"
              data={[]}
              {...form.getInputProps('nikTl')}
            />
            <Select
              size="xs"
              label="Marketing Representative"
              data={[]}
              {...form.getInputProps('nikMr')}
            />
          </Group>
          <TextInput
            sx={{ alignSelf: 'stretch' }}
            size="xs"
            label="Nomor Rekening Kredit"
            {...form.getInputProps('norekKredit')}
          />
          <Button fullWidth>SUBMIT</Button>
        </Stack>
      </form>
    </Container>
  );
};

export default DisburseEntry;
