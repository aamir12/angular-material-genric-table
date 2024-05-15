import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { WindowProvider } from './window.service';
import { LibMatTableListModule } from './lib-mat-table-list/lib-mat-table-list.module';
import { CurrencyPipe } from '@angular/common';
import { MaterialModule } from './shared/material.module';
import { TableComponent } from './table-component';

@NgModule({
  declarations: [TableComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    LibMatTableListModule,
  ],
  providers: [WindowProvider, CurrencyPipe],
  bootstrap: [TableComponent],
})
export class AppModule {}
