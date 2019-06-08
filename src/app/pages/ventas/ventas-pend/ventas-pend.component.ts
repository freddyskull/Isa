import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { pend } from '../../../models/pendientesModel';

@Component({
  selector: 'app-ventas-pend',
  templateUrl: './ventas-pend.component.html',
  styleUrls: ['./ventas-pend.component.scss']
})
export class VentasPendComponent implements OnInit {

  constructor(private serv: ProductService) { }
    
  pendientesUs:any = [];
  pendientesJe:any = [];
  pendientesToJe:number = 0;
  estado:boolean;
  position:string;
  name:string = "";
  us:any = [];
  Usd: Number = 0;
  displayedColumns: string[] = [ 'name','stock','marca','fecven','create_at','recibo','priceB', 'priceB$'];
  dataSource:any =[];
  ngOnInit() {
    this.getporduc()
    this.getPendUs()
    this.getPendJe()
    this.position = localStorage.getItem("position");
    this.name = localStorage.getItem("name");
    console.log(this.name)
  }


  converTo(){  
    this.serv.getDolar().subscribe(
      req =>{
        this.us = req;
        this.Usd += this.us.USD.dolartoday;
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
          if(this.name == req[i].vendedor){
            this.pendientesUs[j] = req[i]
            j++
          }
        }
      }
    )
  }


  updatePend(id,estado){
    estado =! estado
    var pend = {
      estado: estado,
    }
    this.serv.updatePend(id,pend).subscribe(
      req => {
       
      }
    )
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
