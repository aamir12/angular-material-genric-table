import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { AfterRenderData, IActionBtnConfiguration, IColumn, IUserData } from './model';
import { createNewUser } from './data';
import { CurrencyPipe } from '@angular/common';
import { changeDateFormat, dateCompare, numberCompare, stringCompare, textSearchFN } from './utility/common.fn';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { LibMatTableListComponent } from './lib-mat-table-list/lib-mat-table-list.component';

type Table = LibMatTableListComponent<IUserData>;

@Component({
  selector: 'app-table',
  styleUrls: ['table-component.css'],
  templateUrl: 'table-component.html',
})
export class TableComponent implements OnInit {
  data: IUserData[] = [];
  textSearch = '';
  project_type = 'ALL';
  status_type = '1';
  filterValue: string = '';

  inputFilterFn!: (row: IUserData, filter: string) => boolean;
  inputSortFn!: (items: IUserData[], sort: MatSort) => IUserData[];
  //Define column configuation
  //transForm,style,disableSorting are optional
  recentSortDirection : 'asc' |'desc' = 'asc';
  columns: IColumn[] = [
    {
      name: 'id',
      disableSorting: true,
      displayName: 'Project ID',
      headerClasses: ['text-center'],
      dataClasses: ['text-center'],
    },
    {
      name: 'name',
      disableSorting: false,
      displayName: 'Name',
      headerClasses: ['text-center'],
      dataClasses: ['text-center'],
      transForm: (value: any) => {
        return value.toLowerCase();
      },
    },
    {
      name: 'fruit',
      disableSorting: false,
      displayName: 'Fruit',
      headerClasses: ['text-center'],
      dataClasses: ['text-center'],
      transForm: (value: any) => value.toUpperCase(),
    },
    {
      name: 'price',
      disableSorting: false,
      displayName: 'Price',
      headerClasses: ['text-center'],
      dataClasses: ['text-center'],
      transForm: (value: string) =>
        this.currencyPipe.transform(value, 'USD', 'symbol'),
    },
    {
      name: 'creationDate',
      disableSorting: false,
      displayName: 'Created Date',
      headerClasses: ['text-center'],
      dataClasses: ['text-center'],
    },
  ];

  actionBtns: IActionBtnConfiguration<IUserData> = {
    positions: 'start',
    sticky:true,
    headerClasses: ['text-center', 'action-column'],
    dataClasses: ['text-center', 'action-column'],
    buttons: [
      {
        name: 'View',
        onClick: this.onView.bind(this),
        icon: 'visibility',
        access: this.canView.bind(this),
      },
      {
        name: 'Edit',
        onClick: this.onEdit.bind(this),
        icon: 'edit',
        access: this.canEdit.bind(this),
      },
      {
        name: 'Delete',
        onClick: this.onDelete.bind(this),
        icon: 'delete',
        access: this.canDelete.bind(this),
      },
      //this button will only show on repository page
      // {
      //   name: 'Archived/UnArchived',
      //   nameTransForm: (row) => {
      //     return row.isArchived ? 'Unarchived' : 'Archived';
      //   },
      //   iconTransform: (row) => {
      //     return row.isArchived ? 'unarchive' : 'archive';
      //   },
      //   onClick: this.onToggleArchived.bind(this),
      //   icon: 'archive',
      //   access: this.canDelete.bind(this),
      // },
    ],
  };

  myProject: IUserData[] = [];
  teamProject: IUserData[] = [];
  allProject: IUserData[] = [];
  totalRecords = 0;
  isLoading = false;
  isArchieved = false;
  //to check access of variables;
  testVar: string = 'test variables';

  // info(title: string, data: IUserData[]) {
  //   console.log(title);
  //   console.log(data.length);
  //   console.log('Active', data.filter((d) => d.status === 1).length);
  //   console.log('Inactive', data.filter((d) => d.status === 2).length);
  // }
@ViewChild('libMatTable') libMatTable!:Table;
  constructor(
    private currencyPipe: CurrencyPipe,
  ) {}

  ngOnInit() {
    // Create 100 users
    const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));
    this.inputFilterFn = this.filterFN.bind(this);
    this.inputSortFn = this.sortFN.bind(this);

    this.allProject = users.map((x) => {
      x.creationDate = changeDateFormat(x.creationDate);
      return x;
    });
    console.log(JSON.stringify(this.allProject,null,2))
    this.myProject = this.allProject.filter((x) => x.project_type === 'MY');
    this.teamProject = this.allProject.filter((x) => x.project_type === 'TEAM');

    // this.info('ALL', this.allProject);
    // this.info('MY', this.myProject);
    // this.info('TEAM', this.teamProject);

    this.isLoading = true
    setTimeout(() => {
      this.onProjectTypeChange();
      this.isLoading = false;
    }, 2000);
  }

  applyFilter() {
    this.filterValue = JSON.stringify({
      textSearch: this.textSearch,
      status: this.status_type,
      isArchieved:this.isArchieved,
    });
  }

  //Action Functions
  onEdit(row: IUserData) {
    console.log('On Edit', row);
    console.log(this.testVar);
  }

  onView(row: IUserData) {
    console.log('On View', row);
    console.log(this.testVar);
  }

  onDelete(row: IUserData,ref:Table) {
    console.log('On Delete', row);
    console.log(ref);
    setTimeout(()=> {
      const rowIndex = this.data.findIndex(x => x.id === row.id);
      this.data.splice(rowIndex,1);
      ref.reRenderTable();
    },500)
  }

  onToggleArchived(row:IUserData,ref:Table) {
    row.isArchived = !row.isArchived;
    ref.reRenderTable();
  }

  canView(row: IUserData) {
    return true;
  }

  canEdit(row: IUserData) {
    return true;
  }

  canDelete(row: IUserData) {
    return true;
  }

  
  //Custom Sorting Function
  /**
   * By Angular material table sort in three ways 
   * asc
   * desc
   * random
   * We can also remove random order by adding extra condition of recentSortDirection
   */


  sortFN = (items: IUserData[], sort: MatSort): IUserData[] => {
    // console.log("direction",sort.direction);
    if (!sort.active || sort.direction === '') {

      // sort.direction = this.recentSortDirection === 'asc' ? 'desc' : 'asc';
      return items;
    }

    // this.recentSortDirection = sort.direction;
    return items.sort((a, b) => {
      let comparatorResult = 0;
      switch (sort.active) {
        case 'name':
        case 'fruit':
          comparatorResult = stringCompare(a[sort.active], b[sort.active]);
          break;
        case 'id':
        case 'price':
          comparatorResult = numberCompare(a[sort.active], b[sort.active]);
          break;
        case 'creationDate':
          comparatorResult = dateCompare(a.creationDate, b.creationDate, 'll');
          break;
        default:
          comparatorResult = dateCompare(a.creationDate, b.creationDate, 'll');
          break;
      }
      return comparatorResult * (sort.direction == 'asc' ? 1 : -1);
    });
  };

  

  //testing
  // checkStatus(status:number, selectedStatus:number) {
  //   return status === selectedStatus;
  // } 

  filterFN = (row: IUserData, filter: string): boolean => {
    const filterOption = JSON.parse(filter);
    const { status, textSearch,isArchieved } = filterOption;
    const isBothSelect = +status === 3;
    const matchArchieved =  row.isArchived === isArchieved;
    const isTextSearch = !!textSearch?.trim()?.length;

    if (isBothSelect && matchArchieved && !isTextSearch) {
      return true;
    }

    const matchesStatus = isBothSelect ||  +row.status === +status;
    const matchesTextSearch =
      !isTextSearch || textSearchFN(row,['id','name','fruit','price','creationDate'],textSearch);
    
    return matchesStatus && matchArchieved && matchesTextSearch;
  };

  // On Row Click
  onRowClick = (data: IUserData) => {
    console.log('Row Click');
    console.log(data);
    console.log(this.testVar);
  };

  clearFilter() {
    this.textSearch = '';
    this.applyFilter();
  }

  onProjectTypeChange() {
    console.log('onProjectTypeChange');
    if (this.project_type === 'MY') {
      this.data = [...this.myProject];
    } else if (this.project_type === 'TEAM') {
      this.data = [...this.teamProject];
    } else {
      this.data = [...this.allProject];
    }
    this.applyFilter();
  }

  onStatusChange() {
    this.applyFilter();
  }

  contentChanged() {
    console.log("render complete");
  }

  
  onAfterTableRender(event:AfterRenderData) {
    setTimeout(() => {
      this.totalRecords = event.renderedRows;
    },0)
  }

  onArcheivedView() {
    this.applyFilter();
  }
}
