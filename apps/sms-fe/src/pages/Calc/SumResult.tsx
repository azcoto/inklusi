import { GetProdukResponse } from '@api/produk/dto';
import { Divider, Grid, Text } from '@mantine/core';
import { SimulasiResult, SumSimulasi } from '.';
import Rows from './Rows';

interface Props {
  s: SumSimulasi;
  selectedProduk: GetProdukResponse[0];
  currentKonven: string;
}

const SumResult = ({ s, selectedProduk, currentKonven }: Props) => {
  return (
    <>
      <Grid.Col span={12}>
        <Divider
          my="xs"
          size="lg"
          label={
            <Text size="sm" weight="bold">
              SUMMARY
            </Text>
          }
          labelPosition="center"
        />
        <Divider my="md" label="Angsuran" />
      </Grid.Col>

      <Rows title="Total Plafond">
        <Text size="sm" mr={5} align="right">
          {Number(s.plafond).toLocaleString('id')}
        </Text>
      </Rows>
      {/* <Rows title={currentKonven === 'KONVENSIONAL' ? 'Bunga' : 'Margin'}>
        <Text size="xs" mr={5} align="right">
          {Math.round(selectedProduk.bunga * 10000) / 100} {'%'}
        </Text>
      </Rows> */}
      <Rows title="Total Angsuran">
        <Text size="sm" mr={5} align="right">
          {s.angsuran.toLocaleString('id')}
        </Text>
      </Rows>
      <Grid.Col span={12}>
        <Divider my="sm" label="Biaya" />
      </Grid.Col>
      <Rows title="Total Asuransi">
        <Text size="sm" mr={5} align="right">
          {s.asuransi.toLocaleString('id')}
        </Text>
      </Rows>
      <Rows
        title={
          currentKonven === 'KONVENSIONAL'
            ? 'Total Provisi'
            : 'Total Administrasi'
        }
      >
        <Text size="sm" mr={5} align="right">
          {s.provisiOrAdmin.toLocaleString('id')}
        </Text>
      </Rows>
      <Rows title="Total Blokir">
        <Text size="sm" mr={5} align="right">
          {s.tBlokir.toLocaleString('id')}
        </Text>
      </Rows>
      <Rows title="Total Biaya">
        <Text size="sm" mr={5} align="right">
          {s.tBiaya.toLocaleString('id')}
        </Text>
      </Rows>
      <Grid.Col span={12}>
        <Divider my="md" label="Penerimaan" />
      </Grid.Col>
      <Rows title="Terima Bersih">
        <Text size="sm" mr={5} align="right">
          {s.tBersih.toLocaleString('id')}
        </Text>
      </Rows>

      {s.tPelunasan !== 0 && (
        <Rows title="Pelunasan">
          <Text size="sm" mr={5} align="right">
            {Number(s.tPelunasan).toLocaleString('id')}
          </Text>
        </Rows>
      )}

      <Rows title="Total Penerimaan">
        <Text size="sm" mr={5} align="right">
          {s.tPenerimaan.toLocaleString('id')}
        </Text>
      </Rows>
    </>
  );
};

export default SumResult;
