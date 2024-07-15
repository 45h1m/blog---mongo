import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function isoToIST(isoString:Date):string {
  const date = new Date(isoString);
  const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata' // IST timezone
  };
  const formattedDate = date.toLocaleString('en-IN', options);

  // Format the date string to "DD/MM/YYYY, HH:MM PM/AM IST"
  const [datePart, timePart] = formattedDate.split(', ');
  const [dd, mm, yyyy] = datePart.split('/');
  const timeWithIST = `${timePart}`;

  return `${dd}/${mm}/${yyyy}, ${timeWithIST}`;
}