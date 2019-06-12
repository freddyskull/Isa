import { Pipe, PipeTransform } from '@angular/core';
import { category } from '../models/categoryModel';
@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {



cat:any =[];

  transform(Id: category): any {
  
  }

}
