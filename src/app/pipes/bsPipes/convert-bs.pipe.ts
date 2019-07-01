import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertBs'
})
export class ConvertBsPipe implements PipeTransform {

  transform(value: any): any {
    return (Math.round(value)).toLocaleString()
  }

}
