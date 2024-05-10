import { IUserData } from './model';

/** Constants used to fill up our data base. */
export const STATUS = [1, 2];
export const PROJECT_TYPE = ['MY', 'TEAM'];

export const FRUITS: string[] = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
];
export const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];

const randomDates = [
  '09-17-2010',
  '05-29-2005',
  '12-03-2018',
  '07-14-1999',
  '02-20-2008',
  '10-08-2015',
  '04-01-2003',
  '11-25-2011',
  '08-11-2006',
  '06-06-2013',
  '03-18-2001',
  '01-30-1995',
  '09-05-2009',
  '07-23-2017',
  '12-10-2004',
];

export /** Builds and returns a new User. */
function createNewUser(id: number): IUserData {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
    project_type:
      PROJECT_TYPE[Math.round(Math.random() * (PROJECT_TYPE.length - 1))],
    status: STATUS[Math.round(Math.random() * (STATUS.length - 1))],
    price: Math.round(Math.random() * 1000),
    creationDate:
      randomDates[Math.round(Math.random() * (randomDates.length - 1))],
  };
}
