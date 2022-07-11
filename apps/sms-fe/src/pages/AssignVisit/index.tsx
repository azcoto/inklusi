import {
  DataPotensiKecamatanTL,
  DataPotensiKelurahanTL,
  DataPotensiKotaTL,
} from '@api/leader/dto';
import { PotensiDTO } from '@api/potensi/dto';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import {
  Text,
  Container,
  Group,
  Select,
  Card,
  Stack,
  ActionIcon,
  Box,
  ScrollArea,
  LoadingOverlay,
  Checkbox,
  Button,
} from '@mantine/core';
import { useAuthed } from 'context/auth';
import dayjs from 'dayjs';
import exactAge from 'libs/exact-age';
import { forwardRef, useEffect, useState } from 'react';
import { getPotensiByArea, testConcurrent } from 'services/potensi';
import {
  getPotensiKotaTL,
  getPotensiKecamatanTL,
  getPotensiKelurahanTL,
} from 'services/leader';
import { boolean } from 'zod';
import { GetSoByTlResponse } from '@api/tlso/dto';
import { getSoByTl } from 'services/tlso';
import { postAssignVisit } from 'services/visit';
import { notifySuccess } from 'libs/notify';
import { showNotification } from '@mantine/notifications';

const SelectItem = forwardRef<HTMLDivElement, ItemProps>((props, ref) => {
  const { label, value: _, count, ...others } = props;
  return (
    <div ref={ref} {...others}>
      <Group position="apart">
        <Text size="sm">{label}</Text>
        <Text size="xs" color="dimmed">
          {count}
        </Text>
      </Group>
    </div>
  );
});

SelectItem.displayName = 'SelectItem';

interface SelectItems {
  label: string;
  value: string;
  count: number;
}

interface ItemProps
  extends React.ComponentPropsWithoutRef<'div'>,
    SelectItems {}

const AssignVisit = () => {
  //#region State Hooks
  const { currentUser } = useAuthed();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [listKota, setListKota] = useState<SelectItems[]>([]);
  const [selectedKota, setSelectedKota] = useState<string>('');
  const [listKecamatan, setListKecamatan] = useState<SelectItems[]>([]);
  const [selectedKecamatan, setSelectedKecamatan] = useState<string>('');
  const [listKelurahan, setListKelurahan] = useState<SelectItems[]>([]);
  const [selectedKelurahan, setSelectedKelurahan] = useState<string>('');
  const [listPotensi, setListPotensi] = useState<PotensiDTO[]>([]);
  const [listSo, setListSo] = useState<GetSoByTlResponse>([]);
  const [selectedSo, setSelectedSo] = useState('');
  const [listNotas, setListNotas] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);
  const [jumlahData, setJumlahData] = useState<number>(0);
  const [maxPage, setMaxPage] = useState<number>(0);
  //#endregion

  //#region Data Kota Logic
  useEffect(() => {
    try {
      const fetchKota = async () => {
        setIsLoading(true);
        // if (currentUser.nip !== '') {
        const pKota = getPotensiKotaTL(currentUser.nip);
        const pSo = getSoByTl(currentUser.nip);
        const [dataKota, dataSo] = await Promise.all([pKota, pSo]);
        parseDataKota(dataKota);
        setListSo(() => dataSo);
        // }
        setIsLoading(false);
      };
      fetchKota();
    } catch (err) {
      console.log('Notify Error');
    }
  }, []);

  const parseDataKota = (data: DataPotensiKotaTL) => {
    const mapped = data.map((item) => ({
      label: item.dati2,
      value: item.dati2,
      count: item.cnt,
    }));
    setListKota(mapped);
  };

  const kotaChanged = (value: string) => {
    setSelectedKota(value);
  };
  //#endregion

  //#region Data Kecamatan
  useEffect(() => {
    try {
      const fetchKecamatan = async () => {
        setIsLoading(true);
        const dataKecamatan = await getPotensiKecamatanTL(
          currentUser.nip,
          selectedKota,
        );
        parseDataKecamatan(dataKecamatan);
        setIsLoading(false);
      };
      if (selectedKota !== '') fetchKecamatan();
    } catch (err) {
      console.log('Notify Error');
    }

    setSelectedKelurahan('');
    setSelectedKecamatan('');
    setListKecamatan([]);
    setListKelurahan([]);
    setListPotensi([]);
  }, [selectedKota]);

  const parseDataKecamatan = (data: DataPotensiKecamatanTL) => {
    const mapped = data.map((item) => ({
      label: item.dati3,
      value: item.dati3,
      count: item.cnt,
    }));
    setListKecamatan(mapped);
  };

  const kecamatanChanged = (value: string) => {
    setSelectedKecamatan(value);
  };
  //#endregion

  //#region Data Kelurahan Logic
  useEffect(() => {
    try {
      const fetchKelurahan = async () => {
        setIsLoading(true);
        const dataKelurahan = await getPotensiKelurahanTL(
          currentUser.nip,
          selectedKota,
          selectedKecamatan,
        );
        parseDataKelurahan(dataKelurahan);
        setIsLoading(false);
      };
      if (selectedKecamatan !== '') fetchKelurahan();
    } catch (err) {
      console.log('Notify Error');
    }
    setSelectedKelurahan('');
    setListKelurahan([]);
    setListPotensi([]);
  }, [selectedKecamatan]);

  const parseDataKelurahan = (data: DataPotensiKelurahanTL) => {
    const mapped = data.map((item) => ({
      label: item.dati4,
      value: item.dati4,
      count: item.cnt,
    }));
    setListKelurahan(mapped);
  };

  useEffect(() => {
    try {
      const fetchPotensi = async () => {
        setIsLoading(true);
        const dataPotensi = await getPotensiByArea({
          kota: selectedKota,
          kecamatan: selectedKecamatan,
          kelurahan: selectedKelurahan,
          page: String(page),
        });
        setListPotensi(dataPotensi);
        const selectedItem = listKelurahan.find(
          (o) => o.value === selectedKelurahan,
        );
        const count = selectedItem ? selectedItem.count : 0;
        setPage((current) => 1);
        setJumlahData((current) => count);
        setMaxPage((current) => {
          return count % 10 ? Math.floor(count / 10) + 1 : count / 10;
        });
        setIsLoading(false);
      };
      if (selectedKelurahan !== '') {
        fetchPotensi();
      }
    } catch (err) {
      console.log('Notify Error');
    }
  }, [selectedKelurahan]);

  const kelurahanChanged = (value: string) => {
    setSelectedKelurahan(() => {
      return value;
    });
  };

  //#endregion

  //#region Potensi
  useEffect(() => {
    const fetchPotensi = async () => {
      setIsLoading(true);
      const dataPotensi = await getPotensiByArea({
        kota: selectedKota,
        kecamatan: selectedKecamatan,
        kelurahan: selectedKelurahan,
        page: String(page),
      });

      setIsLoading(false);
      setListPotensi(dataPotensi);
    };
    if (listPotensi.length > 0) {
      setListPotensi([]);
      fetchPotensi();
    }
  }, [page]);

  //#region

  const assignOnClick = async () => {
    setIsLoading(true);
    const res = await postAssignVisit(currentUser.nip, selectedSo, listNotas);
    setIsLoading(false);
    if (res.status === 200) {
      notifySuccess('Success', showNotification);
      setListKecamatan([]);
      setListKelurahan([]);
      setListPotensi([]);
      setListNotas([]);
      setSelectedKelurahan('');
    }
  };
  return (
    <>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '85vh',
          position: 'relative',
        }}
      >
        <LoadingOverlay visible={isLoading} />
        {listSo.length !== 0 && (
          <Select
            sx={{ flex: 0 }}
            value={selectedSo}
            onChange={(x) => {
              if (x) setSelectedSo(x);
            }}
            data={listSo.map((o) => ({
              label: o.nama,
              value: o.nip,
            }))}
            label="Sales Fronting"
          />
        )}
        {listKota.length !== 0 && (
          <Select
            sx={{ flex: 0 }}
            itemComponent={SelectItem}
            data={listKota}
            label="Kota/Kabupaten"
            onChange={kotaChanged}
          />
        )}

        {listKecamatan.length !== 0 && (
          <Select
            sx={{ flex: 0 }}
            itemComponent={SelectItem}
            data={listKecamatan}
            label="Kecamatan"
            onChange={kecamatanChanged}
          />
        )}

        {listKelurahan.length !== 0 && (
          <Select
            sx={{ flex: 0 }}
            itemComponent={SelectItem}
            data={listKelurahan}
            label="Kelurahan"
            onChange={kelurahanChanged}
          />
        )}

        {selectedKelurahan !== '' && (
          <Box sx={{ flex: 0 }} mt={8}>
            <Card shadow="sm">
              <Group position="apart">
                <Stack>
                  <Text size="xs" weight="bold">
                    Jumlah Data : {jumlahData}
                  </Text>
                  <Text size="xs" weight="bold">
                    Selected : {listNotas.length}
                  </Text>
                </Stack>
                <Box
                  sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}
                >
                  <ActionIcon
                    disabled={page === 1}
                    variant="transparent"
                    onClick={() => {
                      setPage(page - 1);
                    }}
                  >
                    <ChevronLeftIcon />
                  </ActionIcon>
                  <Text size="xs" weight="bold">
                    Page {page} of {maxPage}
                  </Text>
                  <ActionIcon
                    disabled={page === maxPage}
                    variant="transparent"
                    onClick={() => {
                      setPage(page + 1);
                    }}
                  >
                    <ChevronRightIcon />
                  </ActionIcon>
                </Box>
              </Group>
            </Card>
          </Box>
        )}

        {listPotensi.length !== 0 && (
          <ScrollArea sx={{ flex: 1 }} type="scroll" mt={8}>
            <Stack>
              {listPotensi.map((p, idx) => {
                return (
                  <Card
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                    key={idx}
                    shadow="sm"
                  >
                    <Box mr={12}>
                      <Text size="xs" weight="bold">
                        Nama : {p.namaPenerima}
                      </Text>
                      <Text size="xs">
                        <b>Alamat : </b>
                        {p.alamat}
                      </Text>
                      <Text size="xs">
                        <b>Tanggal Lahir : </b>
                        {dayjs(p.tgLahirPenerima).format('DD/MM/YYYY')}
                      </Text>
                      <Text size="xs">
                        <b>Usia : </b>
                        {(() => {
                          const { days, months, years } = exactAge(
                            new Date(p.tgLahirPenerima),
                          );
                          return `${years} Tahun ${months} Bulan ${days} Hari`;
                        })()}
                      </Text>
                    </Box>
                    <Box mr={12}>
                      <Checkbox
                        size="md"
                        key={p.notas}
                        checked={listNotas.some((e) => e === p.notas)}
                        onChange={(evt) => {
                          console.log(evt);
                          if (evt.currentTarget.checked === true) {
                            setListNotas((state) => [...state, p.notas]);
                          } else {
                            setListNotas((state) =>
                              state.filter((o) => o !== p.notas),
                            );
                          }
                        }}
                      />
                    </Box>
                  </Card>
                );
              })}
            </Stack>
          </ScrollArea>
        )}
        {listNotas.length > 0 && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: '10px',
            }}
            mt={8}
          >
            <Button
              size="xs"
              onClick={() => {
                setListNotas([]);
                setPage(1);
              }}
            >
              RESET
            </Button>
            <Button size="xs" sx={{ flexGrow: 1 }} onClick={assignOnClick}>
              ASSIGN
            </Button>
          </Box>
        )}
      </Container>
    </>
  );
};

export default AssignVisit;
