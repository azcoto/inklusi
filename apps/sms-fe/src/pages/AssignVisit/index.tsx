import { DataPotensiKotaTL } from '@api/area-potensi-tl/dto';
import { Text, Container, Group, Select } from '@mantine/core';
import { useAuth } from 'context/auth';
import { forwardRef, RefObject, useState } from 'react';
import { useQuery } from 'react-query';
import { getPotensiKotaTL, usePotensiKotaTL } from 'services/potensiTL';

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  label: string;
  value: string;
  count: string;
}

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

const AssignVisit = () => {
  const [listKota, setListKota] = useState<
    {
      label: string;
      value: string;
      count: number;
    }[]
  >([]);

  const { currentUser } = useAuth();
  const tlNIP = currentUser ? currentUser.nip : null;
  console.log(currentUser);

  const dataKotaOnSuccess = (data: DataPotensiKotaTL) => {
    const mapped = data.map((item) => ({
      label: item.dati2,
      value: item.dati2,
      count: item.cnt,
    }));
    setListKota(mapped);
  };

  const { data: dataKota, isSuccess: dataKotaSuccess } = usePotensiKotaTL(
    tlNIP,
    {
      enabled: !!tlNIP,
      onSuccess: dataKotaOnSuccess,
    },
  );

  return (
    <Container>
      {dataKotaSuccess && (
        <Select
          itemComponent={SelectItem}
          data={listKota}
          label="Kota/Kabupaten"
        />
      )}

      {/* <Select data={dataKota} label="Kecamatan" />
      <Select data={dataKota} label="Kelurahan" /> */}
    </Container>
  );
};

export default AssignVisit;
