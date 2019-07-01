import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service'

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.scss']
})
export class EmpleadosComponent implements OnInit {

  constructor(private serv: ProductService) { }
  users: any = [];
  userName: string;
  filter:string = ""
  ngOnInit() {
    this.getP()
    this.getuserData()
  }

  getuserData(){
     this.userName = localStorage.getItem("username")
  }

  deleteEmp(id){
    this.serv.deleteUser(id).subscribe(
      req => {
        console.log(req);
        this.getP();
      }
    )
  }

  getP(){
    this.serv.getUsers().subscribe(
      req => {  
        this.users = req;
      }
    )
  }
}
