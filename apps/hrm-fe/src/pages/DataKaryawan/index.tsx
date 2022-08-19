import {
  Box,
  Container,
  Text,
  Divider,
  Table,
  Card,
  ActionIcon,
  Group,
  TextInput,
  Button,
  LoadingOverlay,
  Pagination,
} from '@mantine/core';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { DocumentDuplicateIcon, XIcon } from '@heroicons/react/solid';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebouncedValue } from '@mantine/hooks';
import services from 'services';
import { notifyFast, notifySuccess } from '@/libs/notify';
import { showNotification } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';

type KaryawanDataPaginated = {
  count: number;
  data: {
    nip: string;
    nama: string;
    telepon: string;
    jabatan: string;
  }[];
};

type KaryawanData = KaryawanDataPaginated['data'][0];

export const DataKaryawan = () => {
  const navigate = useNavigate();
  const defaultColumns: ColumnDef<KaryawanData>[] = [
    {
      accessorKey: 'nip',
      header: 'NIP',
      cell: (info) => (
        <Group sx={{ flexWrap: 'nowrap' }}>
          <Button
            variant="subtle"
            onClick={() => {
              navigate(`/karyawan/${info.getValue<string>()}`, {
                replace: false,
              });
            }}
          >
            {info.getValue<string>()}
          </Button>
        </Group>
      ),
    },
    {
      accessorKey: 'nama',
      header: 'Nama',
    },
    {
      accessorKey: 'telepon',
      header: 'Telepon / WA',
    },
    {
      accessorKey: 'jabatan',
      header: 'Jabatan',
    },
  ];

  const [columns] = useState<typeof defaultColumns>(() => [...defaultColumns]);
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState<string | null>(null);

  const [debouncedFilter] = useDebouncedValue(filter, 500);
  const [debouncedPage] = useDebouncedValue(page, 200);
  const [countkaryawan, setCountkaryawan] = useState<number>(0);

  const qGetManyKaryawan = useQuery(
    ['get-many-karyawan', { page: debouncedPage, filter: debouncedFilter }],
    async () =>
      await services.karyawan.getManyKaryawan(
        page,
        filter ? filter.toUpperCase() : null,
      ),
    {
      keepPreviousData: true,
      select: (data) => {
        const { count, data: result } = data;
        const arrKaryawan = result.map((d) => {
          return {
            nip: d.nip,
            nama: d.nama,
            telepon: d.notelp,
            jabatan: d.jabatan,
          };
        });
        return {
          count,
          data: arrKaryawan,
        };
      },
    },
  );

  const tableInstance = useReactTable({
    data: qGetManyKaryawan.data?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Container sx={{ position: 'relative' }} fluid>
      <LoadingOverlay
        visible={qGetManyKaryawan.isLoading}
        transitionDuration={500}
      />
      <Text size="xl" weight={'bold'}>
        Data Debitur
      </Text>
      <Divider my={20} />
      <Card>
        <Group>
          <TextInput
            sx={{
              width: '300px',
              input: {
                textTransform: 'uppercase',
              },
            }}
            placeholder="Search"
            value={filter ? filter : ''}
            onChange={(e) => setFilter(e.target.value)}
            rightSection={
              filter &&
              filter !== '' && (
                <ActionIcon onClick={() => setFilter('')}>
                  <XIcon />
                </ActionIcon>
              )
            }
            mb={16}
          />
        </Group>
        {qGetManyKaryawan.data && qGetManyKaryawan.data?.count > 10 && (
          <Pagination
            total={Math.floor(countkaryawan / 10) + 2}
            page={page}
            onChange={(page) => {
              setPage(page);
            }}
            radius="lg"
            mb={16}
          />
        )}

        <Table striped captionSide="bottom">
          {qGetManyKaryawan.data && (
            <caption>
              <Text size="sm" align="left" pl={16} weight="bold">
                JUMLAH DATA : {qGetManyKaryawan.data.count}
              </Text>
            </caption>
          )}
          <thead>
            {tableInstance.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <div>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {tableInstance.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
};
