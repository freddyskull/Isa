import { Component, OnInit, Input, } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
@Component({
  selector: 'app-navigate2',
  templateUrl: './navigate2.component.html',
  styleUrls: ['./navigate2.component.scss']
})
export class Navigate2Component implements OnInit {

  constructor(private rout: Router,private serv:ProductService) { }
  name:string;
  notifications: number = 0;
  edit:boolean = false;
  access:string = "";
  ngOnInit() {
    this.getName();
    this.getEditionPermiss()
    this.access = localStorage.getItem("position")
  }

  getName(){
    this.name = localStorage.getItem("name");
  }

  getEditionPermiss(){
    this.serv.getPermiss().subscribe(
      req => {
        if(Object.values(req)[0].editperm == 1){
          this.edit = true;
          this.notifications ++ 
        }
      }
    )
  }

  Cerrar(){
    localStorage.removeItem("name");
    localStorage.removeItem("username");
    localStorage.removeItem("position");
    localStorage.removeItem("acceso");
    this.rout.navigate(['/'])
  }
}
