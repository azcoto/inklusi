import { Container, Text, Divider, Table } from '@mantine/core';
import {
  ColumnDef,
  createTable,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { useQuery } from 'react-query';
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
    header: 'Nopen',
    cell: (info) => info.getValue(),
  },

  {
    header: 'Nama',
    cell: (info) => info.getValue(),
  },
  {
    header: 'Tipe Debitur',
    cell: (info) => info.getValue(),
  },
  {
    header: 'Produk',
    cell: (info) => info.getValue(),
  },
  {
    header: 'Tenor',
    cell: (info) => info.getValue(),
  },
  {
    header: 'Plafond',
    cell: (info) => info.getValue().toLocaleString('id-ID'),
  },
  {
    header: 'Cabang',
    cell: (info) => info.getValue(),
  },
  {
    header: 'Team Leader',
    cell: (info) => info.getValue(),
  },
  {
    header: 'Marketing',
    cell: (info) => info.getValue(),
  },
  {
    header: 'Tgl Realisasi',
    cell: (info) => {
      const d = info.getValue();
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

  // table, {
  // data: allDisburseQuery.data ?? [],
  // columns,
  // getCoreRowModel: getCoreRowModel(),

  return (
    <Container fluid>
      <Text size="lg" weight={'bold'}>
        Disburse Summary
      </Text>
      <Divider mb={20} />
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
    </Container>
  );
};
