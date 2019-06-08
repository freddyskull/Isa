import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-lisproduct-pre',
  templateUrl: './lisproduct-pre.component.html',
  styleUrls: ['./lisproduct-pre.component.scss']
})
export class LisproductPreComponent implements OnInit {

  constructor() { }
  @Input() show;
  @Input() pro;
  @Input() aux;
  @Input() productos;
  
  @Output() enviar = new EventEmitter<number>();
  
  
  presupuesto: any = []
  ngOnInit() {
    
  }
  filter = "";
  
  getPro(id:number){
    this.enviar.emit(id);
  }

}
