import { ColumnDef } from '@tanstack/vue-table';
import { ServiceFee } from './types';
import { h } from 'vue';
import { formatDate, formatRupiah, numberFormat } from '@/utils';
import { ServiceFeeAction, ServiceFeeDetail } from './components';

export const serviceFeeColumns: ColumnDef<ServiceFee>[] = [
  {
    id: 'no',
    accessorKey: 'no',
    header: () => 'No',
    cell: ({ row }) => h('div', { class: 'w-5' }, row.index + 1),
  },
  {
    id: 'createdDate',
    accessorKey: 'createdDate',
    header: () => 'Tanggal Dibuat',
    cell: ({ row }) => h('div', formatDate(row.original.createdDate, 'dd MMM yyyy, HH:mm')),
  },
  {
    id: 'periode',
    accessorKey: 'periode',
    header: () => 'Periode Transaksi',
    cell: ({ row }) =>
      h(
        'div',
        `${formatDate(row.original.startPeriodTrx, 'dd MMM yyyy')} - ${formatDate(
          row.original.endPeriodTrx,
          'dd MMM yyyy'
        )}`
      ),
  },
  {
    id: 'jumlah',
    accessorKey: 'jumlah',
    header: () => 'Jumlah Transaksi',
    cell: ({ row }) =>
      h(ServiceFeeDetail, {
        countAll: numberFormat(
          row.original.nontaglisCount + row.original.postpaidCount + row.original.prepaidCount
        ),
        prepaid: numberFormat(row.original.prepaidCount),
        postpaid: numberFormat(row.original.postpaidCount),
        nontaglis: numberFormat(row.original.nontaglisCount),
      }),
  },
  {
    id: 'jumlah',
    accessorKey: 'jumlah',
    header: () => 'Jumlah Rupiah',
    cell: ({ row }) =>
      h(ServiceFeeDetail, {
        countAll: formatRupiah(
          row.original.nontaglisRp + row.original.postpaidRp + row.original.prepaidRp
        ),
        prepaid: formatRupiah(row.original.prepaidRp),
        postpaid: formatRupiah(row.original.postpaidRp),
        nontaglis: formatRupiah(row.original.nontaglisRp),
      }),
  },
  {
    id: 'jumlah',
    accessorKey: 'jumlah',
    header: () => 'Biaya Layanan',
    cell: ({ row }) =>
      h(ServiceFeeDetail, {
        countAll: formatRupiah(
          row.original.nontaglisFee + row.original.postpaidFee + row.original.prepaidFee
        ),
        prepaid: formatRupiah(row.original.prepaidFee),
        postpaid: formatRupiah(row.original.postpaidFee),
        nontaglis: formatRupiah(row.original.nontaglisFee),
      }),
  },

  {
    id: 'actions',
    header: () => '',
    cell: ({ row }) => h(ServiceFeeAction, { row: row.original }),
  },
];
