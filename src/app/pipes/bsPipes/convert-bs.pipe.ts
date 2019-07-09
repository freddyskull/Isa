import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertBs'
})
export class ConvertBsPipe implements PipeTransform {

  transform(value: any): any {
    if(value == 0){
      return ""
    }else{
      return (Math.round(value)).toLocaleString() + ",00"
    }
  }

}
