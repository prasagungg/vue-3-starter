import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';

export function formatDate(date: string, formatDate: string = 'dd MMM yyyy, HH:mm:ss') {
  return format(parseISO(date), formatDate, { locale: id });
}

export function formatDateNoIso(date: Date, formatDate: string = 'dd MMM yyyy, HH:mm:ss') {
  return format(date, formatDate, { locale: id });
}

export function getThbl(date?: string): string {
  const newDate = date ? new Date(date) : new Date();
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;

  // Pastikan bulan dua digit
  const formattedMonth = month >= 10 ? month : `0${month}`;

  return `${year}${formattedMonth}`;
}
