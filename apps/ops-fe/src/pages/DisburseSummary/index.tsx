import {
  Box,
  Container,
  Text,
  Divider,
  Table,
  Card,
  ActionIcon,
} from '@mantine/core';
import {
  ColumnDef,
  createTable,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import services from 'services';

type DisburseData = {
  nopen: string;
  nama: string;
  tipeDebitur: string;
  produk: string;
  tenor: number;
  plafond: number;
  cabang: string;
  tl: string;
  mr: string;
  tgRealisasi: Dayjs;
};

const defaultColumns: ColumnDef<DisburseData>[] = [
  {
    header: 'Action',
    cell: (info) => {
      return (
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <ActionIcon>
            <PencilAltIcon color="blue" />
          </ActionIcon>
          <ActionIcon>
            <TrashIcon color="red" />
          </ActionIcon>
        </Box>
      );
    },
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
    accessorKey: 'tipeDebitur',
    header: 'Tipe Debitur',
  },
  {
    accessorKey: 'produk',
    header: 'Produk',
  },
  {
    accessorKey: 'tenor',
    header: 'Tenor',
  },
  {
    accessorKey: 'plafond',
    header: 'Plafond',
    cell: (info) => {
      return info.getValue<number>().toLocaleString('Id');
    },
  },
  {
    accessorKey: 'cabang',
    header: 'Cabang',
  },
  {
    accessorKey: 'tl',
    header: 'Team Leader',
  },
  {
    accessorKey: 'mr',
    header: 'Marketing',
  },
  {
    accessorKey: 'tgRealisasi',
    header: 'Tgl Realisasi',
    cell: (info) => {
      const d = info.getValue<Dayjs>();
      return d.format('DD/MM/YYYY');
    },
  },
];
export const DisburseSummary = () => {
  const [columns] = useState<typeof defaultColumns>(() => [...defaultColumns]);
  const allDisburseQuery = useQuery(
    ['allDisburse'],
    services.disburse.allDisburse,
    {
      select: (data) => {
        return data.map((d) => {
          return {
            nopen: d.nopen,
            nama: d.nama,
            tipeDebitur: d.TipeDebitur.nama,
            produk: d.Produk.nama,
            tenor: d.tenor,
            plafond: Number(d.plafond),
            cabang: d.Cabang.nama,
            tl: d.KaryawanTl.nama,
            mr: d.KaryawanMr.nama,
            tgRealisasi: dayjs(d.tgRealisasi),
          };
        });
      },
    },
  );

  const tableInstance = useReactTable({
    data: allDisburseQuery.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Container fluid>
      <Text size="lg" weight={'bold'}>
        Disburse Summary
      </Text>
      <Divider mb={20} />
      <Card>
        <Table>
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
