import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-menu-inicio',
  templateUrl: './menu-inicio.component.html',
  styleUrls: ['./menu-inicio.component.scss']
})
export class MenuInicioComponent implements OnInit {

  constructor(private serv: ProductService) { }

  name: string;
  access: string;
  position: string;
  pendUs:number = 0;
  pendJe:number = 0;
  UsName:string = ""
  ngOnInit() {
    this.getData()
    this.getPendUs()
    this.getPendJe()
  }

  getData(){
    this.name     = localStorage.getItem("username");
    let access    = localStorage.getItem("acceso");
    this.position = localStorage.getItem("position");
    this.UsName     = localStorage.getItem("name");
  }


  Close(){
    localStorage.removeItem("username");
    localStorage.removeItem("acceso");
    localStorage.removeItem("position")
  }

  getPendUs(){
    this.serv.getPends().subscribe(
      req => {
        let ult = Object.keys(req).length;
        for(let i = 0; i < ult; i++){
          if(this.UsName == req[i].vendedor){
            this.pendUs +=  i + 1
          }
        }
      }
    )
  }
  getPendJe(){
    this.serv.getPends().subscribe(
      req => {
        this.pendJe = Object.keys(req).length
      }
    )
  }

}
