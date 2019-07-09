import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
  export class LoginFormComponent implements OnInit {
  
  
    constructor(private serv: ProductService, private route: Router, private snackBar: MatSnackBar) { }
    users: any = []
    name: string = "";
    pass: string = "";
    aux: boolean = false;
  ngOnInit() {
    this.getUser()
    this.reset()
  }


  getUser(){
    this.serv.getUsers().subscribe(
      req => { this.users = req },
      err => console.error(err)
    )
  }

  enviar(form:NgForm){
    if(form.valid == true){
      let ult = Object.keys(this.users).length
      for(let i = 0; i < ult; i++){
        if(this.name == this.users[i].userName && this.pass == this.users[i].pass){
          localStorage.setItem("username", form.value.username);
          localStorage.setItem("acceso", this.users[i].access);
          localStorage.setItem("position",this.users[i].position);
          localStorage.setItem("name",this.users[i].name);
          console.log(localStorage.getItem("acceso"));
          this.route.navigate(['/inicio'])
          this.reset()
        }else{
          this.aux = true;
          setTimeout(()=>{
            this.aux = false;
          },3000);
          
        }
      } 
    }else{
      this.snackBar.open('Formulario Vacio','', {
        duration: 3000,
      });
    }
  }
  reset(){
    this.name = "";
    this.pass = "";
  }
}
