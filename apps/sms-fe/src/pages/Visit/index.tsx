import {
  Text,
  Container,
  Stack,
  LoadingOverlay,
  ScrollArea,
  Grid,
  Divider,
  Select,
  Button,
} from '@mantine/core';
import { useAuthed } from 'context/auth';
import { notifySuccess } from 'libs/notify';
import { showNotification } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import services from 'services';
import { useNavigate, useParams } from 'react-router-dom';
import { VisitDetailResponse } from '@api/visit/dto';

const alamatValid = ['Ya', 'Tidak'];
const interaksi = ['Ya', 'Tidak'];
const prospek = [
  'Berminat',
  'Ragu-Ragu',
  'Tidak Berminat',
  'Tidak Dapat Dilayani',
];
const ragu = ['Konsultasi Keluarga', 'Pikir Pikir'];
const tidakBerminat = [
  'Tidak Membutuhkan',
  'Keluarga Tidak Setuju',
  'Suku Bunga Tinggi',
  'jangka Waktu Kurang',
  'Asuransi Tinggi',
];
const VisitPortal = () => {
  //#region State Hooks
  const navigate = useNavigate();
  const { currentUser } = useAuthed();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataVisit, setDataVisit] = useState<VisitDetailResponse>();
  const { notas } = useParams();
  const [selectedAlamat, setSelectedAlamat] = useState<string | null>(null);
  const [selectedInteraksi, setSelectedInteraksi] = useState<string | null>(
    null,
  );
  const [selectedProspek, setSelectedProspek] = useState<string | null>(null);
  const [selectedAlasan, setSelectedAlasan] = useState<string | null>(null);
  //#endregion

  //#region Data Kota Logic
  useEffect(() => {
    try {
      const fetchDataVisit = async () => {
        if (notas) {
          setIsLoading(true);
          const res = await services.visit.visitDetail(currentUser.nip, notas);
          setDataVisit(res.data);
          setIsLoading(false);
        }
      };
      fetchDataVisit();
    } catch (err) {
      console.log('Notify Error');
    }
  }, []);

  const updateVisit = async () => {
    setIsLoading(true);
    if (dataVisit) {
      const data = {
        id: dataVisit.id,
        alamatValid: selectedAlamat === 'Ya' ? true : false,
        interaksi: selectedInteraksi === 'Ya' ? true : false,
        prospek: selectedProspek,
        alasan: selectedAlasan,
      };
      const res = await services.visit.patchVisit(data);
      if (res.status === 200) {
        notifySuccess('Success', showNotification);
      }
      navigate('/visit', { replace: true });
    }
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '85vh',
        position: 'relative',
      }}
    >
      <LoadingOverlay visible={isLoading} />
      {dataVisit && (
        <ScrollArea sx={{ flex: 1 }} type="scroll" mt={8}>
          <Stack>
            <Text size="md" weight="bold">
              Calon Debitur
            </Text>
            <Divider />
            <Grid>
              <Grid.Col span={3}>
                <Text size="sm">NOTAS</Text>
              </Grid.Col>
              <Grid.Col span={1}>
                <Text size="sm">:</Text>
              </Grid.Col>
              <Grid.Col span={8}>
                <Text size="sm">{dataVisit.Maspen.notas}</Text>
              </Grid.Col>
              <Grid.Col span={3}>
                <Text size="sm">NAMA</Text>
              </Grid.Col>
              <Grid.Col span={1}>
                <Text size="sm">:</Text>
              </Grid.Col>
              <Grid.Col span={8}>
                <Text size="sm">{dataVisit.Maspen.namaPenerima}</Text>
              </Grid.Col>
              <Grid.Col span={3}>
                <Text size="sm">ALAMAT</Text>
              </Grid.Col>
              <Grid.Col span={1}>
                <Text size="sm">:</Text>
              </Grid.Col>
              <Grid.Col span={8}>
                <Text size="sm">{dataVisit.Maspen.alamat}</Text>
              </Grid.Col>
              <Grid.Col span={3}>
                <Text size="sm">KELURAHAN</Text>
              </Grid.Col>
              <Grid.Col span={1}>
                <Text size="sm">:</Text>
              </Grid.Col>
              <Grid.Col span={8}>
                <Text size="sm">{dataVisit.Maspen.dati4}</Text>
              </Grid.Col>
              <Grid.Col span={3}>
                <Text size="sm">KECAMATAN</Text>
              </Grid.Col>
              <Grid.Col span={1}>
                <Text size="sm">:</Text>
              </Grid.Col>
              <Grid.Col span={8}>
                <Text size="sm">{dataVisit.Maspen.dati3}</Text>
              </Grid.Col>
              <Grid.Col span={3}>
                <Text size="sm">KOTA</Text>
              </Grid.Col>
              <Grid.Col span={1}>
                <Text size="sm">:</Text>
              </Grid.Col>
              <Grid.Col span={8}>
                <Text size="sm">{dataVisit.Maspen.dati2}</Text>
              </Grid.Col>
            </Grid>
            <Divider />
            <Text size="md" weight="bold">
              Sales Feedback
            </Text>
            <Grid>
              <Grid.Col span={4}>
                <Text size="sm">ALAMAT VALID</Text>
              </Grid.Col>
              <Grid.Col span={8}>
                <Select
                  value={selectedAlamat}
                  data={alamatValid}
                  onChange={(val) => {
                    setSelectedAlamat(val);
                    setSelectedInteraksi(null);
                    setSelectedProspek(null);
                    setSelectedAlasan(null);
                  }}
                />
              </Grid.Col>
              {selectedAlamat === 'Ya' && (
                <>
                  <Grid.Col span={4}>
                    <Text size="sm">INTERAKSI</Text>
                  </Grid.Col>
                  <Grid.Col span={8}>
                    <Select
                      value={selectedInteraksi}
                      data={interaksi}
                      onChange={(val) => {
                        setSelectedInteraksi(val);
                        setSelectedProspek(null);
                        setSelectedAlasan(null);
                      }}
                    />
                  </Grid.Col>
                </>
              )}

              {selectedInteraksi === 'Ya' && (
                <>
                  <Grid.Col span={4}>
                    <Text size="sm">PROSPEK</Text>
                  </Grid.Col>
                  <Grid.Col span={8}>
                    <Select
                      value={selectedProspek}
                      data={prospek}
                      onChange={(val) => {
                        setSelectedProspek(val);
                        setSelectedAlasan(null);
                      }}
                    />
                  </Grid.Col>
                </>
              )}

              {(selectedProspek === 'Tidak Berminat' ||
                selectedProspek === 'Ragu-Ragu') && (
                <>
                  <Grid.Col span={4}>
                    <Text size="sm">ALASAN</Text>
                  </Grid.Col>
                  <Grid.Col span={8}>
                    <Select
                      data={
                        selectedProspek === 'Ragu-Ragu' ? ragu : tidakBerminat
                      }
                      value={selectedAlasan}
                      onChange={setSelectedAlasan}
                    />
                  </Grid.Col>
                </>
              )}
            </Grid>
            <Divider />
            {(selectedAlamat === 'Tidak' ||
              selectedInteraksi === 'Tidak' ||
              selectedProspek === 'Berminat' ||
              selectedProspek === 'Tidak Dapat Dilayani' ||
              selectedAlasan !== null) && (
              <Button
                onClick={async () => {
                  await updateVisit();
                }}
              >
                SUBMIT
              </Button>
            )}
          </Stack>
        </ScrollArea>
      )}
    </Container>
  );
};

export default VisitPortal;
