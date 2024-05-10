import moment from 'moment';

export function dateCompare(
  d1: string,
  d2: string,
  format: string = 'MM-DD-YYYY'
): number {
  const date1 = (isValidDate(d1, format) && new Date(d1).getTime()) || 0;
  const date2 = (isValidDate(d2, format) && new Date(d2).getTime()) || 0;
  return date1 - date2;
}

export function numberCompare(
  num1: string | number,
  num2: string | number
): number {
  return +num1 - +num2;
}

export function stringCompare(str1: string, str2: string): number {
  return str1.localeCompare(str2);
}

export function isValidDate(
  date: string,
  format: string = 'MM-DD-YYYY'
): boolean {
  return !!(date && moment(date, format).isValid());
}

export function isValidJSON(json: string): boolean {
  try {
    JSON.parse(json);
    return true;
  } catch (e) {
    return false;
  }
}

export function uniqueId(parts = 4): string {
  const stringArr = [];
  for (let i = 0; i < parts; i++) {
    const S4 = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    stringArr.push(S4);
  }
  return stringArr.join('-');
}
