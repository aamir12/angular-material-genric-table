import { LibMatTableListComponent } from "./lib-mat-table-list/lib-mat-table-list.component";

export interface IUserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
  price: number;
  project_type: string;
  status: number;
  creationDate: string;
  isArchived:boolean;
}

export interface Style {
  [key: string]: string;
}

export interface IColumn {
  name: string;
  disableSorting?: boolean;
  displayName: string;
  headerStyle?: Style;
  dataStyle?: Style;
  transForm?: (value: any) => any;
  headerClasses?: string[];
  dataClasses?: string[];
}

export interface IActionBtn<T> {
  label: string;
  onClick: (data: T,ref:LibMatTableListComponent<T>) => void;
  icon?: string;
  access?: (data: T) => boolean;
  iconTransform?: (row: T) => string;
  labelTransForm?: (row: T) => string;
}

export interface IActionBtnConfiguration<T> {
  positions: 'start' | 'end';
  headerStyle?: Style;
  dataStyle?: Style;
  headerClasses?: string[];
  dataClasses?: string[];
  classes?: string[];
  buttons: IActionBtn<T>[];
  sticky?:boolean;
}

export interface SearchObject {
  [key:string]:unknown
}

export type NonArrayObject = object & { length?: never };

export interface TableMeta<T>  {
  numberofFilterRecords : string;
  currentPage: number;
  itemPerPage:number;
  sortBy: string;
  sortDirection: string;
  firstRenderedRecord : T;
  lastRenderedRecord: T;
  tableHeight: number;
  numberOfColumns: number;
  numberOfVisibleRows:number;
}

export interface AfterRenderData {
  renderedRows: number,
  reRenderTableFn: () => void,
}

