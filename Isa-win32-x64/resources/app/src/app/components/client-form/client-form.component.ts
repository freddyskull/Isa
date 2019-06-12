import { Component, OnInit } from '@angular/core';
import {  Router, ActivatedRoute } from '@angular/router';
import { client } from '../../models/client';
import { ProductService } from '../../services/product.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit {

  myControl = new FormControl();
  options: string[] = ['Amazonas', 'Anzoátegui	', 'Apure','Aragua','Barinas','Bolívar','Carabobo','Cojedes','Delta Amacuro','Distrito Capital','Falcón','Guárico','Lara','Mérida','Miranda','Monagas','Nueva Esparta','Portuguesa','Sucre','Táchira','Trujillo','Vargas','Yaracuy','Zulia'];
  filteredOptions: Observable<string[]>;

  constructor(private serve: ProductService,private rout: Router,private activdeR: ActivatedRoute) { }
  client: client = {
    id: 0,
    name: "",
    direccion: "",
    direccion2: "",
    tel: "",
    email: "",
    courrier: "",
    cedula: "",
    vendedor: ""
  }
edit:boolean = false;
good:boolean = false;
vend:any = [];
  ngOnInit() {
    
    const params = this.activdeR.snapshot.params;
    if(params.id){
      this.serve.getClient(params.id).subscribe(
        req => {
         this.client = req;
         this.edit = true;
        },
        err => console.error(err)
      )
    }
    

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.getVendedor()
  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }


  getVendedor(){
    this.serve.getUsers().subscribe(
      req => {
        this.vend = req;
      }
    )
  }
  
    save(){
      delete this.client.id;
      this.serve.saveclient(this.client).subscribe(
        req => {
          console.log(req)
           this.good = true;
          setTimeout(()=>{
            this.good = false;
          },4000);
          this.resetForm();
        },
        err => console.log(err)
      )
    }
  

  resetForm(){
    this.client.name ="";
    this.client.direccion ="";
    this.client.direccion2 = "";
    this.client.tel ="";
    this.client.email ="";
    this.client.courrier ="";
    this.client.cedula = "";
  }
  updateClient(){
    this.serve.updateclient(this.client.id, this.client).subscribe(
      req =>{
        this.rout.navigate(['/clientes'])
      },
      err => console.error(err)
    )
  }



}
