import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Users } from '../../../models/usersModel';
import { NgForm } from '@angular/forms';
import {  Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-add-empleados',
  templateUrl: './add-empleados.component.html',
  styleUrls: ['./add-empleados.component.scss']
})
export class AddEmpleadosComponent implements OnInit {

  constructor(private serv: ProductService,private rout: Router,private activdeR: ActivatedRoute) { }

  user:Users = {
    id: 0,
    userName: "",
    name: "",
    pass: "",
    position: "",
    access: 0,
    payMethod: "",
    tel: "",
    img: ""
  }

  privilegios:any = [
    { value:'jefe', name:'Jefe'},
    { value:'empleado', name:'Empleado'},
    { value:'vendedor', name:'Vendedor'}
  ]

  edit:boolean = false;
  ngOnInit() {
    const params = this.activdeR.snapshot.params;
    if(params.id){
      this.serv.getUser(params.id).subscribe(
        req => {
         this.user = req;
         this.edit = true;
        },
        err => console.error(err)
      )
    }
  }

  editEmple(id){
    this.serv.updateUser(id,this.user).subscribe(
      req => {
        console.log(req)
        this.rout.navigate(['/empleados'])
      }
    )
  }

  addEmpleado(form:NgForm){
    if(form.valid == true){
      delete this.user.id;
      if(this.user.position == "jefe"){
        this.user.access = 1;
      }
      if(this.user.position == "empleado"){
        this.user.access = 2;
      }
      if(this.user.position == "vendedor"){
        this.user.access = 3;
      }
      this.serv.saveUser(this.user).subscribe(
        req => {
          console.log(req);
          this.rout.navigate(['/empleados'])
        }  
      )
    }else{

    }
  }



}
