import { Component, OnInit, Input } from '@angular/core';
import { ExcelFormatsService } from '../../services/exportExcel/excel-formats.service'
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-export-excel',
  templateUrl: './export-excel.component.html',
  styleUrls: ['./export-excel.component.scss']
})
export class ExportExcelComponent implements OnInit {

  constructor(private excel: ExcelFormatsService) { }
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
    this.excel.exportToExcel(this.arrayExcel,'Lista de precios ' + this.fecha())
  }

}
