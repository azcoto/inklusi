import services from '@/services';
import {
  Card,
  Divider,
  Grid,
  Group,
  LoadingOverlay,
  Text,
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import DebiturDisplay from './DebiturDisplay';

type Props = {
  noPengajuan: string;
};

type GridRowProps = {
  title: string;
  value: string;
};

const GridRow = ({ title, value }: GridRowProps) => {
  return (
    <>
      <Grid.Col span={5}>
        <Text size="xs">{title}</Text>
      </Grid.Col>
      <Grid.Col span={7}>
        <Text size="xs">: {value}</Text>
      </Grid.Col>
    </>
  );
};

const LoanDisplay = ({ noPengajuan }: Props) => {
  console.log(noPengajuan);
  const { data, isLoading, error, isFetched } = useQuery(
    ['get-loan', noPengajuan],
    async () => await services.loan.getLoan(noPengajuan),
    {
      select: (data) => {
        return {
          cif: data.Debitur.cif,
          noPengajuan: data.noPengajuan,
          tglPengajuan: dayjs(data.tglPengajuan).format('DD/MM/YYYY'),
          jenisPk: `PK ${data.jenisPk}`,
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

          updated: dayjs(data.updatedAt).format('DD/MM/YYYY hh:mm'),
          created: dayjs(data.createdAt).format('DD/MM/YYYY hh:mm'),
        };
      },
    },
  );

  return (
    <>
      {isFetched && data && <DebiturDisplay cif={data.cif} />}

      <Card sx={{ position: 'relative', maxWidth: '400px' }}>
        <LoadingOverlay visible={isLoading} />
        {isFetched && !data && (
          <Text size="lg" weight="bold">
            Pengajuan Tidak Ditemukan
          </Text>
        )}

        {isFetched && data && (
          <>
            <Text size="lg" weight="bold">
              Data Pengajuan
            </Text>
            <Divider my={20} />
            <Grid>
              <GridRow title="No Pengajuan" value={data.noPengajuan} />
              <GridRow title="Tgl Pengajuan" value={data.tglPengajuan} />
              <GridRow title="Jenis PK" value={data.jenisPk} />
              <GridRow title="Tipe" value={data.tipeDebitur} />
              <GridRow title="Produk" value={data.produk} />
              {data.tenor && <GridRow title="Plafond" value={data.tenor} />}

              {data.angsuran && (
                <GridRow title="Angsuran" value={data.angsuran} />
              )}

              <GridRow title="Take Over" value={data.takeover} />
              {data.takeover && data.pelunasan && data.bankPelunasan && (
                <>
                  <GridRow title="Pelunasan" value={data.pelunasan} />
                  <GridRow title="Bank Pelunasan" value={data.bankPelunasan} />
                </>
              )}

              <GridRow title="Cabang" value={data.cabang} />
              <GridRow title="Team Leader" value={data.namaTl} />
              <GridRow title="Marketing" value={data.namaMr} />
            </Grid>
          </>
        )}
      </Card>
    </>
  );
};

export default LoanDisplay;
