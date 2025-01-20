export type DashboardCardProduct = {
  groupProduct: string;
  jenisTransaksi: string;
  jumlahDaily: number;
  rptotalDaily: number;
  rpadminTotalDaily: number;
  jumlahMonthly: number;
  rptotalMonthly: number;
  rpadminTotalMonthly: number;
};

export enum Product {
  PREPAID = 'PREPAID',
  POSTPAID = 'POSTPAID',
  NONTAGLIS = 'NONTAGLIS',
}

export enum VarietyFilter {
  LINE = 'LINE',
  BAR = 'BAR',
}

export enum TypeFilter {
  JUMLAH_RUPIAH = 'JUMLAH_RUPIAH',
  JUMLAH_TRANSAKSI = 'JUMLAH_TRANSAKSI',
}

export type FilterStatic = {
  type: TypeFilter;
  variety: VarietyFilter;
};

export type PendapatanBulanan = {
  jumlah: number;
  rptotal: number;
  tanggalBayar: string;
};

export type PendapatannHarian = {
  jumlah: number;
  rptotal: number;
  jenisTransaksi: Product;
};
