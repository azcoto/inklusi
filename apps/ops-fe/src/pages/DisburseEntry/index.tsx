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
});

type EntryForm = z.infer<typeof zEntryForm>;

const DisburseEntry = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<EntryForm>({
    schema: zodResolver(zEntryForm),
    initialValues: {
      nopen: '',
      nama: '',
      jangkaWaktu: 12,
      plafond: 0,
      norekKredit: '',
      tgRealisasi: new Date(),
    },
  });

  const moneyMasker = (
    evt: React.ChangeEvent<HTMLInputElement>,
    field: keyof EntryForm,
  ) => {
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
          />
          <TextInput sx={{ alignSelf: 'stretch' }} size="xs" label="Nama" />
          <Select
            sx={{ alignSelf: 'stretch' }}
            size="xs"
            label="Tipe Debitur"
            data={tipeDebitur}
          />

          <Group sx={{ alignSelf: 'stretch', alignItems: 'flex-end' }}>
            <Select
              sx={{ flexGrow: 1 }}
              size="xs"
              label="Produk"
              data={produk}
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
            />
            <TextInput
              sx={{ flexGrow: 1, input: { textAlign: 'right' } }}
              size="xs"
              label="Plafond"
              onChange={(evt) => moneyMasker(evt, 'plafond')}
            />
          </Group>

          <Group sx={{ alignSelf: 'stretch' }}>
            <DatePicker
              sx={{ width: '150px' }}
              size="xs"
              locale="id"
              inputFormat="DD MMMM YYYY"
              label="Tanggal Realisasi"
            />
            <Select sx={{ flexGrow: 1 }} size="xs" label="Cabang" data={[]} />
          </Group>
          <Group sx={{ alignSelf: 'stretch' }} grow>
            <Select size="xs" label="Team Leader" data={[]} />
            <Select size="xs" label="Marketing Representative" data={[]} />
          </Group>
          <TextInput
            sx={{ alignSelf: 'stretch' }}
            size="xs"
            label="Nomor Rekening Kredit"
          />
          <Button fullWidth>SUBMIT</Button>
        </Stack>
      </form>
    </Container>
  );
};

export default DisburseEntry;
