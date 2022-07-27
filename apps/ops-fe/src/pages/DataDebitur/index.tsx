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
  Tooltip,
} from '@mantine/core';
import {
  ColumnDef,
  createTable,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  PencilAltIcon,
  TrashIcon,
  DocumentDuplicateIcon,
  XIcon,
} from '@heroicons/react/solid';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebouncedValue } from '@mantine/hooks';
import services from 'services';
import { notifyFast, notifySuccess } from '@/libs/notify';
import { showNotification } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';

type DebiturDataPaginated = {
  count: number;
  data: {
    cif: string;
    nopen: string;
    nama: string;
    telepon: string;
    created: Date;
    updated: Date;
  }[];
};

type DebiturData = DebiturDataPaginated['data'][0];

export const DataDebitur = () => {
  const navigate = useNavigate();
  const defaultColumns: ColumnDef<DebiturData>[] = [
    {
      accessorKey: 'cif',
      header: 'CIF',
      cell: (info) => (
        <Group sx={{ flexWrap: 'nowrap' }}>
          <ActionIcon
            onClick={() => {
              notifyFast('CIF Copied to Clipboard', showNotification);
              navigator.clipboard.writeText(info.getValue<string>());
            }}
          >
            <DocumentDuplicateIcon color="green" />
          </ActionIcon>
          <Button
            variant="subtle"
            onClick={() => {
              navigate(`/debitur/${info.getValue<string>()}`, {
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
      accessorKey: 'nopen',
      header: 'Nopen',
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
      accessorKey: 'updated',
      header: 'Updated',
      cell: (info) => (
        <Text size="sm">
          {dayjs(info.getValue<string>()).format('DD/MM/YYYY HH:mm')}
        </Text>
      ),
    },
    {
      accessorKey: 'created',
      header: 'Created',
      cell: (info) => (
        <Text size="sm">
          {dayjs(info.getValue<string>()).format('DD/MM/YYYY HH:mm')}
        </Text>
      ),
    },
  ];

  const [columns] = useState<typeof defaultColumns>(() => [...defaultColumns]);
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState<string | null>(null);

  const [debouncedFilter] = useDebouncedValue(filter, 500);
  const [debouncedPage] = useDebouncedValue(page, 200);
  const [countDebitur, setCountDebitur] = useState<number>(0);

  const qGetManyDebitur = useQuery(
    ['get-many-debitur', { page: debouncedPage, filter: debouncedFilter }],
    async () =>
      await services.debitur.getManyDebitur(
        page,
        filter ? filter.toUpperCase() : null,
      ),
    {
      keepPreviousData: true,
      select: (data) => {
        const { count, data: result } = data;
        const arrDebitur = result.map((d) => {
          return {
            cif: d.cif,
            nopen: d.nopen,
            nama: d.nama,
            telepon: d.telepon,
            created: d.createdAt,
            updated: d.updatedAt,
          };
        });
        return {
          count,
          data: arrDebitur,
        };
      },
    },
  );

  const tableInstance = useReactTable({
    data: qGetManyDebitur.data?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Container sx={{ position: 'relative' }} fluid>
      <LoadingOverlay
        visible={qGetManyDebitur.isLoading}
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
        {qGetManyDebitur.data && qGetManyDebitur.data?.count > 10 && (
          <Pagination
            total={Math.floor(countDebitur / 10) + 2}
            page={page}
            onChange={(page) => {
              setPage(page);
            }}
            radius="lg"
            mb={16}
          />
        )}

        <Table striped captionSide="bottom">
          {qGetManyDebitur.data && (
            <caption>
              <Text size="sm" align="left" pl={16} weight="bold">
                JUMLAH DATA : {qGetManyDebitur.data.count}
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
