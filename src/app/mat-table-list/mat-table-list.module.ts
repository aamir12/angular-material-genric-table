import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableListComponent } from './mat-table-list.component';
import { WindowProvider } from '../window.service';

import { CommonModule } from '@angular/common';
import { IconsModule } from '../shared/icons.module';
import { MaterialExampleModule } from '../shared/material.module';

@NgModule({
  declarations: [MatTableListComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatNativeDateModule,
    MaterialExampleModule,
    ReactiveFormsModule,
    IconsModule
  ],
  providers: [WindowProvider],
  exports: [MatTableListComponent],
})
export class MatTableListModule {}
