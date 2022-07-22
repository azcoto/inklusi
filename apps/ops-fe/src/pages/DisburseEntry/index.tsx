import {
  Select,
  Autocomplete,
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
import { useMutation, useQuery } from '@tanstack/react-query';
import services from 'services';

const zEntryForm = z.object({
  nopen: z.string().min(1, { message: 'Nopen tidak boleh kosong' }),
  nama: z.string().min(1, { message: 'Nama tidak boleh kosong' }),
  tgRealisasi: z
    .date({ required_error: 'Tanggal Realisasi tidak boleh kosong' })
    .default(new Date()),
  tipeDebitur: z.string(),
  produk: z.string(),
  tenor: z.string().transform((s) => Number(s)),
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
      tenor: 0,
      plafond: 0,
      norekKredit: '',
      tgRealisasi: new Date(),
      nikTl: '',
      nikMr: '',
    },
  });

  const produkQuery = useQuery(['produk'], services.produk.getProduk);
  const tipeDebiturQuery = useQuery(
    ['tipeDebitur'],
    services.tipeDebitur.getAlltipeDebitur,
  );
  const cabangQuery = useQuery(['cabang'], services.cabang.getAllCabang);
  const tlQuery = useQuery(['tl'], services.tlso.getAllTl);
  const mrQuery = useQuery(
    ['mr', form.values.nikTl],
    () => services.tlso.getSoByTl(form.values.nikTl),
    {
      enabled: form.values.nikTl !== '',
    },
  );

  const putDisburseMutation = useMutation(services.disburse.putDisburse, {
    onSuccess: () => console.log('Success'),
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

  const submitData = (param: EntryForm) => {
    const parsed = zEntryForm.parse(param);

    const data = {
      nopen: parsed.nopen,
      nama: parsed.nama,
      tgRealisasi: parsed.tgRealisasi,
      tipeDebiturId: tipeDebiturQuery.data?.find(
        (p) => p.nama === parsed.tipeDebitur,
      )?.id as number,
      produkId: produkQuery.data?.find((p) => p.nama === parsed.produk)
        ?.id as number,
      tenor: parsed.tenor,
      plafond: parsed.plafond,
      norekKredit: parsed.norekKredit,
      nikTl: parsed.nikTl,
      nikMr: parsed.nikMr,
      cabangId: cabangQuery.data?.find((p) => p.nama === parsed.cabang)
        ?.id as number,
    };
    putDisburseMutation.mutate(data);
    form.reset();
  };

  return (
    <Container fluid>
      <form ref={formRef} onSubmit={form.onSubmit(submitData)}>
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
          {tipeDebiturQuery.data && (
            <Autocomplete
              sx={{ alignSelf: 'stretch' }}
              size="xs"
              label="Tipe Debitur"
              data={tipeDebiturQuery.data.map((p) => p.nama)}
              {...form.getInputProps('tipeDebitur')}
            />
          )}

          {produkQuery.data && (
            <Group sx={{ alignSelf: 'stretch', alignItems: 'flex-end' }}>
              <Autocomplete
                sx={{ flexGrow: 1 }}
                size="xs"
                label="Produk"
                data={produkQuery.data.map((p) => p.nama)}
                {...form.getInputProps('produk')}
              />
              <Switch label="SK On Hand" />
            </Group>
          )}

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
              onChange={(evt) => moneyMasker(evt, 'tenor')}
              error={form.errors.tenor}
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
            {cabangQuery.data && (
              <Autocomplete
                sx={{ flexGrow: 1 }}
                size="xs"
                label="Cabang"
                limit={10}
                data={cabangQuery.data.map((p) => {
                  return {
                    value: p.nama,
                    group: p.kanwil,
                  };
                })}
                {...form.getInputProps('cabang')}
              />
            )}
          </Group>
          <Group sx={{ alignSelf: 'stretch' }} grow>
            {tlQuery.data && (
              <Select
                size="xs"
                label="Team Leader"
                data={tlQuery.data.map((p) => {
                  return {
                    value: p.nip,
                    label: p.nama,
                  };
                })}
                {...form.getInputProps('nikTl')}
              />
            )}
            {mrQuery.data && (
              <Select
                size="xs"
                label="Marketing Representative"
                data={mrQuery.data.map((p) => {
                  return { value: p.nip, label: p.nama };
                })}
                {...form.getInputProps('nikMr')}
              />
            )}
          </Group>
          <TextInput
            sx={{ alignSelf: 'stretch' }}
            size="xs"
            label="Nomor Rekening Kredit"
            {...form.getInputProps('norekKredit')}
          />
          <Button type="submit" fullWidth>
            SUBMIT
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default DisburseEntry;
