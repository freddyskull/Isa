import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { product } from '../../models/productModel';
import * as jsPDF from 'jspdf';
import {  Router } from '@angular/router';
import html2canvas from 'html2canvas'; 

@Component({
  selector: 'app-presupuesto',
  templateUrl: './presupuesto.component.html',
  styleUrls: ['./presupuesto.component.scss']
})
export class PresupuestoComponent implements OnInit {
 
  constructor(private serv: ProductService, private rout:Router) { }

  product: product = {
    id: 0,
    name: "",
    priceB: "",
    priceS: "",
    stock: "",
    recibo: "",
    create_at: new Date(),
    description: "",
    category: "",
    img: ""
  };
  
  productos:any =[]
  pro:number = 0;
  pr:any = [];
  aux: boolean = false;
  aux2: boolean = false;
  aux3: boolean = false;
  usdValor: number = 0;
  total: number;
  stock:number;
  Id: number;
  err:boolean = false;
  err2:boolean = false;
  show:boolean = true;
  presu:any;
  pre:any = [];
  currency:string ="";
  variablesPresu:any = [];
  ngOnInit() {
    this.serv.getUsdValor().subscribe(
      req => {
        this.usdValor = Object.values(req)[0].priceUSD
      }
    )
    this.getProduct()
    this.obtener();
  }


  //obtener datos desde BD
  obtener(){
    this.pre = this.serv.getPresupuestos()
    console.log(this.pre)
  }
  getProduct(){
    this.serv.getProducts().subscribe(
      res => {
        let j = 0;
        let ult = Object.values(res).length;
        for(let i = 0; i < ult; i++){
          if(res[i].stock != 0){
            this.productos[j] = res[i]
            j++;
          }
        }
      },
      err => console.log(err)
    )
  }
  obtenerTotalIva(){
    var j = 0;
    var ult = Object.keys(this.serv.getPresupuestos()).length;
    for(let i = 0; i < ult; i++){
       if(this.serv.getPresupuestos()[i].iva == true){
        j += this.serv.getPresupuestos()[i].price * 0.16
        j += (this.serv.getPresupuestos()[i].price2 * this.usdValor) * 0.16
       }
    }
    return j;
  }
  obtenerTotalSinIva(){
    var j = 0;
    var ult = Object.keys(this.serv.getPresupuestos()).length;
    for(let i = 0; i < ult; i++){
      if(this.serv.getPresupuestos()[i].iva == null){
        j += this.serv.getPresupuestos()[i].price
       }
    }
    return j;
  }
  obtenertotalDol(){
    var j = 0;
    var ult = Object.keys(this.serv.getPresupuestos()).length;
    for(let i = 0; i < ult; i++){
      j += this.serv.getPresupuestos()[i].price2
    }
    return j;
  }
  obtenerTotal(){
    var j = 0;
    var ult = Object.keys(this.serv.getPresupuestos()).length;
    for(let i = 0; i < ult; i++){
      j += this.serv.getPresupuestos()[i].price; 
    }
    return j;
  }
  getUSD(){
    this.serv.getUsdValor().subscribe(
      req => {
        this.usdValor = Object.values(req)[0].priceUSD
      }
    )
  }

  //obtener datos desde componente hijo

  getPro(e){
    this.err = false;
    this.serv.getProduct(e).subscribe(
      req => {
        this.pr = req;
        this.stock = Object.values(req)[4]
        this.aux = true;
        this.show = false;
      }
    )
  }
  presupuest(e){
    this.variablesPresu = e;
    if(e.atention != "" && e.rifCed != "" && e.address != "" && e.tlf != "" && e.vendedor != "" && this.pre.length > 0){
      var data = document.getElementById('contentToConvert'); 
      var doc = new jsPDF()
      var logo = new Image();
      logo.src = './assets/img/LogoPDF.png';
      doc.addImage(logo, 'PNG', 5, 5, 200, 60)
      html2canvas(data).then(canvas => {  
        var imgWidth = 200;   
        var pageHeight = 295;    
        var imgHeight = canvas.height * imgWidth / canvas.width;  
        var heightLeft = imgHeight;  
        const contentDataURL = canvas.toDataURL('image/png')    
        doc.setFontSize(12)
        doc.text(15, 80, 'ATENCIÓN: ' + e.atention)
        doc.text(15, 85, 'RIF/ CI: ' + e.rifCed)
        doc.text(15, 90, 'DIRECCIÓN: ')
        doc.text(15, 95, '' + e.address)
        doc.text(135, 80, 'FECHA: ' + this.fecha())
        doc.text(135, 85, 'TLF: ' + e.tlf)
        doc.text(135, 90, 'VENDEDOR: ' + e.vendedor)

        doc.setFontType("bold")
        doc.text(90, 105,'COTIZACIÓN')
        doc.text(76, 110,'SOLICITUD DE COTIZACIÓN')
        doc.setFontType("normal")

        //tabla
        doc.addImage(contentDataURL, 'PNG', 15, 120, imgWidth, imgHeight)  
        
        doc.setFontType("bold")
        if(this.currency == 'Bs'){//este obviamente evalua si es en bolivares
          if(e.venta == true){ // este if evalua si la compra es al mayor o al detal
            doc.text(116, 235,'SUB-TOTAL BS.S ' + this.obtenerTotal().toLocaleString())
            doc.text(63, 240,' MONTO TOTAL BASE IMPONIBLE 16% BS.S ' + this.obtenerTotalIva().toLocaleString())
            doc.text(67, 245,'MONTO TOTAL EXONERADO DE IVA BS.S ' + this.obtenerTotalSinIva())
            doc.text(84, 250,'MONTO TOTAL I.V.A AL 16% BS.S ')
            var result = (this.obtenerTotal() + this.obtenerTotalIva()).toLocaleString()
            doc.text(90, 255,'MONTO TOTAL A PAGAR BS.S ' + result);
          }else{
            doc.text(116, 235,'SUB-TOTAL BS.S ' + (this.obtenerTotal() * 1.10).toLocaleString())
            doc.text(63, 240,' MONTO TOTAL BASE IMPONIBLE 16% BS.S ' + (this.obtenerTotalIva() * 1.10).toLocaleString())
            doc.text(67, 245,'MONTO TOTAL EXONERADO DE IVA BS.S ' + (this.obtenerTotalSinIva() * 1.10).toLocaleString())
            doc.text(84, 250,'MONTO TOTAL I.V.A AL 16% BS.S ')
            var resul = (this.obtenerTotal() + this.obtenerTotalIva())
            doc.text(90, 255,'MONTO TOTAL A PAGAR BS.S ' + (resul * 1.10).toLocaleString());
          }
        }else{
          if(e.venta == true){
            doc.text(90, 255,'MONTO TOTAL A PAGAR USD ' + this.obtenertotalDol().toFixed(2));
          }else{
            doc.text(90, 255,'MONTO TOTAL A PAGAR USD ' + (this.obtenertotalDol() * 1.10).toFixed(2));
          }
        }
        doc.text(30, 265,'EMAIL: insufarmaventas@gmail.com/ insufarmaordencompras@gmail.com')
        doc.text(37, 270,'CUENTAS BANCARIAS: DEPOSITO TRANSFERENCIAS O CHEQUES')
        doc.text(67, 275,'A NOMBRE DE: INSUFARMA FALCON, CA')
        doc.text(93, 280,'RIF: J - 411036129')
        doc.text(59, 285,'BANCO MERCANTIL: 0105 - 0104 - 11 1104169118')
        doc.text(76, 290,'BOD: 0116 - 0177 - 42 - 0028764030')
        doc.text(65, 295,'NOTA: COTIZACIÓN VALIDA SOLO POR HOY')

        doc.save(`Contización para ${e.atention} ${this.fecha()}.pdf`)
        this.rout.navigate(['/inicio'])
      });
    }
  }
  presuCurrency(e){
    this.currency = e;
  }
  chageShow(e){
    this.show = true;
    this.aux = false;
    this.pro = e;
    this.aux3 =true;
  }
  variables(e){
    this.presu = e
  }
//funciones adicionales
onIsError():void{
  this.err = true;
  setTimeout(()=>{
    this.err = false;
  },4000);
}

  fecha(){
    var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
    var f=new Date();
    return (f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear())
  }
}
