import {
  DataPotensiKecamatanTL,
  DataPotensiKelurahanTL,
  DataPotensiKotaTL,
} from '@api/area-potensi-tl/dto';
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
} from '@mantine/core';
import { useAuth } from 'context/auth';
import { forwardRef, useEffect, useState } from 'react';
import { UseGetPotensiByArea } from 'services/potensi';
import {
  usePotensiKotaTL,
  usePotensiKecamatanTL,
  usePotensiKelurahanTL,
} from 'services/potensiTL';

const SelectItem = forwardRef<HTMLDivElement, ItemProps>((props, ref) => {
  const { label, value, count, ...others } = props;
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
  //#region State
  const { currentUser } = useAuth();
  const tlNIP = currentUser ? currentUser.nip : '';
  const [listKota, setListKota] = useState<SelectItems[]>([]);
  const [selectedKota, setSelectedKota] = useState<string>('');
  const [listKecamatan, setListKecamatan] = useState<SelectItems[]>([]);
  const [selectedKecamatan, setSelectedKecamatan] = useState<string>('');
  const [listKelurahan, setListKelurahan] = useState<SelectItems[]>([]);
  const [selectedKelurahan, setSelectedKelurahan] = useState<string>('');
  const [listPotensi, setListPotensi] = useState<PotensiDTO[]>([]);
  const [page, setPage] = useState<number>(1);
  const [jumlahData, setJumlahData] = useState<number>(0);
  const [maxPage, setMaxPage] = useState<number>(0);
  //#endregion

  //#region Query Hook Callback
  const dataKotaOnSuccess = (data: DataPotensiKotaTL) => {
    const mapped = data.map((item) => ({
      label: item.dati2,
      value: item.dati2,
      count: item.cnt,
    }));
    setListKota(mapped);
  };
  const dataKecamatanOnSuccess = (data: DataPotensiKecamatanTL) => {
    const mapped = data.map((item) => ({
      label: item.dati3,
      value: item.dati3,
      count: item.cnt,
    }));
    setListKecamatan(mapped);
  };
  const dataKelurahanOnSuccess = (data: DataPotensiKelurahanTL) => {
    const mapped = data.map((item) => ({
      label: item.dati4,
      value: item.dati4,
      count: item.cnt,
    }));
    setListKelurahan(mapped);
  };
  const dataPotensiOnSuccess = (data: PotensiDTO[]) => {
    setListPotensi(data);
  };
  //#endregion

  //#region Query Hook
  usePotensiKotaTL(tlNIP, {
    enabled: !!tlNIP,
    onSuccess: dataKotaOnSuccess,
    staleTime: Infinity,
  });

  usePotensiKecamatanTL(tlNIP, selectedKota, {
    enabled: !!tlNIP && selectedKota !== '',
    onSuccess: dataKecamatanOnSuccess,
    staleTime: Infinity,
  });

  usePotensiKelurahanTL(tlNIP, selectedKota, selectedKecamatan, {
    enabled: !!tlNIP && selectedKota !== '' && selectedKecamatan !== '',
    onSuccess: dataKelurahanOnSuccess,
    staleTime: Infinity,
  });

  UseGetPotensiByArea(
    {
      kota: selectedKota,
      kecamatan: selectedKecamatan,
      kelurahan: selectedKelurahan,
      page: page,
    },
    {
      enabled:
        !!tlNIP &&
        selectedKota !== '' &&
        selectedKecamatan !== '' &&
        selectedKelurahan !== '',
      onSuccess: dataPotensiOnSuccess,
      // staleTime: Infinity,
    },
  );
  //#endregion

  //#region Effects
  useEffect(() => {
    const selectedItem = listKelurahan.find(
      (o) => o.value === selectedKelurahan,
    );
    const count = selectedItem ? selectedItem.count : 0;
    setPage(1);
    setJumlahData(count);
    setMaxPage(
      jumlahData % 10 ? Math.floor(jumlahData / 10) + 1 : jumlahData / 10,
    );
  }, [listKelurahan, selectedKelurahan, jumlahData]);

  useEffect(() => {
    setSelectedKelurahan('');
    setListKelurahan([]);
    setListPotensi([]);
  }, [selectedKecamatan]);

  useEffect(() => {
    setSelectedKelurahan('');
    setSelectedKecamatan('');
    setListKecamatan([]);
    setListKelurahan([]);
    setListPotensi([]);
  }, [selectedKota]);
  //#endregion

  //#region Evt Handlers
  const kotaChanged = (value: string) => {
    setSelectedKota(value);
  };

  const kecamatanChanged = (value: string) => {
    setSelectedKecamatan(value);
  };

  const kelurahanChanged = (value: string) => {
    setSelectedKelurahan(() => {
      return value;
    });
    setJumlahData(0);
  };
  //#endregion

  return (
    <Container
      sx={{ display: 'flex', flexDirection: 'column', height: '85vh' }}
    >
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
                  Selected :
                </Text>
              </Stack>
              <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <ActionIcon
                  disabled={page === 1}
                  variant="transparent"
                  onClick={() => {
                    setPage(page - 1);
                  }}
                >
                  <ChevronLeftIcon />
                </ActionIcon>
                <Text size="md" weight="bold">
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
                <Card key={idx} shadow="sm">
                  <Text size="xs" weight="bold">
                    {p.namaPenerima}
                  </Text>
                  <Text size="xs">{p.alamat}</Text>
                </Card>
              );
            })}
          </Stack>
        </ScrollArea>
      )}
    </Container>
  );
};

export default AssignVisit;
