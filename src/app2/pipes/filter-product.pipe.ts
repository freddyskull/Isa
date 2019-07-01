import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'filterProduct'
})
export class FilterProductPipe implements PipeTransform {
  transform(value: any, arg: any): any {
    if(arg == '' || arg.length < 3) return value;
    const getProduct = [];
    for(const product of value){
      if (product.name.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        getProduct.push(product)
      }
    }
    return getProduct;
  }

}
