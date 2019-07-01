import { Component, OnInit, Input, ViewChild, ElementRef ,Output, EventEmitter } from '@angular/core';
import { ExcelFormatsService } from '../../../services/exportExcel/excel-formats.service';
import { ProductService } from '../../../services/product.service';
import { presupuesto } from '../../../models/presupuestoModel';
import { product } from '../../../models/productModel';
import {  Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../components/dialog/confirm-dialog/confirm-dialog.component';
import { UpdatePreComponent } from '../../../components/dialog/update-presupuest-product/update-pre/update-pre.component';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-pre',
  templateUrl: './add-pre.component.html',
  styleUrls: ['./add-pre.component.scss']
})
export class AddPreComponent implements OnInit {
  @ViewChild('content') content: ElementRef;
  constructor(private serv: ProductService,private rout: Router,private excel: ExcelFormatsService, public dialog: MatDialog, private _snackBar: MatSnackBar) { }


  @Input() aux3;
  @Output() presu = new EventEmitter<string>();
  @Output() presuArr = new EventEmitter<any>();
  @Output() facturar = new EventEmitter<any>();
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
  address2: "",
  tlf:"",
  vendedor:"",
  venta: false,
  }];
  arryExcel:any = [];
  aux:boolean = true;
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

  variblesEnviar(){
    this.presuArr.emit(this.variables)
    console.log('varibles enviadas')
  }

  presupuest(Arr){
    //evalua si la variable atention no está vacia
    if(this.variables.atention == undefined){
    }else{
      //evalua si el array de productos es mayor a 16 productos para exportarlo como una tabla excel
      if(Arr > 22){
        this.excel.exportToExcel(this.trasnfrmArry(),'Presupuesto para  '+ this.variables.atention + ' en '+ this.currency + ' '+this.fecha())
      }else{
        this.facturar.emit()
      }
    }
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
    this.serv.getUsdValor().subscribe(
      req => {
        this.usdValor = Object.values(req)[0].priceUSD
      }
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
        this.variables.address2  = Object.values(req)[2];
        this.variables.tlf      = Object.values(req)[4];
        this.variables.vendedor = Object.values(req)[8]
      }
    )
  }
  fecha(){
    var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
    var f=new Date();
    return (f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear())
  }

  trasnfrmArry(){
      var j = 0;
      var iva = "";
      var arryExcel = []
      var req = this.serv.getPresupuestos()
      var ult = Object.keys(this.serv.getPresupuestos()).length;
      for(let i = 0; i < ult; i++){
        if(this.currency == 'Bs'){
           if(this.variables.venta == false || this.variables.venta == undefined){
              arryExcel[j] = {
              cantidad:req[i].stock,
              nombre:req[i].name,
              precioUnd:(req[i].price3 * 1.10).toLocaleString(),
              total:(req[i].price * 1.10).toLocaleString(),
              iva:req[i].iva
            }
           }else{ 
              arryExcel[j] = {
              cantidad:req[i].stock,
              nombre:req[i].name,
              precioUnd:req[i].price3.toLocaleString(),
              total:req[i].price.toLocaleString(),
              iva:req[i].iva
            }
          }
        }else{
          if(this.variables.venta == false || this.variables.venta == undefined){
              arryExcel[j] = {
              cantidad:req[i].stock,
              nombre:req[i].name,
              precioUnd:(req[i].price4 * 1.10).toFixed(2),
              total:(req[i].price2 * 1.10).toFixed(2),
            }
          }else{
              arryExcel[j] = {
              cantidad:req[i].stock,
              nombre:req[i].name,
              precioUnd:req[i].price4.toFixed(2),
              total:req[i].price2.toFixed(2),
            }
          }
        }
        j++;
      }
      return arryExcel
  }



  editStock(id, cant, item) {
      const dialogRef = this.dialog.open(UpdatePreComponent, {
        width: '550px',
        data: {id: id , cant: cant, item:item}
      });
  
      dialogRef.afterClosed().subscribe(result => {
         console.log(result);
      });
      return false
  }


  openDialog(id): void {
    let name = localStorage.getItem('name')
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {name: `Hola ${name}` }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if(result == false){
        this.delete(id)
        this.openSnackBar('El producto fué eliminado del presupuesto', 'Entendido')
      }else{
        this.openSnackBar('El producto no será borrado', 'Ok')
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }

}
