import {
    TestBed,
    ComponentFixture,
    inject,
    fakeAsync,
    flush,
  } from '@angular/core/testing';
  import {
    HttpClientTestingModule,
  } from '@angular/common/http/testing';
  
  import { CUSTOM_ELEMENTS_SCHEMA, Component, DebugElement, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
  

  import { MaterialModule } from 'src/app/shared/material.module';

  import { LibMatTableListComponent } from './lib-mat-table-list.component';


  import { NoopAnimationsModule } from '@angular/platform-browser/animations';
  import { By } from '@angular/platform-browser';
  import { MatSort } from '@angular/material/sort';
import { IActionBtnConfiguration, IColumn } from '../model';
import { stringCompare, textSearchFN } from '../utility/common.fn';
import { WINDOW } from '../window.service';
import { click } from '../utility/test-cases.fn';
  
  interface Post {
    id: string;
    title: string;
    body: string;
  }
  
  interface DummyLibMatTableContainerComponent_Option {
    data: Post[];
    filterValue: string | undefined;
    actionBtns: IActionBtnConfiguration<Post> | undefined;
    columns: IColumn[];
    rowClickListner: (row:Post) => void;
  }
  
  const posts: Post[] = Array.from({ length: 3 }, (_, i) => ({
    id: i + 1+"",
    title: `Title ${i + 1}`,
    body: `Body ${i + 1}`,
  }))
  @Component({
    selector: 'fake-lib-mat-table-container',
    template: `
    <lib-mat-table-list
        class="lib-mat-table-black-header"
        [data]="posts"
        [filterValue]="filterValue"
        [columns]="columns"
        [filterFn]="filterFn"
        [sortFn]="sortFn"
        [actionBtns]="actionBtns"
        [pageSize]="pageSize"
        [scrollOffset] = "50"
        [rowClickListner] ="rowClickListner"
        [isLoading]= "isLoading"
        [isScrollUpAfterPageChange] = "isScrollUpAfterPageChange"
        [containerClasses]="['py-4']">
    </lib-mat-table-list>
    `,
  
  })
  class DummyLibMatTableContainerComponent {
    posts: Post[] = posts;
    filterValue : string | undefined = '';
    pageSize = 10;
    isLoading = false;
    isScrollUpAfterPageChange = true;
    actionBtns: IActionBtnConfiguration<Post> | undefined = {
      headerStyle:{},
      headerClasses:[],
      dataStyle:{},
      dataClasses:[],
      positions:'start',
      sticky:false,
      buttons:[
        {
          name:'View',
          icon:'fa-view',
          onClick:(row)=>{
            console.log("Edit"+row.id);
          }
        }
      ]
    };
  
    columns: IColumn[] = [
      {
        name:'id',
        displayName:'ID',
        disableSorting:false
      },
      {
        name:'title',
        displayName:'Title',
        disableSorting:false
      },
      {
        name:'body',
        displayName:'Body',
        disableSorting:false
      }
    ]
  
    @ViewChild(LibMatTableListComponent) libMatTableList!: LibMatTableListComponent<Post>;
    rowClickListner(row: Post){
      console.log("Row Clicked");
    }
  
    filterFn = (row: Post, filter: string): boolean => {
      if (!filter) {
        return true;
      }
      return textSearchFN(row,['title'],filter);
    };
  
    sortFn = (items: Post[], sort: MatSort): Post[] => {
      if (!sort.active || sort.direction === '') {
        return items;
      }
      return items.sort((a, b) => {
        let comparatorResult = 0;
        switch (sort.active) {
          case 'id':
          case 'title':
          case 'body':
            comparatorResult =  stringCompare(a[sort.active], b[sort.active]);
            break;
          default: 
            comparatorResult =  stringCompare(a.title, b.title);
           break;
        }
        return comparatorResult * (sort.direction == 'asc' ? 1 : -1);
      });
  
    }
  }
  
  describe('LibMatTableListComponent', () => {
    let component: DummyLibMatTableContainerComponent;
    let fixture: ComponentFixture<DummyLibMatTableContainerComponent>;
    let defaultOption: DummyLibMatTableContainerComponent_Option;
    let el: DebugElement;
    let windowObj : any;
    const loadComponent = (defaultOption: DummyLibMatTableContainerComponent_Option) => {
      inject([], () => {
        windowObj = TestBed.inject(WINDOW);
        fixture = TestBed.createComponent(DummyLibMatTableContainerComponent);
        el = fixture.debugElement;
        component = fixture.componentInstance;
              component.posts = defaultOption.data;
        component.actionBtns = defaultOption.actionBtns || undefined;
        component.filterValue = defaultOption.filterValue;
        component.columns = defaultOption.columns;
        component.rowClickListner = defaultOption.rowClickListner;
        fixture.detectChanges();
      })();
    };
  
    beforeEach(async () => {
      const mockWindow = { 
        scrollTo: jasmine.createSpy()
       };
  
      const mockDocument = {
        getElementById: jasmine.createSpy().and.returnValue({offsetTop:10} as HTMLElement),
      }
  
      await TestBed.configureTestingModule({
        declarations: [
          DummyLibMatTableContainerComponent,
          LibMatTableListComponent,
        ],
        imports: [
                  HttpClientTestingModule,
          MaterialModule,
          NoopAnimationsModule
              ],
        schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
        providers: [
          { provide: WINDOW, useValue: mockWindow },
          { provide: Document, useValue: mockDocument },
          
        ],
      }).compileComponents();
  
  
      defaultOption = {
        data:posts,
        filterValue:'',
        actionBtns:{
          headerStyle:{},
          headerClasses:[],
          dataStyle:{},
          dataClasses:[],
          positions:'start',
          sticky:false,
          buttons:[
            {
              name:'View',
              icon:'fa-view',
              onClick:(row)=>{
                console.log("Edit"+row.id);
              }
            }
          ]
        },
        columns:[
          {
            name:'id',
            displayName:'ID',
            disableSorting:false
          },
          {
            name:'title',
            displayName:'Title',
            disableSorting:false
          },
          {
            name:'body',
            displayName:'Body',
            disableSorting:false
          }
        ],
        rowClickListner: (row) => {
          console.log("Row Clicked");
        }
      };
    });
  
    it('should create component', () => {
      loadComponent(defaultOption);
      expect(component).toBeTruthy();
    });
  
    it('should create component without action buttons', () => {
      delete defaultOption.actionBtns;
      loadComponent(defaultOption);
      const columns = el.queryAll(By.css('th.mat-header-cell'));
      expect(columns.length).toEqual(3);
    });
  
    it('should display action buttons at the end of all columns', () => {
      defaultOption = {
        ...defaultOption,
        actionBtns: defaultOption.actionBtns ? {
          ...defaultOption.actionBtns,
          positions: 'end',
        }: undefined
      }
      loadComponent(defaultOption);
      const lastColumn = el.queryAll(By.css('th.mat-header-cell'))[3];
      expect(lastColumn.nativeElement.textContent.trim()).toEqual('Action');
      expect(component.libMatTableList.displayedColumns.length).toEqual(4);
    });
  
    it('should filter data', () => {
      loadComponent(defaultOption);
      component.posts = [...defaultOption.data];
      component.filterValue = "Title 2";
      fixture.detectChanges();
      let rows = el.queryAll(By.css('tr.mat-row'));
      expect(rows.length).toEqual(1)
    });
  
    it('should call row handler', () => {
      spyOn(console,'log')
      loadComponent(defaultOption);
      const rows = el.queryAll(By.css('tr.mat-row'));
      click(rows[0]);
      fixture.detectChanges();
      expect(console.log).toHaveBeenCalledWith("Row Clicked");
    })
  
    it('should call button action handler',fakeAsync(() => {
      spyOn(console,'log');
      loadComponent(defaultOption);
      const actionButton = el.queryAll(By.css('.action-btn'))[0];
      const eventMock = { stopPropagation: jasmine.createSpy('stopPropagation') } as any;
      actionButton.triggerEventHandler('click',eventMock)
      fixture.detectChanges();
      flush();
      
      const menus = el.queryAll(By.css('.mat-menu-item'))[0];
      console.log("Menu",menus)
      menus.triggerEventHandler('click',eventMock);
      expect(console.log).toHaveBeenCalledWith("Edit1");
    }))
  
    it('should navigate forward/backward by clicking navigator button',fakeAsync(() => {
      loadComponent(defaultOption);
      component.posts = [...defaultOption.data];
      component.pageSize = 1;
      fixture.detectChanges();
  
      const nextButton = el.queryAll(By.css('.mat-paginator-navigation-next'))[0];
      const previousButton = el.queryAll(By.css('.mat-paginator-navigation-previous'))[0];
      click(nextButton);
      fixture.detectChanges();
      flush();
      let rows = el.queryAll(By.css('tr.mat-row'));
      let titleCell = el.queryAll(By.css('td.mat-column-title'))[0];
      expect(rows.length).toEqual(1);
      expect(titleCell.nativeElement.textContent.trim()).toEqual('Title 2');
  
      click(previousButton);
      fixture.detectChanges();
      flush();
      rows = el.queryAll(By.css('tr.mat-row'));
      titleCell = el.queryAll(By.css('td.mat-column-title'))[0];
      expect(rows.length).toEqual(1);
      expect(titleCell.nativeElement.textContent.trim()).toEqual('Title 1');
  
    }))
  
    it('should not scroll up on page change, when isScrollUpAfterPageChange is false',fakeAsync(() => {
      loadComponent(defaultOption); 
      component.posts = [...defaultOption.data];
      component.pageSize = 1;
      component.isScrollUpAfterPageChange = false;
      fixture.detectChanges();
      const nextButton = el.queryAll(By.css('.mat-paginator-navigation-next'))[0];
      click(nextButton);
      fixture.detectChanges();
      flush();
      expect(windowObj.scrollTo).not.toHaveBeenCalled();
  
    }))
  
  });
  
  
  
  