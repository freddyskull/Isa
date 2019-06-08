import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { ProductService } from '../../services/product.service';
import * as jspdf from 'jspdf';   
import html2canvas from 'html2canvas'; 
@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})


export class ListProductComponent implements OnInit {
  @ViewChild('content') content: ElementRef;

  product: any = [];
  us:any = [];
  usfec:any = [];
  objetosBs:any = [];
  Usd: Number = 0;
  usdfecValor: Date;
  filter = "";
  title = "Productos";
  del: boolean = false;
  d = new Date(); // Por ejemplo 1
  n = this.getDia(this.d.getDay());
  categorys: any = []
  arrayExcel: any = []
  dateDay = new Date();
  position:string = "";
  permiss: number;
  constructor(private serv: ProductService) { }
  


  ngOnInit() {
    this.getProduct();
    this.converTo();
    this.getfecUSD()
    this.position = localStorage.getItem("position")
    this.getPermiss()
    this.getArrExcel()
    
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
        }
      )
    })
  }


  getPermiss(){
    this.serv.getPermiss().subscribe(
      req => {
       this.permiss = Object.values(req)[0].editperm
      }
    )
  }

  getfecUSD(){
    this.serv.getDolar().subscribe(
      req => {
        this.usfec = req;
        this.usdfecValor = (this.us._timestamp.fecha)
        return this.usdfecValor;
      },
      err => console.error(err)
    )
  }


  
  getProduct(){
    this.serv.getProducts().subscribe(
      res => {this.product = res}
    )
  }


  fecha(){
    var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
    var f=new Date();
    return (f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear())
  }



  delete (id: string){
    this.serv.deleteProduct(id).subscribe(
      req  => {
        this.del = true;
        this.getProduct()
      },
      err => console.error(err)
    )
    return false;
  }

  getDia(index){
    var dia = new Array(7);
    dia[0] = "Domingo";
    dia[1] = "Lunes";
    dia[2] = "Martes";
    dia[3] = "Miércoles";
    dia[4] = "Jueves";
    dia[5] = "Viernes";
    dia[6] = "Sábado";
  return dia[index];

}
  converTo(){  
    this.serv.getDolar().subscribe(
      req =>{
        this.us = req;
        this.Usd += this.us.USD.dolartoday;
      }
    )
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
