import services from '@/services';
import { Card, Divider, Grid, LoadingOverlay, Text } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

type Props = {
  cif: string;
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

const DebiturDisplay = ({ cif }: Props) => {
  const { data, isLoading, error, isFetched } = useQuery(
    ['get-debitur', cif],
    async () => await services.debitur.getDebitur(cif),
  );

  return (
    <Card sx={{ position: 'relative', maxWidth: '300px' }}>
      <LoadingOverlay visible={isLoading} />
      {isFetched && !data && (
        <Text size="lg" weight="bold">
          Debitur Tidak Ditemukan
        </Text>
      )}

      {isFetched && data && (
        <>
          <Text size="lg" weight="bold">
            Data Debitur
          </Text>
          <Divider my={20} />
          <Grid>
            <GridRow title="CIF" value={data.cif} />
            <GridRow title="Nopen/NIP" value={data.nopen} />
            <GridRow title="Nama" value={data.nama} />
            <GridRow title="Tempat Lahir" value={data.tempatLahir} />
            <GridRow
              title="Tanggal Lahir"
              value={dayjs(data.tglLahir).format('DD MMMM YYYY')}
            />
            <GridRow title="Nama Ibu" value={data.namaIbu} />
            <GridRow title="Telepon/WA" value={data.telepon} />
            <GridRow title="Alamat" value={data.alamat} />
            <GridRow title="Kelurahan" value={data.kelurahan} />
            <GridRow title="Kecamatan" value={data.kecamatan} />
            <GridRow title="Kota" value={data.kota} />

            {data.instansi &&
              data.pangkat &&
              data.bup &&
              data.sisaMasaDinas &&
              data.golongan && (
                <>
                  <GridRow title="Instansi" value={data.instansi} />
                  <GridRow title="Pangkat" value={data.pangkat} />
                  <GridRow title="Golongan" value={data.golongan} />
                  <GridRow title="Usia BUP" value={`${data.bup} Tahun`} />
                  <GridRow
                    title="Sisa Masa Dinas"
                    value={`${data.sisaMasaDinas} Bulan`}
                  />
                </>
              )}
          </Grid>
        </>
      )}
    </Card>
  );
};

export default DebiturDisplay;
