# Fully Configurable - Angular Material Table

## Features

- Fully Type Safe
- Custom Filtration
- Custom Sorting
- Disable Specific Columns Sorting
- Configurable Columns
- Apply Multiple Columns Filtration by using custom function
- Columns Data Transfomation
- Custom Columns width
- Responsive Table
- Action Buttons
- Action Button width and position
- Pagination and Page Size
- Row Click handler
- Theme Support
- Action buttons checks permissoin before render
- Window Object Wrapper(Personal Testing)

## API Reference

```http
<app-mat-table-list
  class="lib-mat-black-header"
  [data]="data"
  [filterValue]="filterValue"
  [columns]="columns"
  [filterFn]="filterFN"
  [sortFn]="sortFn"
  [rowClickListner]="onRowClick"
  [actionBtns]="actionBtns"
  [pageSize]="5"
  [limitSizes]="[5,10,50]"
  [containerClasses]="['py-5','custom-table']"
  [tableContainerClasses]="['pt-2']"
></app-mat-table-list>
```

| Parameter               | Description                                                      |
| :---------------------- | :--------------------------------------------------------------- |
| `data`                  | **Required** Actual Data                                         |
| `columns`               | **Required** Columns Defination                                  |
| `filterValue`           | Filter value must be string                                      |
| `filterFn`              | Custom Filter Function                                           |
| `sortFn`                | Custom Sorting Function                                          |
| `rowClickListner`       | Row Click Handler Function                                       |
| `actionBtns`            | Action Columns Setting and function definition                   |
| `pageSize`              | Number of pages to be display                                    |
| `class`                 | define class by :host-context inside the component               |
| `tableContainerClasses` | Array of classes.it will be apply on the table container         |
| `containerClasses`      | Array of classes. It will be apply on the container of component |

| Parameter    | Type                                                               |
| :----------- | :----------------------------------------------------------------- |
| `columns`    | IColumn                                                            |
| `actionBtns` | IActionBtnConfiguration<T>, Here T is the type of row in the table |
| data         | T[]                                                                |

## All available types

```http
export interface Style {
  [key: string]: string;
}

export interface IColumn {
  name: string;
  disableSorting?: boolean;
  displayName: string;
  headerStyle?: Style;
  dataStyle?: Style;
  transForm?: (value: string) => string;
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

```

#### Made By Aamir Khan

Thank You!! 😄
