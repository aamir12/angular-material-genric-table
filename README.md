# Fully Configurable - Angular Material Table

## Features

- Fully Type Safe
- Custom Filtration
- Custom Sorting
- Disable Specific Column's Sorting
- Configurable Columns
- Columns Data Transfomation
- Custom Columns styling
- Responsive Table
- Action Buttons
- Action Button styling and position
- Pagination and Page Size
- Row Click handler
- Theme Support
- Action buttons permissoin supports
- Sticky Action Button
- Scroll the table on page change
- Default column Sorting option

## API Reference

```http
<lib-mat-table-list
  class="lib-mat-table-black-header"
  [data]="data"
  [filterValue]="filterValue"
  [columns]="columns"
  [filterFn]="inputFilterFn"
  [sortFn]="inputSortFn"
  [actionBtns]="actionBtns"
  [pageSize]="10"
  [containerClasses]="['py-5']"
  [tableContainerClasses]="['pt-2']"
  [rowClickListner]="onRowClick"
  [sortActive]="'creationDate'"
  [sortDirection]="'desc'"
  [paginationClasses] = "['bg-transparent','mt-3']"
></lib-mat-table-list>
```

| Parameter               | Description                                                      |
| :---------------------- | :--------------------------------------------------------------- |
| `data`                  | **Required** An array of generic type T representing the data to be displayed in the table |
| `columns`               | **Required** An array of IColumn objects representing the columns configuration of the table.|
| `filterValue`           | A string representing the filter value for filtering the data in the table|
| `sortFn`                | Custom Sorting Function                                          |
| `rowClickListner`       | Row Click Handler Function                                       |
| `actionBtns`            | Action Columns Setting and function definition                   |
| `pageSize`              | A number representing the number of items to be displayed per page.|
| `class`                 | define class by :host-context inside the component               |
| `tableContainerClasses` | An array of strings representing the CSS classes to be applied to the table container.|
| `containerClasses`      | An array of strings representing the CSS classes to be applied to the outer container of the table. |
| `paginationClasses`     | An array of strings representing the CSS classes to be applied to the pagination section. |
| `limitSizes`            |  An array of numbers representing the options for page size selection.|
|`scrollOffset`           | A number representing the offset used for scrolling to the table after pagination.|
|`rowClickListner`        | A function that handles row click events.|
|`filterFn`               | A function used for custom data filtering.|

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
