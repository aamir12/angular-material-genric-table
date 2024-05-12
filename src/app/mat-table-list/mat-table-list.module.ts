import { NgModule } from '@angular/core';
import { LibMatTableListComponent } from './mat-table-list.component';
import { WindowProvider } from '../window.service';

import { CommonModule } from '@angular/common';
import { IconsModule } from '../shared/icons.module';
import { MaterialModule } from '../shared/material.module';

@NgModule({
  declarations: [LibMatTableListComponent],
  imports: [
    CommonModule,
    MaterialModule,
    IconsModule
  ],
  providers: [WindowProvider],
  exports: [LibMatTableListComponent],
})
export class LibMatTableListModule {}
