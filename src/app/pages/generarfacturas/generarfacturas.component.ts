import { Component, OnInit} from '@angular/core';
import { ProductService } from '../../services/product.service';
import { NgForm } from '@angular/forms';
import {MatDialog} from '@angular/material';
import { HistoryComponent } from '../../components/dialog/history/history.component';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';


export interface Food {
  value: string;
  viewValue: string;
}

export interface DialogData {
  description: string;
  name: string;
  optionHistory: boolean;
}

@Component({
  selector: 'app-generarfacturas',
  templateUrl: './generarfacturas.component.html',
  styleUrls: ['./generarfacturas.component.scss']
})
export class GenerarfacturasComponent implements OnInit {


  myControl = new FormControl();
  options: string[] = ['Amazonas', 'Anzoátegui	', 'Apure','Aragua','Barinas','Bolívar','Carabobo','Cojedes','Delta Amacuro','Distrito Capital','Falcón','Guárico','Lara','Mérida','Miranda','Monagas','Nueva Esparta','Portuguesa','Sucre','Táchira','Trujillo','Vargas','Yaracuy','Zulia'];
  filteredOptions: Observable<string[]>;

  constructor(private serv: ProductService,private dialog:MatDialog) { }
  userList:any = [];
  description: string = "";
  optionHistory: boolean = false;
  nombre:String ="";
  cedula:Number;
  contacto:number;
  factura:string ="";
  vendedor:String ="";
  observacion:string ="";
  direccion:string = "";
  direccion2:string = "";
  metodo:string = 'Bs';
  form:boolean = false;
  deposito:number = 0;
  transferencia:number = 0;
  efectivo:number = 0;
  cheque:string ="";
  clients:any = [];
  client:any = [];
  option:boolean = true;
  option2:boolean = false;
  optionChoose:number;
  chooseClient:string = "";
  name:string;
  tipoDV: boolean = false;
  finArr: any = [];
  totales: any = [];
  butons:boolean = false;
  origen:string = "IF-";
  condic:string = "";
  Pago:any =[
    {
      value:1,
      tipo:"Transferencia" 
    },
    {
      value:2,
      tipo:"Efectivo" 
    },
    {
      value:3,
      tipo:"Cheque" 
    },
    {
      value:4,
      tipo:"Deposito" 
    }
  ]
  cond:any =[
    {
      value: "DECONTADO",
      condicion: "Decontado"
    },
    {
      value: "CREDITO",
      condicion: "Credito"
    }
  ]
  

  ngOnInit() {
   this.getClient();
   this.name = localStorage.getItem("name");
   this.getUsers()
   this.filteredOptions = this.myControl.valueChanges.pipe(
    startWith(''),
    map(value => this._filter(value))
  );
  }



  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  
  }

  getUsers(){
    this.serv.getUsers().subscribe(
      req => {
        this.userList = req;
      }
    )
  }

  getArr(e){
    this.finArr = e;
    console.log(this.finArr)
  }
  getArr2(e){
    this.totales = e;
  }
  recAux(e){
    this.butons = true;
  }

  getClient(){
    this.serv.getClients().subscribe(
      req => {
        this.clients = req;
      }
    )
  }

recibir(formFactura:NgForm){
  if(formFactura.valid == true){
    console.log("generando comprobante");
  }else{
    console.log("error en el formulario");
    
  }
}

  getClienById(id){
    this.serv.getClient(id).subscribe(
      req => {
        this.nombre = Object.values(req)[1];
        this.cedula = Object.values(req)[7];
        this.direccion = Object.values(req)[2];
        this.direccion2 = Object.values(req)[3];
        this.contacto  = Object.values(req)[4];
        this.vendedor = Object.values(req)[8]
      }
    )
  }

  reset(){
  this.nombre = "";
  this.cedula = 0;
  this.contacto = 0;
  this.factura = "";
  this.vendedor = "";
  this.observacion ="";
  this.metodo = "";
  this.deposito = 0;
  this.transferencia = 0;
  this.efectivo = 0;
  this.cheque = "";
  this.direccion = "";
  this.direccion2 = "";
  this.option = true;
  this.butons = false;
  this.form = false;
  }

  openDialog(): void {
    var aux = this.optionHistory
    if(aux == false){
      const dialogRef = this.dialog.open(HistoryComponent, {
        data: {name: this.name, description: this.description, optionHistory: this.optionHistory}
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.description = result;
        console.log(this.description)
        if(result == undefined){
          this.optionHistory = false;
        }
      });
    }
  }
  
}
