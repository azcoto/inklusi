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
import { useAuthed } from '@/context/auth';

type LoanDataPaginated = {
  count: number;
  data: {
    noPengajuan: string;
    nopen: string;
    nama: string;
    tipeDebitur: string;
    tglPengajuan: string;
    produk: string;
    plafondPengajuan: string;
    tenorPengajuan: string;
    created: string;
    updated: string;
  }[];
};

type LoanData = LoanDataPaginated['data'][0];

export const DataLoan = () => {
  const navigate = useNavigate();

  const defaultColumns: ColumnDef<LoanData>[] = [
    {
      accessorKey: 'noPengajuan',
      header: 'No Pengajuan',
      cell: (info) => (
        <Group sx={{ flexWrap: 'nowrap' }} spacing="xs">
          <ActionIcon
            onClick={() => {
              notifyFast('Nomor Copied to Clipboard', showNotification);
              navigator.clipboard.writeText(info.getValue<string>());
            }}
          >
            <DocumentDuplicateIcon color="green" />
          </ActionIcon>
          <Button
            variant="subtle"
            onClick={() => {
              navigate(`/loan/${info.getValue<string>()}`, {
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
      accessorKey: 'tglPengajuan',
      header: 'Tgl Pengajuan',
    },
    {
      accessorKey: 'tipeDebitur',
      header: 'Tipe Debitur',
    },
    {
      accessorKey: 'produk',
      header: 'Produk',
    },
    {
      accessorKey: 'plafondPengajuan',
      header: 'Plafond',
    },
    {
      accessorKey: 'tenorPengajuan',
      header: 'Tenor',
    },
    {
      accessorKey: 'updated',
      header: 'Updated',
    },
    {
      accessorKey: 'created',
      header: 'Created',
    },
  ];

  const [columns] = useState<typeof defaultColumns>(() => [...defaultColumns]);
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState<string | null>(null);

  const [debouncedFilter] = useDebouncedValue(filter, 500);
  const [debouncedPage] = useDebouncedValue(page, 200);
  const [countDebitur, setCountDebitur] = useState<number>(0);
  const { currentUser } = useAuthed();
  console.log(currentUser);

  const qGetManyLoan = useQuery(
    [
      'get-many-loan',
      {
        page: debouncedPage,
        filter: debouncedFilter,
        cabangId: currentUser.cabangId,
      },
    ],
    async () =>
      await services.loan.getManyLoan({
        page: String(page),
        ...(filter && { filter: filter.toUpperCase() }),
        ...(currentUser.cabangId && { cabangId: currentUser.cabangId }),
      }),
    {
      keepPreviousData: true,
      select: (result) => {
        const { count, data } = result;
        const loans = data.map((d) => {
          console.log(dayjs(d.tglPengajuan).format('DD/MM/YYYY'));
          return {
            noPengajuan: d.noPengajuan,
            nopen: d.Debitur.nopen,
            nama: d.Debitur.nama,
            tipeDebitur: d.TipeDebitur.nama,
            tglPengajuan: dayjs(d.tglPengajuan).format('DD/MM/YYYY') as string,
            produk: d.Produk.nama,
            plafondPengajuan: new Intl.NumberFormat('id-ID').format(
              d.plafondPengajuan,
            ),
            tenorPengajuan: String(d.tenorPengajuan),

            created: dayjs(d.createdAt).format('DD/MM/YYYY HH:mm'),
            updated: dayjs(d.updatedAt).format('DD/MM/YYYY HH:mm'),
          };
        });
        return {
          count,
          data: loans,
        };
      },
    },
  );

  const tableInstance = useReactTable({
    data: qGetManyLoan.data?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Container sx={{ position: 'relative' }} fluid>
      <LoadingOverlay
        visible={qGetManyLoan.isLoading}
        transitionDuration={500}
      />
      <Text size="xl" weight={'bold'}>
        Data Pengajuan Kredit
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
        {qGetManyLoan.data && qGetManyLoan.data?.count > 10 && (
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
          {qGetManyLoan.data && (
            <caption>
              <Text size="sm" align="left" pl={16} weight="bold">
                JUMLAH DATA : {qGetManyLoan.data.count}
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
