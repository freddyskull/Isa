import { Component, OnInit, HostBinding } from '@angular/core';
import { product } from 'src/app/models/productModel';
import { ProductService } from '../../services/product.service'
import {  Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})

export class FormProductComponent implements OnInit {

  product: product = {
    id: 0,
    name: "",
    priceB: "",
    priceS: "",
    priceB$: "",
    priceS$: "",
    stock: "",
    recibo: "",
    create_at: new Date(),
    description: "",
    category: "",
    img: "",
    marca: "",
    iva: 0,
    fecven: "",
    marca2:"",
    pricePro: "",
  };

  constructor(private producto: ProductService, private rout: Router, private actR: ActivatedRoute) { }
  
  good: boolean = false;
  bad: boolean = false;
  edit: boolean = false ;
  compra:string ="";
  category:any = [];
  imagenSeleccionada: any;
  imagen:any;
  name:string;
  iva: boolean = false;
  currency: number = 0;
  user:string;
  acces:string ="";
  ngOnInit() {
    const params = this.actR.snapshot.params;
    if(params.id){
      this.producto.getProduct(params.id).subscribe(
        req => {
          this.product = req;
          this.edit = true;
        },
        err => console.error(err)
      )
    }
    this.getCategory();
    this.user = localStorage.getItem("name")
    this.acces = localStorage.getItem("position")
  }
  
  saveProduct(form:NgForm){
    if(form.valid == true){
      
      delete this.product.create_at;
      this.product.recibo = this.user;
      delete this.product.id;
      if(this.currency == 1){
        this.product.priceB$ = "";
        this.product.priceS$ = ""; 
      }else{
        this.product.priceB = "";
        this.product.priceS = "";
        this.iva = false;
      }
      
      this.producto.saveProduct(this.product).subscribe(
        req => {
          this.resetForm();
          this.good = true;
          setTimeout(()=>{
            this.good = false;
          },4000);
        },
        err => console.log(err)
      )
    }else{
      this.bad = true;
          setTimeout(()=>{
            this.bad = false;
          },8000);
    }
  }
  
  getCategory(){
    this.producto.getCategorys().subscribe(
      req =>{
        this.category = req;
      }
    )
  }


  nomCat(){
    this.producto.getCategory(this.product.category).subscribe(
      req => {
      return Object.values(req)[2]
      }
    )
  }
    resetForm(){
      this.product.name         = "";
      this.product.priceB       = "";
      this.product.priceS       = "";
      this.product.priceB$      = "";
      this.product.priceS$      = "";
      this.product.marca        = "";
      this.product.marca2       = "";
      this.product.fecven       = "";
      this.product.stock        = "";
      this.product.recibo       = "";
      this.product.description  = "";
      this.product.category     = "";
      this.product.pricePro     = "";
    }
  
}
