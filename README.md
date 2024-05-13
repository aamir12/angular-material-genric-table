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

```js
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
| `sortFn` | A function used for custom data sorting.|
| `sortActive` | A string representing the active sorting column. |
|`sortDirection` | A string representing the sorting direction ('asc' or 'desc').|
|`actionBtns` | An object of type IActionBtnConfiguration representing the configuration for action buttons in the table.|


## Interfaces
### IColumn
| Key               | Description                                                      |
|`name`| string - The name of the column.|
|`disableSorting`| boolean (optional) - Indicates whether sorting is disabled for this column.|
|`displayName`| string - The display name of the column.|
|`headerStyle`| Style (optional) - CSS styles for the column header.|
|`dataStyle`| Style (optional) - CSS styles for the column data.|
|`transForm`| (value: any) => any (optional) - A transformation function for the column data.|
|`headerClasses`| string[] (optional) - CSS classes for the column header.|
|`dataClasses`| string[] (optional) - CSS classes for the column data.|

### IActionBtn<T>
|`name`| string - The name of the action button.|
|`onClick`| (data: T) => void - Function to be executed when the action button is clicked.|
|`icon` | string (optional) - The icon name for the action button.|
|`access`| (data: T) => boolean (optional) - Function to determine whether the action button is accessible for a specific row.

### IActionBtnConfiguration<T>
|`positions`| 'start' | 'end' - Position of the action buttons relative to the columns.|
|`headerStyle`| Style (optional) - CSS styles for the action button header.|
|`dataStyle`| Style (optional) - CSS styles for the action button data.|
|`headerClasses`| string[] (optional) - CSS classes for the action button header.|
|`dataClasses`| string[] (optional) - CSS classes for the action button data.|
|`classes`| string[] (optional) - CSS classes for the action buttons.|
|`buttons`| IActionBtn<T>[] - Array of action button configurations.|
|`sticky` | boolean (optional) - Indicates whether the action buttons are sticky.|

## All available types

#### Made By Aamir Khan

Thank You!! 😄
