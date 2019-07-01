import { Component, OnInit } from '@angular/core';
import {  Router, ActivatedRoute } from '@angular/router';

import { provider } from '../../models/providersModel';

import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-form-provider',
  templateUrl: './form-provider.component.html',
  styleUrls: ['./form-provider.component.scss']
})
export class FormProviderComponent implements OnInit {

  prov: provider = {
    id: 0,
    name: "",
    company: "",
    direccion: "",
    tel: "",
    tel2: "",
    email: "",
    create_at: new Date(),
    img: "",
    provider:"",
  };
  edit: boolean = false;

  constructor(private serv: ProductService, private rout: Router, private actived: ActivatedRoute) { }

  ngOnInit() {
    const params = this.actived.snapshot.params;
      if(params.id){
        this.serv.getProvider(params.id).subscribe(
          res => {
          this.prov = res
          this.edit = true;
          } 
        )
      }
    }
  
  
  saveProvider(){
    delete this.prov.create_at;
    delete this.prov.id;
    this.serv.saveProvider(this.prov).subscribe(
      req => {
        console.log(req);
        this.resetForm();
      }
    )
  }
  resetForm(){
    this.prov.id = 0;
    this.prov.name = "";
    this.prov.company ="";
    this.prov.email="";
    this.prov.direccion ="";
    this.prov.tel ="";
    this.prov.tel2 ="";
    this.prov.img ="";
    this.prov.provider ="";
  }

  updateProvider(){
    this.serv.updateProvider(this.prov.id, this.prov).subscribe(
      req => { this.rout.navigate(['/proveedores'])}
    )
  }

}
