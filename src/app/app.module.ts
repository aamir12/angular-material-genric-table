import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { WindowProvider } from './window.service';
import { LibMatTableListModule } from './lib-mat-table-list/lib-mat-table-list.module';
import { CurrencyPipe } from '@angular/common';
import { AP3DatePipe } from './pipes/ap3date.pipe';
import { MaterialModule } from './shared/material.module';
import { TableComponent } from './table-component';

@NgModule({
  declarations: [TableComponent, AP3DatePipe],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    LibMatTableListModule,
  ],
  providers: [WindowProvider, CurrencyPipe, AP3DatePipe],
  bootstrap: [TableComponent],
})
export class AppModule {}
