import { useMutation, useQuery } from '@tanstack/react-query';
import LoanDisplay from '@/components/LoanDIsplay';
import { useAuthed } from '@/context/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
  useWatch,
} from 'react-hook-form';
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
import { useParams, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { ESelect } from '@/components/ESelect';
import { ETextarea } from '@/components/ETextArea';
import { useEffect } from 'react';
import { ENumberInput } from '@/components/ENumberInput';
import { DevTool } from '@hookform/devtools';
import { showNotification } from '@mantine/notifications';
import { notifySuccess } from '@/libs/notify';

const zMyForm = z.object({
  status: z.string().min(1),
  keterangan: z.string(),
});
type MyForm = z.infer<typeof zMyForm>;

export const DetailLoan = () => {
  const { noPengajuan } = useParams() as { noPengajuan: string };
  const navigate = useNavigate();
  const methods = useForm<MyForm>({
    resolver: zodResolver(zMyForm),
    defaultValues: {
      status: '',
      keterangan: '',
    },
  });

  const { data, isSuccess, isFetched } = useQuery(
    ['get-loan', noPengajuan],
    async () => await services.loan.getLoan(noPengajuan),
    {
      refetchOnMount: 'always',
      onSuccess: (data) => {
        methods.setValue('status', data.status);
        methods.setValue('keterangan', data.keterangan ? data.keterangan : '');
      },
    },
  );

  const mUpdateStatus = useMutation(services.loan.updateStatusLoan, {
    onSuccess: () => {
      notifySuccess('Status Pengajuan berhasil diubah', showNotification);
    },
  });

  const submitHandler: SubmitHandler<MyForm> = async (values) => {
    const formData = {
      noPengajuan: noPengajuan,
      status: values.status,
      keterangan: values.keterangan,
    };

    const { noPengajuan: _, ...rest } = formData;
    mUpdateStatus.mutate({
      params: {
        noPengajuan,
      },
      body: rest,
    });
  };

  const errorHandler: SubmitErrorHandler<MyForm> = (errors, values) => {
    console.log(errors);
  };

  return (
    <Container sx={{ position: 'relative' }} fluid>
      <DevTool control={methods.control} />
      <Group align="start">
        <LoanDisplay noPengajuan={noPengajuan} />

        <Card>
          <Text size="lg" weight="bold">
            Actions
          </Text>
          <Divider my={20} />
          <Button
            onClick={() =>
              navigate(`/loan-edit/${noPengajuan}`, { replace: true })
            }
          >
            EDIT
          </Button>
        </Card>
        {data && (
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(submitHandler, errorHandler)}>
              <Card>
                <Text size="lg" weight="bold">
                  STATUS
                </Text>
                <Divider my={20} />

                <Stack>
                  <ESelect
                    name="status"
                    data={['PENGAJUAN', 'CAIR', 'CANCEL']}
                  />
                  <ETextarea uppercase name="keterangan" label="Keterangan" />
                  <Button type="submit">SUBMIT</Button>
                </Stack>
              </Card>
            </form>
          </FormProvider>
        )}
      </Group>
    </Container>
  );
};
