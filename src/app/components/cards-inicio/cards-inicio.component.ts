import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-cards-inicio',
  templateUrl: './cards-inicio.component.html',
  styleUrls: ['./cards-inicio.component.scss']
})
export class CardsInicioComponent implements OnInit {

  objetos: any = [];
  objetosBs: any = []
  objetosExis: any = [];
  us: any = [];
  usfec: any = [];
  suma: number = 0;
  sumaBs: number = 0;
  usdValor: number = 0;
  poca: number = 0;
  Usd = 0;
  poc:boolean = false;
  usdfecValor: Date;
  permiss:any = {
    editperm: 0
   }
  position: string;
  conex:string = localStorage.getItem("conec");
  inputPermiss:boolean;
  constructor(private serv: ProductService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getTotalProduct();
    this.getUSD();
    this.getfecUSD();
    this.getExisProduct();
    this.getTotalBsProduct();
    this.TotalUsd();
    this.getProfile();
    this.getPermiss();
    this.serv.deleteAllPre();
  }

  updatePemiss(){
    if(this.inputPermiss == true){
      this.permiss = {
       editperm: 0
      }
    }else{
      this.permiss = {
        editperm: 1
      } 
    }
    this.openSnackBar(this.inputPermiss)
    this.serv.updatePermiss(1,this.permiss).subscribe(
      req => {
        console.log(this.permiss)
        console.log(this.inputPermiss)
      }
    )
  }


  getPermiss(){
    this.serv.getPermiss().subscribe(
      req => {
        this.inputPermiss = Object.values(req)[0].editperm
      }
    )
  }
  getProfile(){
    this.position  = localStorage.getItem("position");
  }

  getTotalProduct(){
    this.serv.getProducts().subscribe(
      req => {
  
        this.objetos = req;
        var ult =  Object.keys(this.objetos).length
        for (let i = 0; i < ult; i++){
          
          this.suma += this.objetos[i].stock
        }
        return this.suma;
      },
      err => console.error(err)
    )
  }
  getTotalBsProduct(){
    this.serv.getProducts().subscribe(
      req => {
        var ult =  Object.keys(req).length
        for(let i = 0; i < ult; i++){
         if(req[i].priceS != 0){
         this.sumaBs += req[i].priceS 
         }
        }
      },
      err => console.error(err)
    )
  }
 
  getExisProduct(){
    this.serv.getProducts().subscribe(
      req => {
        this.objetosExis = req;
        var ult =  Object.keys(this.objetosExis).length
        for (let i = 0; i < ult; i++){
          if(this.objetosExis[i].stock < 5){
            this.poca += + 1;
          }
          this.poc = true;
        }
        return this.poca;
      },
      err => console.error(err)
    )
  }
  getUSD(){
    this.serv.getDolar().subscribe(
      req => {
        this.us = req;
        return this.usdValor = (this.us.USD.dolartoday)
      },
      err => console.error(err)
    )
  }
  getfecUSD(){
    this.serv.getDolar().subscribe(
      req => {
        this.usfec = req;
        this.usdfecValor = (this.us._timestamp.fecha)
        return this.usdfecValor;
      },
      err => console.error(err)
    )
  }
  TotalUsd(){
    this.serv.getProducts().subscribe(
      req => {
        var ult =  Object.keys(req).length
        for(let i = 0; i < ult; i++){
         if(req[i].priceS == 0){
         this.Usd += req[i].priceS$ 
         }
        }
      },
      err => console.error(err)
    )
  }

  openSnackBar(permiss:boolean) {
    if(permiss == false){
      this.snackBar.open('Ahora la edición de inventario está encendida', 'Ok!', {
        duration: 2000,
      });
    }else{
      this.snackBar.open('la edición de inventario ha sido apagada', 'Ok!', {
        duration: 4000,
      });
    }
  }
    
}
