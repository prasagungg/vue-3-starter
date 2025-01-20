import { format, parse } from 'date-fns';
import { id } from 'date-fns/locale';

export const getInitials = (name: string) => {
  const words = name.split(' ');

  const firstThreeWords = words.slice(0, 3);

  const initials = firstThreeWords.map((word) => word[0]);

  return initials.join('');
};

export const getFirstWord = (str: string): string => {
  const trimmedStr: string = str.trim();

  const words: string[] = trimmedStr.split(' ');

  // Return the first word
  return words[0];
};

export const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

export const formatDatePayment = (dateStr: string, includeYear: boolean = false): string => {
  // Validate input length
  if (dateStr.length !== 6) {
    throw new Error('Date string must be in YYYYMM format');
  }

  // Extract year and month from the date string
  const year = dateStr.substring(0, 4);
  const month = dateStr.substring(4, 6);

  // Convert month to integer and adjust to zero-based index
  const monthIndex = parseInt(month, 10) - 1;

  // Array of month names
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // Check if monthIndex is within valid range
  if (monthIndex < 0 || monthIndex > 11) {
    throw new Error('Invalid month value in date string');
  }

  // Format the date
  return includeYear ? `${monthNames[monthIndex]} ${year}` : `${monthNames[monthIndex]}`;
};

export const extractDayAndMonth = (dateStr: string) => {
  const parts = dateStr.split(' ');
  if (parts.length === 3) {
    const day = parts[0];
    const month = parts[1];
    const year = parts[2];

    return { day, month, year };
  } else {
    throw new Error('Invalid date format');
  }
};

type MessageData = {
  message: string;
  boldValues: string[];
};

export function boldMessageParts(data: MessageData): string {
  let { message, boldValues } = data;
  boldValues?.forEach((value) => {
    const regex = new RegExp(
      `(${value.toString().replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`,
      'g'
    );
    message = message.replace(regex, '<strong>$1</strong>');
  });
  return message;
}

export function formattedText(val: string) {
  return val.replace(/\n/g, '<br>');
}

export const convertToUrl = (name: string) => {
  return name.toLowerCase().replace(/\s+/g, '-');
};

// Function to convert URL-friendly format back to product name
export const convertToName = (urlName: string) => {
  return urlName
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const maskString = (str: string, length?: number): string => {
  if (str.length <= 3) {
    return str;
  }
  if (length) {
    const firstThree = str.slice(0, length); // ambil tiga karakter pertama
    let repeatAsterisk = str.length - length;
    if (repeatAsterisk <= 0) {
      repeatAsterisk = 3;
    }
    const maskedPart = '*'.repeat(repeatAsterisk); // buat string '*' untuk sisa karakter
    const finalString = firstThree + maskedPart;
    return finalString.slice(0, 15);
  }
  const firstThree = str.slice(0, 3); // ambil tiga karakter pertama
  const maskedPart = '*'.repeat(str.length - 3); // buat string '*' untuk sisa karakter

  const finalString = firstThree + maskedPart;
  return finalString.slice(0, 15);
};

export function formatBLTH(val: string) {
  const parsedDate = parse(val, 'd MMMM yyyy', new Date(), { locale: id });

  // Formatting tanggal menjadi format 'MMMyy' dan mengubahnya menjadi huruf besar
  const formattedDate = format(parsedDate, 'MMMyy', { locale: id }).toUpperCase();
  return formattedDate;
}

export const parseBlth = (str: string): string => {
  const parsedDate = parse(str, 'yyyyMM', new Date());
  const formattedDate = format(parsedDate, 'MMMyy', { locale: id }).toUpperCase();
  return formattedDate;
};
