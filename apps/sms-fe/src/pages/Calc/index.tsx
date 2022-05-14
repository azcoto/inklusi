import {
  Box,
  Text,
  Container,
  Grid,
  Button,
  ScrollArea,
  TextInput,
  NumberInput,
  NativeSelect,
  Divider,
  Switch,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import dayjs from 'dayjs';
import { useState } from 'react';
import z from 'zod';

const zSimulasiForm = z.object({
  nama: z.string(),
  tgLahir: z.string(),
});

const Calc = () => {
  const [takeOver, setTakeOver] = useState<boolean>(false);
  const [tgLahir, setTgLahir] = useState<Date | null>(null);
  const toggleTakeOver = () => {
    setTakeOver(!takeOver);
  };

  return (
    <Container size="xs">
      <Text weight={'bold'} align="center">
        SIMULASI PERHITUNGAN KREDIT
      </Text>
      <ScrollArea
        offsetScrollbars
        style={{ height: '75vh' }}
        mt={10}
        scrollbarSize={2}
        sx={{ div: { div: { paddingRight: '3px' } } }}
      >
        <Grid gutter={'xs'} align="flex-end">
          {/* ROW 1 */}
          <Grid.Col span={5}>
            <Text size="sm">Sales Officer</Text>
          </Grid.Col>
          <Grid.Col span={5}>
            <Text size="sm"></Text>
          </Grid.Col>
          <Grid.Col span={2}>
            <Text size="sm"></Text>
          </Grid.Col>
          {/* ROW 2 */}
          <Grid.Col span={5}>
            <Text size="sm">Team Leader</Text>
          </Grid.Col>
          <Grid.Col span={5}>
            <Text size="sm"></Text>
          </Grid.Col>
          <Grid.Col span={2}>
            <Text size="sm"></Text>
          </Grid.Col>
          {/* DIVIDER */}
          <Grid.Col span={12}>
            <Divider my="sm" />
          </Grid.Col>
          {/* ROW 3 */}
          <Grid.Col span={5}>
            <Text size="sm">Nama Calon Debitur</Text>
          </Grid.Col>
          <Grid.Col span={7}>
            <TextInput size="xs" />
          </Grid.Col>
          {/* ROW 5 */}
          <Grid.Col span={5}>
            <Text size="sm">Tanggal Lahir</Text>
          </Grid.Col>
          <Grid.Col span={7}>
            <DatePicker
              value={tgLahir}
              onChange={setTgLahir}
              sx={{ div: { div: { paddingRight: 0 } } }}
              minDate={dayjs(new Date()).subtract(79, 'y').toDate()}
              maxDate={dayjs(new Date()).subtract(20, 'y').toDate()}
              locale="id"
              inputFormat="DD MMMM YYYY"
              size="xs"
            />
          </Grid.Col>
          {/* ROW 4 */}
          <Grid.Col span={5}>
            <Text size="sm">Kantor Bayar Asal</Text>
          </Grid.Col>
          <Grid.Col span={7}>
            <TextInput size="xs" />
          </Grid.Col>
          {/* ROW 6 */}
          <Grid.Col span={5}>
            <Text size="sm">Take Over</Text>
          </Grid.Col>
          <Grid.Col span={7}>
            <Switch
              label={takeOver ? 'Ya' : 'Tidak'}
              checked={takeOver}
              onChange={() => toggleTakeOver()}
            ></Switch>
          </Grid.Col>

          {takeOver && (
            <>
              <Grid.Col span={5}>
                <Text size="sm">Pelunasan</Text>
              </Grid.Col>
              <Grid.Col span={7}>
                <NumberInput
                  sx={{ input: { textAlign: 'right' } }}
                  hideControls
                  size="xs"
                />
              </Grid.Col>
            </>
          )}
          <Grid.Col span={5}>
            <Text size="sm">Produk</Text>
          </Grid.Col>
          <Grid.Col span={7}>
            <NativeSelect data={['PENSIUNAN', 'PNS AKTIF']} size="xs" />
          </Grid.Col>
          {/* ROW 7 */}
          <Grid.Col span={5}>
            <Text size="sm">Jangka Waktu</Text>
          </Grid.Col>
          <Grid.Col span={7}>
            <NativeSelect
              data={[...Array(15).keys()].map((x) => String((x + 1) * 12))}
              rightSection={
                <Text size="xs" mr={20}>
                  Bulan
                </Text>
              }
              size="xs"
            />
          </Grid.Col>

          {/* ROW 8 */}
          <Grid.Col span={5}>
            <Text size="sm">Gaji</Text>
          </Grid.Col>
          <Grid.Col span={7}>
            <NumberInput
              sx={{ input: { textAlign: 'right' } }}
              hideControls
              size="xs"
            />
          </Grid.Col>
          {/* ROW 9 */}
          <Grid.Col span={5}>
            <Text size="sm">Plafond</Text>
          </Grid.Col>
          <Grid.Col span={7}>
            <NumberInput
              sx={{ input: { textAlign: 'right' } }}
              hideControls
              size="xs"
            />
          </Grid.Col>
          {/* DIVIDER */}
          <Grid.Col span={12}>
            <Divider my="sm" />
          </Grid.Col>

          {/* ROW 10 */}
          <Grid.Col span={5}>
            <Text size="sm">Bunga</Text>
          </Grid.Col>
          <Grid.Col span={7}>
            <TextInput
              readOnly
              sx={{ input: { textAlign: 'right' } }}
              value="12 %"
              variant="unstyled"
              size="xs"
            />
          </Grid.Col>
          {/* ROW 14 */}
          <Grid.Col span={5}>
            <Text size="sm">Angsuran</Text>
          </Grid.Col>
          <Grid.Col span={5}>
            <Text size="sm"></Text>1
          </Grid.Col>
          <Grid.Col span={2}>
            <Text size="sm"></Text>
          </Grid.Col>
          {/* DIVIDER */}
          <Grid.Col span={12}>
            <Divider my="sm" />
          </Grid.Col>
          {/* ROW 11 */}
          <Grid.Col span={5}>
            <Text size="sm">Asuransi</Text>
          </Grid.Col>
          <Grid.Col span={5}>
            <Text size="sm"></Text>1
          </Grid.Col>
          <Grid.Col span={2}>
            <Text size="sm"></Text>
          </Grid.Col>
          {/* ROW 12 */}
          <Grid.Col span={5}>
            <Text size="sm">Provisi</Text>
          </Grid.Col>
          <Grid.Col span={5}>
            <Text size="sm"></Text>1
          </Grid.Col>
          <Grid.Col span={2}>
            <Text size="sm"></Text>
          </Grid.Col>
          {/* ROW 13 */}
          <Grid.Col span={5}>
            <Text size="sm">Administrasi</Text>
          </Grid.Col>
          <Grid.Col span={5}>
            <Text size="sm"></Text>1
          </Grid.Col>
          <Grid.Col span={2}>
            <Text size="sm"></Text>
          </Grid.Col>

          {/* ROW 15 */}
          <Grid.Col span={5}>
            <Text size="sm">Total Blokir</Text>
          </Grid.Col>
          <Grid.Col span={5}>
            <Text size="sm"></Text>1
          </Grid.Col>
          <Grid.Col span={2}>
            <Text size="sm"></Text>
          </Grid.Col>
          {/* ROW 16 */}
          <Grid.Col span={5}>
            <Text size="sm">Total Biaya</Text>
          </Grid.Col>
          <Grid.Col span={5}>
            <Text size="sm"></Text>1
          </Grid.Col>
          <Grid.Col span={2}>
            <Text size="sm"></Text>
          </Grid.Col>
          {/* ROW 17 */}
          <Grid.Col span={5}>
            <Text size="sm">Terima Bersih</Text>
          </Grid.Col>
          <Grid.Col span={5}>
            <Text size="sm"></Text>1
          </Grid.Col>
          <Grid.Col span={2}>
            <Text size="sm"></Text>
          </Grid.Col>
          {/* ROW 18 */}
          <Grid.Col span={5}>
            <Text size="sm">Total Penerimaan</Text>
          </Grid.Col>
          <Grid.Col span={5}>
            <Text size="sm"></Text>1
          </Grid.Col>
          <Grid.Col span={2}>
            <Text size="sm"></Text>
          </Grid.Col>
          {/* ROW 19 */}
          {/* ROW 20 */}
        </Grid>
      </ScrollArea>

      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          display: 'flex',
          gap: '10px',
        }}
        mb={8}
        px={8}
      >
        <Button sx={{ flexGrow: 1 }}>Reset</Button>
        <Button sx={{ flexGrow: 1 }}>Simulasi</Button>
      </Box>
    </Container>
  );
};

export default Calc;
