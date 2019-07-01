import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../services/product.service'

@Component({
  selector: 'app-list-provider',
  templateUrl: './list-provider.component.html',
  styleUrls: ['./list-provider.component.scss']
})
export class ListProviderComponent implements OnInit {

  constructor(private serv: ProductService ) { }

  prov: any =[];
  consult: any =[];
  filter:string = '';
  ngOnInit() {
    this.getProvider()
  }

  getProvider(){
    this.serv.getProviders().subscribe(
      req => this.prov = req,
      err => console.error(err) 
    )
  }
  getProv(id: string){
    this.serv.getProvider(id).subscribe(
      req =>{
        console.log(req)
        this.consult = req;
      },
      err => console.error(err)
    )
  }
  deleteProv(id: string){
    this.serv.deleteProvider(id).subscribe(
      req => {
        console.log(req);
        this.getProvider()
      }
    )
  }
}
