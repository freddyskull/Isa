import { Component, OnInit, Input, ViewChild, ElementRef ,Output, EventEmitter } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { presupuesto } from 'src/app/models/presupuestoModel';
import { product } from 'src/app/models/productModel';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-add-pre',
  templateUrl: './add-pre.component.html',
  styleUrls: ['./add-pre.component.scss']
})
export class AddPreComponent implements OnInit {
  @ViewChild('content') content: ElementRef;
  constructor(private serv: ProductService,private rout: Router) { }


  @Input() aux3;
  @Output() presu = new EventEmitter<string>();
  @Output() presuArr = new EventEmitter<any>();
  product:product = {
    id: 0,
    name: "",
    priceB: "",
    priceS: "",
    stock: "",
    recibo: "",
    create_at: new Date(),
    description: "",
    category: "",
    img: ""
  }
  pre:any = [];
  us:any = [];
  pro: any = [];
  nom:string = "";
  op:number;
  usdValor:number = 0;
  restar: any = [];
  userList:any = [];
  currency:string ="";
  option:boolean = true;
  optionChoose:number;
  clients:any = [];
  //variables de presupuestos
  variables:any =[{
  atention: "",
  rifCed: "",
  address: "",
  tlf:"",
  vendedor:"",
  venta: false,
  }]
  ngOnInit() {
    this.obtenerTotal();
    this.getUSD();
    this.obtener();
    this.getPro();
    this.getUsers();
    this.getClient();
  }


//funciones output
  back(currency){
    this.presu.emit(currency)
  }

  presupuest(){
    this.presuArr.emit(this.variables)
  }
//funciones de obtención

  getClient(){
    this.serv.getClients().subscribe(
      req => {
        this.clients = req;
      }
    )
  }

  obtener(){
    this.pre = this.serv.getPresupuestos()
  }

  getUSD(){
    this.serv.getDolar().subscribe(
      req => {
        this.us = req;
        this.usdValor = this.us.USD.dolartoday
      },
      err => console.error(err)
    )
  }
  
  getUsers(){
    this.serv.getUsers().subscribe(
      req => {
        this.userList = req;
      }
    )
  }
  getPro(){
    this.serv.getProducts().subscribe(
      req => {
         this.pro = req;
      }
    )
  }
//funciones de totales estas retornan el array que se muestra en la factura, ya calculadas

  obtenertotalDol(){
    var j = 0;
    var ult = Object.keys(this.serv.getPresupuestos()).length;
    for(let i = 0; i < ult; i++){
      j += this.serv.getPresupuestos()[i].price2
    }
    return j;
  }
  obtenerTotal(){
    var j = 0;
    var ult = Object.keys(this.serv.getPresupuestos()).length;
    for(let i = 0; i < ult; i++){
      j += this.serv.getPresupuestos()[i].price; 
    }
    return j;
  }

  //funciones adicionales

  delete(pre: presupuesto){
    this.serv.deletePre(pre);
  }
  getClienById(id){
    this.serv.getClient(id).subscribe(
      req => {
        this.variables.atention = Object.values(req)[1];
        this.variables.rifCed   = Object.values(req)[7];
        this.variables.address  = Object.values(req)[2];
        this.variables.tlf      = Object.values(req)[4];
        this.variables.vendedor = Object.values(req)[8]
      }
    )
  }
}
