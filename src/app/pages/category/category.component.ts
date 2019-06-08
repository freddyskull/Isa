import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';

import { ProductService } from '../../services/product.service';
import * as jspdf from 'jspdf';   
import html2canvas from 'html2canvas'; 

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  @ViewChild('content') content: ElementRef;
  search: any = [];
  search2: any = [];
  cat: any = [];
  categorias:boolean = true;
  busqueda:boolean = false;
  Usd: number = 0;
  us:any = [];
  arrayExcel: any = []
  constructor(private serv: ProductService) { }

  ngOnInit() {
    this.getCategory()
    this.GetUsd()
    this.getArrExcel()
  }

  fecha(){
    var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
    var f=new Date();
    return (f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear())
  }

  getCategory(){
    this.serv.getCategorys().subscribe(
      req => {
        this.cat = req;
      }
    )
  }
  deleteCat(id){
    this.serv.deleteCategory(id).subscribe(
      req => {
      console.log(req)
      this.getCategory()
      }
    )
  }
  GetUsd(){  
    this.serv.getDolar().subscribe(
      req =>{
        this.us = req;
        this.Usd += this.us.USD.dolartoday;
      }
    )
  }
  getCat(id){
    this.search = []
    this.categorias = false;
    this.busqueda = true;
    this.serv.getProducts().subscribe(
      req => { 
        let j = 0;
        let ult = Object.keys(req).length;
        for(let i = 0; i < ult; i++){
          if(id == req[i].category ){
            this.search[j] = req[i]
            j++
            }
          }
       }
    )
  }
  
  getArrExcel(){
    let Usd = 0
     this.serv.getDolar().subscribe(
       req =>{
         this.us = req;
         Usd += this.us.USD.dolartoday;
     this.serv.getProducts().subscribe(
       res => {
        let j = 0;
        var ult = Object.keys(res).length
        for(let i = 0; i < ult; i++){
         if(res[i].priceS$ == 0){
           this.arrayExcel[j] = { 
             Nombre:res[i].name,
             Cantidad:res[i].stock,
             PrecioBs:res[i].priceS.toLocaleString(),
             PrecioUSD:(res[i].priceS / Usd).toFixed(2),
             Promoción:res[i].pricePro,
             FechaV:res[i].fecven,
             Marca:res[i].marca,
             Procedencia:res[i].marca2
           }
         }else{
           this.arrayExcel[j] = { 
             Nombre:res[i].name,
             Cantidad:res[i].stock,
             PrecioBs:(res[i].priceS$ * Usd).toLocaleString(),
             PrecioUSD:res[i].priceS$.toFixed(2),
             Promoción:res[i].pricePro,
             FechaV:res[i].fecven,
             Marca:res[i].marca,
             Procedencia:res[i].marca2
             }
           }
           j++
         }
         console.log(this.arrayExcel)
         }
       )
     })
   }
  

  public captureScreen()  
  {  
    var data = document.getElementById('contentToConvert');  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 220;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
      const contentDataURL = canvas.toDataURL('image/png')  
      let doc = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      var logo = new Image();
      logo.src = './assets/img/LogoPDF.png';
      doc.addImage(logo, 'PNG', 10, 10, 40, 20)
      doc.setFontSize(12)
      doc.text(`Inventario del dia: ${this.fecha()}` , 74, 28)  
      doc.addImage(contentDataURL, 'PNG', 5, 32, imgWidth, imgHeight)  
      doc.save(`Lista de precios dia ${this.fecha()}.pdf`); // Generated PDF   
    });  
  }  

}
