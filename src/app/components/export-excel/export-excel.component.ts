import { Component, OnInit, Input } from '@angular/core';
import { ExcelFormatsService } from '../../services/exportExcel/excel-formats.service'
import {MatTableDataSource} from '@angular/material/table';
import { OrderPipe } from 'ngx-order-pipe';
@Component({
  selector: 'app-export-excel',
  templateUrl: './export-excel.component.html',
  styleUrls: ['./export-excel.component.scss']
})
export class ExportExcelComponent implements OnInit {

  constructor(private excel: ExcelFormatsService, private orderPipe: OrderPipe) { }
  @Input()arrayExcel;
  newArry:any=[];
  ngOnInit() {
    
  }


  
  fecha(){
    var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
    var f=new Date();
    return (f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear())
  }


  

  ExportToExcel(){
    this.newArry = this.orderPipe.transform(this.arrayExcel, 'Nombre');
    this.excel.exportToExcel(this.newArry,'Lista de precios ' + this.fecha())
  }

}
