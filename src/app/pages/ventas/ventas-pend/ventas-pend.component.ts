import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { UpdatePendComponent } from '../../../components/dialog/update-pend/update-pend.component';
import {MatDialog} from '@angular/material';
export interface DialogData {
  description: string;
  name: string;
  optionHistory: boolean;
}

@Component({
  selector: 'app-ventas-pend',
  templateUrl: './ventas-pend.component.html',
  styleUrls: ['./ventas-pend.component.scss']
})
export class VentasPendComponent implements OnInit {

  constructor(private serv: ProductService,private dialog:MatDialog) { }
  description: string = "";
  pendientesUs:any = [];
  pendientesJe:any = [];
  pendientesToJe:number = 0;
  estado:boolean;
  position:string;
  name:string = "";
  us:any = [];
  Usd: Number = 0;
  order: string = 'name';
  reverse: boolean = false;
  filter:string = '';
  displayedColumns: string[] = [ 'name','stock','marca','fecven','create_at','recibo','priceB', 'priceB$'];
  dataSource:any =[];
  ngOnInit() {
    this.getporduc()
    this.getPendUs()
    this.getPendJe()
    this.position = localStorage.getItem("position");
    this.name = localStorage.getItem("name");
    this.converTo()
  }

  

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
    return false;
  }


  converTo(){  
    this.serv.getUsdValor().subscribe(
      req => {
        this.Usd = Object.values(req)[0].priceUSD
      }
    )
  }

  getPendJe(){
    this.serv.getPends().subscribe(
      req => {
        this.pendientesJe = req
       this.pendientesToJe = Object.keys(req).length
      }
    )
  }

  getporduc(){
    this.serv.getProducts().subscribe(
      req => {
        this.dataSource = req;
      }
    )
  }

  getPendUs(){
    this.serv.getPends().subscribe(
      req => {
        let j = 0;
        let ult = Object.keys(req).length
        for(let i = 0; i < ult; i++){
          if(this.name == req[i].encargado || this.name == req[i].vendedor){
            this.pendientesUs[j] = req[i]
            j++
          }
        }
      }
    )
  }


  updatePend(id,estado,origen){
    this.getPendUs()
    this.getPendJe()
    estado =! estado
    var pend = {
      estado: estado,
    }
    var pendd = {
      estado: estado,
      observa: this.description
    }
    
    //funcion que actualiza el estado de la venta pendiente
    this.serv.updatePend(id,pend).subscribe(
      req => {
        // funcion que busca el id del historial de venta para posteriormente actualizar
        this.serv.getHistorys().subscribe(
          req => {
            let IdH = 0;
            var ult = Object.keys(req).length
            for (let i = 0; i < ult; i++) {
              if(origen == req[i].origen){
                IdH = req[i].id
              }
            }
            // actualizando el estado del historial de ventas
            this.serv.updateHistory(IdH,pendd).subscribe(
              req => {
                console.log(req)
              }
            )
          }
        )
      }
    )
  }


  openDialog(id,estado,origen): void {
    const dialogRef = this.dialog.open(UpdatePendComponent, {
      data: {name: this.name, description: this.description}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.description = result;
      if(result == undefined){
        console.log("olvidalo wey");
        this.getPendUs()
        this.getPendJe()
      }else{
        this.updatePend(id,estado,origen)
        this.getPendUs()
        this.getPendJe()
      }
    });
  }
  

  delete(id){
    this.serv.deletePend(id).subscribe(
      req =>{
        console.log(req)
        this.getPendJe()
      }
    )
    return false;
  }

}
