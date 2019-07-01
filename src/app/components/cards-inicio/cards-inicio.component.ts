import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import { ProductService } from '../../services/product.service';
import { priceUSD } from '../../models/priceUsdModel'
import { NgForm } from '@angular/forms';

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
  USD:number = 0;
  poc:boolean = false;
  usdfecValor: Date;
  BsTot = 0;
  UsdTot= 0;
  BsTotAnt = 0;
  UsdTotAnt= 0;
  permiss:any = {
    editperm: 0
   }
  priceUSD:priceUSD = {
    id: 0,
    priceUSD: null,
    userName: localStorage.getItem("name"),
    date: new Date()
  }
  position: string;
  conex:string = localStorage.getItem("conec");
  inputPermiss:boolean;
  userUSD: string ="";
  dateUSD: string = "";
  userName:string = "";
  user:any = [];
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
    this.getDatos()
    this.getTotAct()
    this.getTotAnt()
    this.userName = localStorage.getItem("name");
    this.serv.getUsdValor().subscribe(
      req => {
        this.USD = Object.values(req)[0].priceUSD
        this.userUSD = Object.values(req)[0].userName
        this.dateUSD = Object.values(req)[0].date
      }
    )
  }
//funcion para obtener el total del mes actual

getTotAct(){
  this.serv.getStatAct().subscribe(
    req => {
      var ult = Object.keys(req).length;
      for (let i = 0; i < ult; i++) {
        if(req[i].tipo == "Bs"){
          console.log(req[i].total)
          this.BsTot += req[i].total 
        }else{
          this.UsdTot += req[i].total 
        }
      }
    }
  )
}


getTotAnt(){
  this.serv.getStatAnt().subscribe(
    req => {
      var ult = Object.keys(req).length;
      for (let i = 0; i < ult; i++) {
        if(req[i].tipo == "Bs"){
          console.log(req[i].total)
          this.BsTotAnt += req[i].total 
        }else{
          this.UsdTotAnt += req[i].total 
        }
      }
    }
  )
}

//funcion que cambia el valor del dolar que luego será utilizado de manera global
  update(form:NgForm){
    if(form.valid == true && this.priceUSD.priceUSD > 0){
      this.serv.updateUsdValor(0,this.priceUSD).subscribe(
        req =>{ console.log(req)
          this.serv.getUsdValor().subscribe(
            req => {
              this.USD = Object.values(req)[0].priceUSD
              this.userUSD = Object.values(req)[0].userName
              this.dateUSD = Object.values(req)[0].date
            }
          )
        }
      )
      this.openSnackBar2()
    }
    this.priceUSD.priceUSD = null;
  }
//funcion que hace cambiar los permisos de edición a los empleados
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
//retorno de datos básico del empleado o vendedor
getDatos(){
  var j = 0;
  this.serv.getUsers().subscribe(
    req => {
     var ult = Object.keys(req).length;
      for (let i = 0; i < ult; i++) {
        if(this.userName == req[i].name){
          this.user[j] = req[i];
          j++;
        }
      }
    }
  )
}
//retorna los permisos de edición al almacén
  getPermiss(){
    this.serv.getPermiss().subscribe(
      req => {
        this.inputPermiss = Object.values(req)[0].editperm
      }
    )
  }
  //retorna la posición del empleado vendedor o jefe
  getProfile(){
    this.position  = localStorage.getItem("position");
  }
  //retorna la suma de todos los productos en el almacén
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
  //retorna total en bs
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
 //esta es la funcion que retorna los productos que tienen poca existencia en el almacén
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
  //funcion que obtiene el dolar de la página de dolar today
  getUSD(){
    this.serv.getDolar().subscribe(
      req => {
        this.us = req;
        return this.usdValor = (this.us.USD.dolartoday)
      },
      err => console.error(err)
    )
  }
  //esta retorna la fecha de la ultima actualizacion de ese valor del dolar
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
  //esta funcion da un total estimado de todos los productos que hay en existencia en el almacén
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


  openSnackBar2() {
    this.snackBar.open("El precio del dolar ha sido actualizado","Ok!", {
      duration: 2000,
    });
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
