import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service'
@Component({
  selector: 'app-existlist',
  templateUrl: './existlist.component.html',
  styleUrls: ['./existlist.component.scss']
})
export class ExistlistComponent implements OnInit {

  objetosExis:any =[];
  poca:number = 0;
  objE:any = [];
  

  constructor(private serv: ProductService) { }

  ngOnInit() {
    this.getExisProduct()
  }

  getExisProduct(){
    this.serv.getProducts().subscribe(
      req => {
        this.objetosExis = req;
        var ult =  Object.keys(this.objetosExis).length
        for (let i = 0; i < ult; i++){
          if(this.objetosExis[i].stock < 5){
            this.objE[this.poca]=this.objetosExis[i]
            this.poca ++
          }
        }
        console.log(this.objE)
      },
      err => console.error(err)
    )
  }
}
