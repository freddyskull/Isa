import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../../services/product.service';

import {Router} from '@angular/router'

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.scss']
})
export class ListClientComponent implements OnInit {

  constructor(private service: ProductService, private rout: Router) { }
  cliente:any = [];
  consult:any = [];
  del: boolean = false;
  filter:string = '';
  ngOnInit() {
    this.getClients()
  }
  getClients(){
    this.service.getClients().subscribe(
      req => {
        this.cliente = req;
      },
      err => console.error(err)
    );
  }

  getClient(id:string){
    this.service.getClient(id).subscribe(
      req =>{
        console.log(req);
        this.consult = req; 
      },
      err => console.error(err)
    );
  }
  deleteClient(id :string){
    this.service.deleteclient(id).subscribe(
      req => {
        console.log(req);
        this.getClients()
      },
      err => console.error(err)
    )
  }
  

}
