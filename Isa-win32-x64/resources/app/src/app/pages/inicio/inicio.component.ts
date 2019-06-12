import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  menuList: any = [
    {item:'Inicio',dir:'/inicio',icon:'<i class="fas fa-home" aria-hidden="true" style=""></i>'},
    {item:'Productos',dir:'/productos',icon:'<i class="fas fa-clipboard-list" aria-hidden="true" ></i>'},
    {item:'Clientes',dir:'/clientes',icon:''}
  ];

  constructor() { }

  ngOnInit() {
  }

}
