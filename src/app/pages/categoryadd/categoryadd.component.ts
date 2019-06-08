import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../services/product.service';

import { category } from '../../models/categoryModel';

import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categoryadd',
  templateUrl: './categoryadd.component.html',
  styleUrls: ['./categoryadd.component.scss']
})
export class CategoryaddComponent implements OnInit {

  edit: boolean = false;
  
  constructor(private serv: ProductService, private rout: Router, private actived: ActivatedRoute) { }


  cat: category = {
    id: 0,
    name: "",
    description: ""
  }
  good:boolean = false;
  bad:boolean = false;

  ngOnInit() {
    this.saveCat;
    const params = this.actived.snapshot.params;
    if(params.id){
      this.serv.getCategory(params.id).subscribe(
        req => {
          this.cat = req;
          this.edit = true;
        },
        err => console.error(err)
      )
    }
  }

  resetForm(){
    this.cat.name = "",
    this.cat.description = ""
  }

  saveCat(){
    if(this.cat.name != ""){
      delete  this.cat.id;
      this.serv.saveCategory(this.cat).subscribe(
        req =>{
          console.log(req);
        }
      )
      this.resetForm()
      this.good = true;
      setTimeout(()=>{
        this.good = false;
      },4000);
    }else{
      
      this.bad = true;
      setTimeout(()=>{
        this.good = false;
      },4000);
    }
  }
  updateCat(){
    this.serv.updateCategory(this.cat.id , this.cat).subscribe(
      req =>{
        this.rout.navigate(['/categorias'])
      }
    )
  }


  
}
