import { GetProdukResponse } from '@api/produk/dto';
import { Divider, Grid, Text } from '@mantine/core';
import { SimulasiResult } from '.';
import Rows from './Rows';

interface Props {
  s: SimulasiResult;
  gaji: number;
  selectedProduk: GetProdukResponse[0];
  currentKonven: string;
  akadTitle: string;
}

const SimResult = ({ s, selectedProduk, currentKonven, akadTitle }: Props) => {
  return (
    <>
      <Grid.Col span={12}>
        <Divider
          my="xs"
          size="md"
          label={
            <Text size="sm" weight="bold">
              {akadTitle}
            </Text>
          }
          labelPosition="center"
        />
      </Grid.Col>

      <Rows title="Jangka Waktu">
        <Text size="sm" mr={5} align="right">
          {`${s.tenor} Bulan`}
        </Text>
      </Rows>

      <Rows title="Plafond">
        <Text size="sm" mr={5} align="right">
          {Number(s.plafond).toLocaleString('id')}
        </Text>
      </Rows>
      <Rows title={currentKonven === 'KONVENSIONAL' ? 'Bunga' : 'Margin'}>
        <Text size="sm" mr={5} align="right">
          {Math.round(selectedProduk.bunga * 10000) / 100} {'%'}
        </Text>
      </Rows>
      <Rows title="Angsuran">
        <Text size="sm" mr={5} align="right">
          {s.angsuran.toLocaleString('id')}
        </Text>
      </Rows>
      <Rows title="Sisa Gaji">
        <Text size="sm" mr={5} align="right">
          {s.sisaGaji.toLocaleString('Id')}
        </Text>
      </Rows>
      {/* 
      <Grid.Col span={12}>
        <Divider my="sm" label="Biaya" />
      </Grid.Col>
      <Rows title="Asuransi">
        <Text size="xs" mr={5} align="right">
          {s.asuransi.toLocaleString('id')}
        </Text>
      </Rows>
      <Rows
        title={currentKonven === 'KONVENSIONAL' ? 'Provisi' : 'Administrasi'}
      >
        <Text size="xs" mr={5} align="right">
          {s.provisiOrAdmin.toLocaleString('id')}
        </Text>
      </Rows>
      <Rows title="Total Blokir">
        <Text size="xs" mr={5} align="right">
          {s.tBlokir.toLocaleString('id')}
        </Text>
      </Rows>
      <Rows title="Total Biaya">
        <Text size="xs" mr={5} align="right">
          {s.tBiaya.toLocaleString('id')}
        </Text>
      </Rows>
      <Grid.Col span={12}>
        <Divider my="sm" />
      </Grid.Col>
      <Rows title="Terima Bersih">
        <Text size="xs" mr={5} align="right">
          {s.tBersih.toLocaleString('id')}
        </Text>
      </Rows>
       */}
    </>
  );
};

export default SimResult;
