import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  constructor(private actived: ActivatedRoute, private rout: Router,private serv: ProductService, private location: Location) { }


  category:any = [];
  name:string ="";
  product:any = [];
  cat:string = "";
  ngOnInit() {
    const params = this.actived.snapshot.params;
    if(params.id){
      this.serv.getProduct(params.id).subscribe(
        req => {
         this.product = req
         
          this.serv.getCategory(Object.values(req)[10]).subscribe(
            req => {
              this.cat = Object.values(req)[1];
            }
          )
        },
        err => console.error(err)
      )
    }
    console.log()
    this.getcategory()
    this.name = localStorage.getItem("name")
   
  }
  updateProduct(form){
      this.product.recibo    = this.name;
      this.product.create_at = new Date();
      if(this.product.iva == false){
        this.product.iva = 0;
      }else{
        this.product.iva = 1;
      }
      this.serv.updateProduct(this.product.id, this.product).subscribe(
        req =>{
          this.location.back();
        },
        err => console.error(err)
      )
  }


  getcategory(){
    this.serv.getCategorys().subscribe(
      req => {
        this.category = req;
      }
    )
  }

}
