import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';
@Pipe({
  name: 'ap3Date',
})
export class AP3DatePipe implements PipeTransform {
  constructor() {}
  transform(date: any, format: string): any {
    if (date === null) {
      return;
    }
    return moment(date, 'MM-DD-YYYY').format('ll');
  }
}
