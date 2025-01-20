import { format, startOfMonth } from 'date-fns';
import { PendapatanBulanan, Product, TypeFilter } from '../types';

export const getColor = (product: Product, bg: boolean = true) => {
  if (bg) {
    if (product === Product.PREPAID) return 'bg-[#48B194]';
    if (product === Product.POSTPAID) return 'bg-[#5182C5]';

    return 'bg-[#CC4E78]';
  }

  if (product === Product.PREPAID) return '#48B194';
  if (product === Product.POSTPAID) return '#5182C5';

  return '#CC4E78';
};

export const generateDateRange = (): string[] => {
  const start = startOfMonth(new Date());
  const end = new Date();

  const dates = [];
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    dates.push(format(new Date(d), 'yyyy-MM-dd'));
  }

  return dates;
};

export const fillMissingDates = (data: PendapatanBulanan[], range: string[], type: TypeFilter) => {
  const dataMap = new Map(
    data.map((item) => [
      item.tanggalBayar,
      type === TypeFilter.JUMLAH_RUPIAH ? item.rptotal : item.jumlah,
    ])
  );

  return range.map((date) => dataMap.get(date) || 0);
};

export const getMonths = () => {
  const currentYear = new Date().getFullYear();

  return Array.from({ length: 12 }, (_, index) => {
    const month = (index + 1).toString().padStart(2, '0');
    return {
      label: new Date(currentYear, index).toLocaleString('id-ID', { month: 'long' }),
      value: `${currentYear}${month}`,
    };
  });
};
