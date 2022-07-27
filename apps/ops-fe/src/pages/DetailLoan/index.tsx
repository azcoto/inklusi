import { useQuery } from '@tanstack/react-query';
import LoanDisplay from '@/components/LoanDIsplay';
import { useAuthed } from '@/context/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import services from '@/services';
import {
  Button,
  Card,
  Container,
  Divider,
  Group,
  Stack,
  Text,
} from '@mantine/core';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import { z } from 'zod';
import { ESelect } from '@/components/ESelect';
import { ETextarea } from '@/components/ETextArea';
import { useEffect } from 'react';
import { ENumberInput } from '@/components/ENumberInput';
import { DevTool } from '@hookform/devtools';

const zMyForm = z.object({
  status: z.string().min(1),
  keterangan: z.string().min(1),
  plafond: z.string().min(1, { message: 'Plafond Required' }).optional(),
  tenor: z.string().min(1, { message: 'Tenor Required' }).optional(),
  angsuran: z.string().min(1, { message: 'Angsuran Required' }).optional(),
});
type MyForm = z.infer<typeof zMyForm>;

export const DetailLoan = () => {
  const { noPengajuan } = useParams() as { noPengajuan: string };
  const { currentUser } = useAuthed();

  const methods = useForm<MyForm>({
    resolver: zodResolver(zMyForm),
    defaultValues: {
      status: '',
      keterangan: '',
      plafond: '',
      tenor: '',
      angsuran: '',
    },
  });

  const watchStatus = methods.watch('status');

  useEffect(() => {
    if (watchStatus === 'APPROVED') {
      methods.setValue('plafond', '');
      methods.setValue('angsuran', '');
      methods.setValue('tenor', '');
      methods.register('plafond');
      methods.register('angsuran');
      methods.register('tenor');
    } else if (watchStatus !== 'APPROVED') {
      methods.setValue('plafond', '');
      methods.setValue('angsuran', '');
      methods.setValue('tenor', '');
      methods.unregister('plafond');
      methods.unregister('angsuran');
      methods.unregister('tenor');
    }
  }, [watchStatus]);

  const { data, isLoading, error, isFetched, isSuccess } = useQuery(
    ['get-loan', noPengajuan],
    async () => await services.loan.getLoan(noPengajuan),
    {
      select: (data) => {
        return {
          cif: data.Debitur.cif,
          noPengajuan: data.noPengajuan,
          tglPengajuan: dayjs(data.tglPengajuan).format('DD/MM/YYYY'),
          jenisPk: `PK ${data.jenisPk}`,
          plafondPengajuan: new Intl.NumberFormat('id-ID').format(
            data.plafondPengajuan,
          ),
          angsuranPengajuan: new Intl.NumberFormat('id-ID').format(
            data.angsuranPengajuan,
          ),
          tenorPengajuan: String(data.tenorPengajuan),
          tipeDebitur: data.TipeDebitur.nama,
          produk: data.Produk.nama,
          takeover: data.takeover ? 'YA' : 'TIDAK',
          pelunasan: data.pelunasan
            ? new Intl.NumberFormat('id-ID').format(data.pelunasan)
            : null,
          bankPelunasan: data.bankPelunasan,
          namaTl: data.KaryawanTL.nama,
          namaMr: data.KaryawanMR.nama,
          cabang: data.Cabang.nama,
          status: data.status,
          plafond: data.plafond
            ? new Intl.NumberFormat('id-ID').format(data.plafond)
            : null,
          tenor: data.tenor
            ? new Intl.NumberFormat('id-ID').format(data.tenor)
            : null,
          angsuran: data.angsuran
            ? new Intl.NumberFormat('id-ID').format(data.angsuran)
            : null,
          keterangan: data.keterangan,

          updated: dayjs(data.updatedAt).format('DD/MM/YYYY hh:mm'),
          created: dayjs(data.createdAt).format('DD/MM/YYYY hh:mm'),
        };
      },
    },
  );

  useEffect(() => {
    if (isSuccess) {
      methods.reset({
        status: data.status,
        keterangan: data.keterangan ?? '',
        plafond: data.plafond ? data.plafond : '',
        tenor: data.tenor ? String(data.tenor) : '',
        angsuran: data.angsuran ? data.angsuran : '',
      });
    }
  }, [isSuccess]);

  return (
    <Container sx={{ position: 'relative' }} fluid>
      <DevTool control={methods.control} />
      <Group align="start">
        <LoanDisplay noPengajuan={noPengajuan} />
        {currentUser.jabatan !== 'CA' && (
          <Card>
            <Text size="lg" weight="bold">
              Actions
            </Text>
            <Divider my={20} />
            <Button>EDIT</Button>
          </Card>
        )}

        <FormProvider {...methods}>
          <form>
            {data &&
              currentUser.jabatan === 'CA' &&
              (data.status === 'PENDING' || data.status === 'ON PROCESS') && (
                <Card>
                  <Text size="lg" weight="bold">
                    Approval
                  </Text>
                  <Divider my={20} />

                  <Stack>
                    <ESelect
                      name="status"
                      data={['PENDING', 'ON PROSES', 'APPROVED', 'REJECTED']}
                    />
                    <ETextarea name="keterangan" label="Keterangan" />
                    {watchStatus === 'APPROVED' && (
                      <>
                        <ENumberInput
                          name="plafond"
                          label="Approved Plafond"
                          currencyMask
                          rtl
                        />
                        <ENumberInput
                          name="angsuran"
                          label="Approved Angsuran"
                          currencyMask
                          rtl
                        />
                        <ENumberInput name="tenor" label="Approved Tenor" />
                      </>
                    )}

                    <Button>SUBMIT</Button>
                  </Stack>
                </Card>
              )}
          </form>
        </FormProvider>
      </Group>
    </Container>
  );
};
