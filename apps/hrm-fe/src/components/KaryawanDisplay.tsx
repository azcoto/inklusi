import services from '@/services';
import { Card, Divider, Grid, LoadingOverlay, Text } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

type Props = {
  nip: string;
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

const KaryawanDisplay = ({ nip }: Props) => {
  const { data, isLoading, error, isFetched } = useQuery(
    ['get-karyawan', nip],
    async () => await services.karyawan.getKaryawan(nip),
  );

  return (
    <Card sx={{ position: 'relative', maxWidth: '300px' }}>
      <LoadingOverlay visible={isLoading} />
      {isFetched && !data && (
        <Text size="lg" weight="bold">
          Karyawan Tidak Ditemukan
        </Text>
      )}

      {isFetched && data && (
        <>
          <Text size="lg" weight="bold">
            Data Karyawan
          </Text>
          <Divider my={20} />
          <Grid>
            <GridRow title="NIP" value={data.nip} />
            <GridRow title="NIK" value={data.nik} />
            <GridRow title="Nama" value={data.nama} />
            {data.alamat && <GridRow title="Alamat" value={data.alamat} />}

            {data.dati4 && <GridRow title="Kelurahan" value={data.dati4} />}
            {data.dati3 && <GridRow title="Kecamatan" value={data.dati3} />}
            {data.dati2 && <GridRow title="Kota" value={data.dati2} />}
            {data.dati1 && <GridRow title="Provinsi" value={data.dati1} />}
            <GridRow title="Telepon" value={data.notelp} />
            <GridRow title="Jabatan" value={data.jabatan} />
          </Grid>
        </>
      )}
    </Card>
  );
};

export default KaryawanDisplay;
