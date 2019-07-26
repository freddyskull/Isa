import { Component, OnInit, HostBinding } from '@angular/core';
import { product } from '../../models/productModel';
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
  Usd:number = 0;
  good: boolean = false;
  bad: boolean = false;
  edit: boolean = false;
  error: string = "";
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
    this.converTo()
  }
  
  saveProduct(form:NgForm){
    console.log(form)
      this.producto.getProducts().subscribe(
        req => {
          let ult = Object.keys(req).length
          for (let i = 0; i < ult; i++) {
            console.log(req[i].name)
            if(form.value.name == req[i].name ){
              this.error = 'El producto "'+ form.value.name + '" ya existe dentro de la base de datos'
              this.bad = true;
              setTimeout(()=>{
                this.bad = false;
                this.error = ''
              },8000);
            }
          }

          if(this.error == ""){
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
              this.error = 'Algunos campos requeridos siguen vacios'
              this.bad = true;
                  setTimeout(()=>{
                    this.bad = false;
                    this.error = ''
                  },8000);
            }
          } 



        }
      )
  }
  

  converTo(){  
    this.producto.getUsdValor().subscribe(
      req => {
        this.Usd = Object.values(req)[0].priceUSD
      }
    )
  }

  getCategory(){
    this.producto.getCategorys().subscribe(
      req =>{
        this.category = req;
      }
    )
  }

  escoger(){
    this.currency = 0
    this.resetForm()
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
