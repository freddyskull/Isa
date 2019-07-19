import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { ExcelFormatsService } from '../../services/exportExcel/excel-formats.service'
import { ProductService } from '../../services/product.service';
import * as jspdf from 'jspdf';   
import html2canvas from 'html2canvas'; 
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/dialog/confirm-dialog/confirm-dialog.component'
import {MatSnackBar} from '@angular/material/snack-bar';
import {ConvertBsPipe} from '../../pipes/bsPipes/convert-bs.pipe';
import { OrderPipe } from 'ngx-order-pipe';

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
  position: string = ""
  idCat:number;
  filter:string = '';
  excell:boolean = true;
  order: string = 'name';
  reverse: boolean = false;
  catName: string = ''
  pdf:boolean = true;
  aux:string = "2"
  permiss: number;
  constructor(private serv: ProductService,private excel: ExcelFormatsService, public dialog: MatDialog, private _snackBar: MatSnackBar, private orderPipe: OrderPipe) { }

  ngOnInit() {
    this.getCategory()
    this.GetUsd()
    this.position = localStorage.getItem("position")
    this.getPermiss()
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
    return false;
  }

  getPermiss(){
    this.serv.getPermiss().subscribe(
      req => {
       this.permiss = Object.values(req)[0].editperm
      }
    )
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

  deleteProduct (id: string){
    this.serv.deleteProduct(id).subscribe(
      req  => {
        this.getCat(this.idCat)
      },
      err => console.error(err)
    )
    return false;
  }

  GetUsd(){  
  this.serv.getUsdValor().subscribe(
    req => {
      this.Usd = Object.values(req)[0].priceUSD;
    })
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
  //funcion que transforma los valores para poderlos convertir a un array y volverlo a un formato excel
  getArrExcelBs(id){
    let Usd = 0
    this.serv.getUsdValor().subscribe(
       req =>{
              Usd = Object.values(req)[0].priceUSD;
     this.serv.getProducts().subscribe(
       res => {
        let j = 1;
        var ult = Object.keys(res).length
        for(let i = 0; i < ult; i++){
         if(res[i].priceS$ == 0 && id == res[i].category){
           this.arrayExcel[j] = { 
             Nombre:res[i].name,
             Cantidad:res[i].stock,
             PrecioBs:ConvertBsPipe.prototype.transform(res[i].priceS),
             FechaV:res[i].fecven,
             Marca:res[i].marca,
           }
         }if(res[i].priceS$ > 0 && id == res[i].category){
           this.arrayExcel[j] = { 
             Nombre:res[i].name,
             Cantidad:res[i].stock,
             PrecioBs:ConvertBsPipe.prototype.transform(res[i].priceS$ * Usd),
             FechaV:res[i].fecven,
             Marca:res[i].marca,
             }
           }
           if(id == res[i].category){
            j++ 
           }
         }
         this.ExportToExcel()
         }
       )
     })
   }

   getArrExcel(id){
    let Usd = 0
    this.serv.getUsdValor().subscribe(
      req =>{
             Usd = Object.values(req)[0].priceUSD;
     this.serv.getProducts().subscribe(
       res => {
        let j = 1;
        var ult = Object.keys(res).length
        for(let i = 0; i < ult; i++){
         if(res[i].priceS$ == 0 && id == res[i].category){
           this.arrayExcel[j] = { 
             Nombre:res[i].name,
             Cantidad:res[i].stock,
             PrecioBs:Math.round(res[i].priceS),
             PrecioUSD:(res[i].priceS / Usd).toFixed(2),
             FechaV:res[i].fecven,
             Marca:res[i].marca,
           }
         }if(res[i].priceS$ > 0 && id == res[i].category){
           this.arrayExcel[j] = { 
             Nombre:res[i].name,
             Cantidad:res[i].stock,
             PrecioBs:(res[i].priceS$ * Usd),
             PrecioUSD:res[i].priceS$.toFixed(2),
             FechaV:res[i].fecven,
             Marca:res[i].marca,
             }
           }
           if(id == res[i].category){
            j++ 
           }
         }
         this.ExportToExcel()
         }
       )
     })
   }

   getArrExcelUsd(id){
    let Usd = 0
    this.serv.getUsdValor().subscribe(
      req =>{
             Usd = Object.values(req)[0].priceUSD;
     this.serv.getProducts().subscribe(
       res => {
        let j = 1;
        var ult = Object.keys(res).length
        for(let i = 0; i < ult; i++){
         if(res[i].priceS$ == 0 && id == res[i].category){
           this.arrayExcel[j] = { 
             Nombre:res[i].name,
             Cantidad:res[i].stock,
             PrecioUSD:(res[i].priceS / Usd).toFixed(2),
             FechaV:res[i].fecven,
             Marca:res[i].marca,
           }
         }if(res[i].priceS$ > 0 && id == res[i].category){
           this.arrayExcel[j] = { 
             Nombre:res[i].name,
             Cantidad:res[i].stock,
             PrecioUSD:res[i].priceS$.toFixed(2),
             FechaV:res[i].fecven,
             Marca:res[i].marca,
             }
           }
           if(id == res[i].category){
            j++ 
           }
         }
         this.ExportToExcel()
         }
       )
     })
   }
  
   ExportToExcel(){
    var newJson = this.orderPipe.transform(this.arrayExcel, 'Nombre')
    console.log(newJson)
    this.excel.exportToExcel(newJson,'Lista de precios ' + this.fecha() + ' categoria ' + this.catName)
  }
  public captureScreen(option:string) {  
    this.aux = option
    setTimeout(()=>{
      var data = document.getElementById('contentToConvert');  
      html2canvas(data).then(canvas => {  
        // Few necessary setting options  
        var imgWidth = 150;   
        var pageHeight = 295;    
        var imgHeight = canvas.height * imgWidth / canvas.width;  
        var heightLeft = imgHeight;  
        const contentDataURL = canvas.toDataURL('image/png')  
        let doc = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
        var logo = new Image();
        logo.src = './assets/img/LogoPDF.png';
        doc.addImage(logo, 'PNG', 10, 10, 40, 20)
        doc.setFontSize(12)
        doc.addImage(contentDataURL, 'PNG', 30, 35, imgWidth, imgHeight)  
        doc.save(`Lista de precios dia ${this.fecha()} categoria ${this.catName}.pdf`); // Generated PDF   
      }); 
    },2000); 
  }  


  openDialog(id): void {
    let name = localStorage.getItem('name')
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {name: `Hola ${name}` }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if(result == false){
        this.deleteProduct(id)
        this.openSnackBar('El producto fué eliminado satisfactoriamente', 'Entendido')
      }else{
        this.openSnackBar('El producto no será borrado', 'Ok')
      }
    });
  }


  openDialogCat(id): void {
    let name = localStorage.getItem('name')
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {name: `Hola ${name}` }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if(result == false){
        this.deleteCat(id)
        this.openSnackBar('La categoria fué eliminada satisfactoriamente', 'Entendido')
      }else{
        this.openSnackBar('La categoria no será borrado', 'Ok')
      }
    });
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }
}
