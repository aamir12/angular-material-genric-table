import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableListComponent } from './mat-table-list.component';
import { WindowProvider } from '../window.service';
import { MaterialExampleModule } from 'src/material.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [MatTableListComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatNativeDateModule,
    MaterialExampleModule,
    ReactiveFormsModule,
  ],
  providers: [WindowProvider],
  exports: [MatTableListComponent],
})
export class MatTableListModule {}
