export interface IUserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
  price: number;
  project_type: string;
  status: number;
  creationDate: string;
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
  name: string;
  onClick: (data: T) => void;
  icon?: string;
  access?: (data: T) => boolean;
}

export interface IActionBtnConfiguration<T> {
  positions: 'start' | 'end';
  headerStyle?: Style;
  dataStyle?: Style;
  headerClasses?: string[];
  dataClasses?: string[];
  classes?: string[];
  buttons: IActionBtn<T>[];
}
