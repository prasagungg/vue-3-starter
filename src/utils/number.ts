export function formatRupiah(value: number): string {
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formatter.format(value);
}

export function numberFormat(value: number): string {
  const formatter = new Intl.NumberFormat('id-ID');
  return formatter.format(value);
}
