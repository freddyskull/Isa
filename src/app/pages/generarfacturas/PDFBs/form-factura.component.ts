import { Component, OnInit, Input,ViewChild, ElementRef } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { product } from '../../../models/productModel';
import { history } from '../../../models/historyModel';
import { pend } from '../../../models/pendientesModel';
import * as jsPDF from 'jspdf'; 
import html2canvas from 'html2canvas'; 
import {  Router } from '@angular/router';

@Component({
  selector: 'app-factura',
  templateUrl: './form-factura.component.html',
  styleUrls: ['./form-factura.component.scss']
})
export class FormFacturaComponent implements OnInit {
  restarAAlmacen: any;
  userName:string = "";
  constructor(private serv: ProductService, private rout: Router) { }

  ngOnInit() {
  this.getPro()
  this.obtener()
  this.userName = localStorage.getItem("username")
  this.UserNom  = localStorage.getItem("name");
  }


  pendientes:pend = {
    id: 0,
    vendedor: "",
    comprador: "",
    total: 0,
    total$: 0,
    fecha: new Date(),
    estado:false,
    observa: "",
    tipo: "",
    encargado: ""
  }

  product:product = {
    id: 0,
    name: "",
    priceB: "",
    priceS: "",
    priceB$: "",
    priceS$: "",
    stock: "",
    recibo: "",
    create_at: new Date(),
    description: "",
    category: "",
    img: "",
    marca: "",
    iva: null, 
  }


  history:history = { 
    id: 0,
    nameVend: "",
    total: 0,
    date: "",
    compraD: "",
    estado: "",
    observa: "",
    origen: 0,
    tipo: "",
    totIva: 0,
    tipoFac: "",
    userName: "",
    numFac: ""
  }

  @ViewChild('content') content: ElementRef;
  @Input()name;
  @Input()nombre;
  @Input()cedula;
  @Input()contacto;
  @Input()factura;
  @Input()vendedor;
  @Input()observacion;
  @Input()metodo;
  @Input()deposito;
  @Input()transferencia;
  @Input()efectivo;
  @Input()cheque;
  @Input()finArr;
  @Input()totales;
  @Input()direccion;
  @Input()direccion2;
  @Input()tipoDV;
  @Input()origen;
  @Input()optionHistory;
  @Input()description;
  @Input()optionChoose;
  @Input()condic;
  errorForm: boolean = false;
  option: boolean = true;
  optionAux: number;
  restar: any = [];
  pro:any = [];
  pre:any = [];
  subTotal:any;
  montoIv:any;
  montoEx:any;
  montoTo:any;
  UserNom:string = "";
  
  fecha(){
    var meses = new Array ("ENERO","FEBRERO","MARZO","ABRIL","MAYO","JUNIO","JULIO","AGOSTO","SEPTIEMBRE","OCTUBRE","NOVIEMBRE","DICIEMBRE");
    var f=new Date();
    return (f.getDate() + " DE " + meses[f.getMonth()] + " DEL " + f.getFullYear())
  }
  
  getPro(){
    this.serv.getProducts().subscribe(
      req => {
         this.pro = req;
      }
    )
  }
  obtener(){
    this.pre = this.serv.getPresupuestos()
  }

  updateProduct(){
    var y = 0;
    var ult = Object.keys(this.pro).length// declarando la variable que dice cuantos objetos tengo en la tabla productos
      for(let i = 0; i < this.pre.length; i++){// haciendo el primer for que contara ell presupuesto
        for(let j = 0; j < ult; j++ ){//haciendo el segundo for que contara los productos
          if( this.pre[i].id == this.pro[j].id){//haciendo una condicional que hace que cuando un producto se igual en id
             this.restar[y] = this.pro[j].stock - this.pre[i].stock//resta la cantidad del producto con la cantidad del presupuesto
             this.product = {
              stock: this.restar[y],
            }
             this.serv.updateProduct(this.pre[i].id,this.product).subscribe(//actualiza la tabla
               req => {console.log(req)}
             )
             y++
          }
        }
      }
  }
  saveHistory(){
      delete this.history.id;
      this.history.nameVend = this.vendedor;
      this.history.compraD  = this.nombre;
      this.history.tipo     = this.metodo;
      var fecha = this.fecha()
      this.history.date       = fecha;
      this.history.origen     = this.origen;
      this.history.observa    = this.observacion;
      if(this.optionHistory == true){
      this.history.estado       = "Pendiente" ;
      }else{
        this.history.estado     = "Pagado" ;
      }
      this.history.userName   = this.userName;
      this.history.numFac     = this.factura;
      if(this.optionChoose == 1){
        this.history.tipoFac   = "Facturación";
      }else{
        this.history.tipoFac    = "Nota de entrega";
      }
      if(this.tipoDV == false){
        var montIv = this.montoIv *1.10;
        let res = (this.montoTo * 1.10);
        this.history.totIva     = montIv 
        this.history.total      = res;
      }else{
        this.history.totIva     = this.montoIv;
        this.history.total      = this.montoTo
      }
    
    this.serv.saveHistory(this.history).subscribe(
      req => {
        console.log(req)
      }
    )
  }           
  
  obtenerTotales(){
    this.subTotal = Object.values(this.totales)[0];
    this.montoIv  = Object.values(this.totales)[1];
    this.montoEx  = Object.values(this.totales)[2];
    this.montoTo  = Object.values(this.totales)[3];
  }



  savePend(){
    if(this.optionHistory == true){
      delete this.pendientes.id;
      this.pendientes.vendedor  = this.vendedor;
      this.pendientes.comprador = this.nombre;
      this.pendientes.estado    = true;
      this.pendientes.observa   = this.description;
      this.pendientes.encargado = this.UserNom;
      if(this.optionChoose = 1){
        this.pendientes.tipo      = "Facturación"
      }else{
        this.pendientes.tipo      = "Nota de entrega"
      }
      if(this.metodo == 'Bs'){
        if(this.tipoDV == true){
          this.pendientes.total = this.montoTo;
        }else{
          this.pendientes.total = this.montoTo * 1.10
        }
      }else{
        if(this.tipoDV == false){
          this.pendientes.total$ = this.montoTo;
        }else{
          this.pendientes.total$ = this.montoTo * 1.10
        }
      }
      this.serv.savePend(this.pendientes).subscribe(
        req => {
          console.log(req)
        }
      )
    }
  }

  captureScreen(){
    if(this.nombre == "" || this.totales == "" || this.metodo == ""  || this.cedula == "" || this.factura == "" || this.direccion == "" || this.vendedor == "" || this.origen=="IF-" || this.condic == ""){
      this.errorForm = true;
          setTimeout(()=>{
            this.errorForm = false;
        },3000);
    }else{
     this.updateProduct()
     this.obtenerTotales()
     this.saveHistory()
     this.savePend()
     this.serv.deleteAllPre();
     let doc = new jsPDF(); // A4 size page of PDF
     var logo = new Image();
     logo.src = './assets/img/facturacion.png';
     doc.addImage(logo, 'PNG', 5, 5, 100, 20);
     var data = document.getElementById('contentToConvert');  
     html2canvas(data).then(canvas => {  
     // Few necessary setting options  
     var imgWidth = 190;   
     var pageHeight = 295;    
     var imgHeight = canvas.height * imgWidth / canvas.width;  
     var heightLeft = imgHeight;  
     const contentDataURL = canvas.toDataURL('image/png')  
     doc.setFontSize(10)
     doc.text(140, 10, 'FORMA LIBRE SERIE "A"')
     doc.setFontSize(15)
     doc.text(130, 20, `FACTURA NRO ${this.factura}`)
     doc.setFontSize(5)
     doc.setFontSize(5)
     doc.text(5, 30, 'VENTA DE INSUMOS MEDICOS CALLE GONZALEZ CC SAN MIGUEL NIVEL PLANTA BAJA LOCAL N,01 SECTOR')
     doc.text(5, 32, 'PANTANO ABAJO SANTA ANA DE CORO FALCON ZONA POSTAL 4101 TELF 0412 661.58.59')
     doc.text(145, 30, 'FECHA Y LUGAR DE EMISION    DIA MES AÑO')
     doc.text(145, 35, 'SANTA ANA DE CORO')
     doc.setFontSize(5)
     doc.text(172, 35, this.fecha())
     doc.setFontSize(10)
     doc.text(5, 45, `NOMBRE O RAZÓN SOCIAL:`)
     doc.text(145, 45, `RIF/C.I ${this.cedula}`)
     doc.text(5, 52, this.nombre)
     doc.text(145, 52, 'J-08500744-0')
     doc.setFontSize(8)
     doc.text(5, 59, `DIRECCIÓN FISCAL:`)
     doc.text(5, 62, `${this.direccion}`)
     doc.text(145, 59, `NRO. DE CONTACT ${this.contacto}`)
     doc.setFontType("bold");
     doc.text(5, 70, 'VENDEDOR:')
     doc.setFontType("normal")
     doc.text(25, 70, this.vendedor)
     doc.text(145, 70, 'CONDICIONES DE PAGO: ' + this.condic)
     //tabla en html2 canvas
     doc.addImage(contentDataURL, 'PNG', 5, 75, imgWidth, imgHeight)  
     //cierre de tabla
     if(this.metodo == 'Bs'){//este obviamente evalua si es en bolivares
       if(this.tipoDV == true){ // este if evalua si la compra es al mayor o al detal
       doc.text(120, 170,`SUB-TOTAL BS. S: ${this.subTotal.toLocaleString()}`)
       doc.text(120, 180,`MONTO TOTAL BASE IMPONIBLE AL 16% BS.S ${this.montoIv.toLocaleString()}`)
       doc.text(120, 190,`MONTO TOTAL EXONERADO O EXENTO DE IVA BS.S ${this.montoEx.toLocaleString()}`)
       doc.text(120, 200,`MONTO TOTAL DE I.V.A AL 16 % BS.S `)
       doc.setFontType("bold");
       doc.setFontSize(10)
       doc.text(120, 210,`MONTO TOTAL A PAGAR BS.S: ${this.montoTo.toLocaleString()}`)
       }else{// si la venta es al detal solo se le aumenta el 10%
       var res5 = this.subTotal * 1.10
       doc.text(120, 170,`SUB-TOTAL BS. S: ${res5.toLocaleString()}`)
       var res4 = this.montoIv * 1.10
       doc.text(120, 180,`MONTO TOTAL BASE IMPONIBLE AL 16% BS.S ${res4.toLocaleString()}`)
       var res3 = this.montoEx * 1.10
       doc.text(120, 190,`MONTO TOTAL EXONERADO O EXENTO DE IVA BS.S ${res3.toLocaleString()}`)
       doc.text(120, 200,`MONTO TOTAL DE I.V.A AL 16 % BS.S `)
       doc.setFontType("bold");
       doc.setFontSize(10)
       let res = res5 + res4
       doc.text(120, 210,`MONTO TOTAL A PAGAR BS.S: ${res.toLocaleString()}`)
       }
     }else{
     doc.setFontType("bold");
     doc.setFontSize(10)
     if(this.tipoDV == true){
       doc.text(120, 210,`MONTO TOTAL A PAGAR USD: $${this.montoTo.toFixed(2)} `)
     }else{
       var res2 = this.montoTo * 1.10
       doc.text(120, 210,`MONTO TOTAL A PAGAR USD: $${res2.toFixed(2)} `)
     }
     }
     doc.setFontType("normal")
     doc.setFontSize(10)
     doc.text(5, 230,"OBSERVACIONES")
     doc.text(120, 230,this.observacion)
     doc.text(5, 240,"FORMA DE PAGO")
     doc.text(120, 240,"FORMA DE PAGO")
     if(this.efectivo > 0){
      doc.text(5, 250,"EFECTIVO " + this.efectivo)
     }else{
      doc.text(5, 250,"EFECTIVO ")
     }
    
     doc.text(120, 250,"ORIGEN PEDIDO NRO. " + this.origen)
     doc.text(5, 260,"TRANSFEENCIA O DEPOSITO")
     if(this.transferencia > 0){
       var tra = this.transferencia
      doc.text(120, 260, "Transferencia: "+tra)
     }
     if(this.deposito > 0){
     doc.text(120, 260, "Deposito: "+this.deposito)
    }
    if(this.cheque > 0){
      doc.text(120, 260, "Cheque: "+this.cheque)
     }
     doc.text(5, 270,"REALIZAR TRANSFERENCIAS A LAS SIGUIENTES CUENTAS")
     doc.setFontSize(8)
     doc.text(5, 275,"BOD 0116-0177-42-0028764030 /MERCANTIL 0105-0104-11-1104169118")
     doc.text(5, 280,"CARONI 0128-0113-12-1301026982/ VZLA 0102-0696-14-0000403513")
     doc.text(120, 290,"CONTROL NÚMERO." + this.factura)
     doc.save(`Facturación para ${this.nombre} ${this.fecha()}.pdf`)
     this.rout.navigate(['/inicio'])
     return false;
     }); 
    }
  }


  facTipoLib(){
    if(this.nombre == "" || this.totales == "" || this.metodo == ""  || this.cedula == "" || this.factura == "" || this.direccion == "" || this.vendedor == "" || this.origen=="IF-" || this.condic == ""){
      this.errorForm = true;
          setTimeout(()=>{
            this.errorForm = false;
        },3000);
    }else{
    this.updateProduct()
    this.obtenerTotales()
    this.saveHistory()
    this.savePend()
    this.serv.deleteAllPre();
    let doc = new jsPDF();
    var data = document.getElementById('contentToConvert');  
     html2canvas(data).then(canvas => {  
      var imgWidth = 165;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
      const contentDataURL = canvas.toDataURL('image/png')
  
      doc.setLineWidth(0.1)
      doc.line(114, 51.5, 114, 66.5) 
      doc.line(192.2, 51.5, 192.2, 66.5) 
      doc.line(158, 51.5, 158, 66.5) 
      doc.setFontSize(10);
      doc.setFontType("bold")
      doc.setFontSize(8);
      doc.text(114, 51, '__________________________________________________')
      doc.text(115, 55, 'FACTURA NRO')
      doc.text(160, 55, '' + this.factura)
      doc.text(114, 56, '__________________________________________________')
      doc.text(115, 60, 'LUGAR DE EMISIÓN                       FECHA' )
      doc.text(114, 61, '__________________________________________________')
      doc.text(115, 65, `SANTA ANA DE CORO                   ${this.fecha()}` )
      doc.text(114, 66, '__________________________________________________')
      doc.setFontSize(10);
      doc.text(20, 75, 'NOMBRE Y APELLIDO O RAZÓN SOCIAL:')
      doc.setFontSize(8)
      doc.text(20, 80, '' + this.nombre)
      doc.setFontSize(10)
      doc.text(20, 85, 'DIRECCIÓN FISCAL:')
      doc.setFontSize(7)
      doc.text(20, 89, '' + this.direccion)
      doc.text(20, 92, '' + this.direccion2)
      doc.setFontSize(10)
      doc.text(128, 75, 'RIF/C.I: ' )
      doc.text(128, 80, '' + this.cedula )
      doc.text(128, 80, '_________________')
      doc.text(128, 85, 'NRO. DE CONTACTO: ' )
      doc.text(128, 90, '' + this.contacto )
      doc.text(20, 96, 'VENDEDOR: ' + this.vendedor)
      doc.text(128, 96, 'CONDICIONES DE PAGO: ' + this.condic)
      //tabla
      doc.addImage(contentDataURL, 'PNG', 20, 100, imgWidth, imgHeight) 
      //cierre de tabla
      doc.setFontSize(8)
      doc.text(145, 155, '_______________')
      doc.setFontType("bold")
      if(this.metodo == 'Bs'){//este obviamente evalua si es en bolivares
        if(this.tipoDV == true){ // este if evalua si la compra es al mayor o al detal
          doc.text(122, 159, 'SUB-TOTAL BS.S ' + this.subTotal.toLocaleString() )
          doc.text(85.2, 162,' MONTO TOTAL BASE IMPONIBLE 16% BS.S ' + this.montoIv.toLocaleString() )
          doc.text(88.5, 165,'MONTO TOTAL EXONERADO DE IVA BS.S ' + this.montoEx.toLocaleString() )
          doc.text(99.7, 168,'MONTO TOTAL I.V.A AL 16% BS.S')
          doc.text(104, 171,'MONTO TOTAL A PAGAR BS.S ' + this.montoTo.toLocaleString() )
        }else{
          doc.text(122, 159, 'SUB-TOTAL BS.S ' + (this.subTotal * 1.10).toLocaleString() )
          doc.text(85.2, 162,' MONTO TOTAL BASE IMPONIBLE 16% BS.S ' + (this.montoIv * 1.10).toLocaleString())
          doc.text(88.5, 165,'MONTO TOTAL EXONERADO DE IVA BS.S ' + (this.montoEx * 1.10).toLocaleString())
          doc.text(99.7, 168,'MONTO TOTAL I.V.A AL 16% BS.S')
          doc.text(104, 171,'MONTO TOTAL A PAGAR BS.S ' + (this.montoTo * 1.10).toLocaleString())
        }
      }else{
        if(this.tipoDV == true){
          doc.text(104, 171,`MONTO TOTAL A PAGAR USD: $${this.montoTo.toFixed(2)} `)
        }else{
          var res2 = this.montoTo * 1.10
          doc.text(104, 171,`MONTO TOTAL A PAGAR USD: $${res2.toFixed(2)} `)
        }
      }
      doc.text(145, 172, '_______________')
      doc.text(20, 172,'OBSERVACIONES')
      doc.text(20, 175,'FORMA DE PAGO')
      if(this.efectivo > 0){
        doc.text(20, 178,'EFECTIVO ' + this.efectivo.toLocaleString())
      }
      if(this.cheque > 0){
        doc.text(100, 178,'CHEQUE ' + this.cheque.toLocaleString())
      }
      if(this.transferencia > 0){
        var tra = this.transferencia
        doc.text(20, 181,'TRANSFERENCIA: ' + tra.toLocaleString())
      }
      if(this.deposito > 0){
      var tra = this.transferencia
      doc.text(20, 184,'DEPOSITO: ' + this.deposito.toLocaleString())
      }
    doc.text(100, 181,'ORIGEN DEL PEDIDO NRO')
    doc.text(150, 181,'' + this.origen)
    doc.text(20, 198,'EMAIL: insufarmaventas@gmail.com/ insufarmaordencompras@gmail.com')
    doc.text(20, 201,'CUENTAS BANCARIAS: DEPOSITO TRANSFERENCIAS O CHEQUES')
    doc.text(20, 204,'A NOMBRE DE: INSUFARMA FALCON, CA')
    doc.text(20, 207,'RIF: J - 411036129')
    doc.text(20, 210,'BANCO MERCANTIL: 0105 - 0104 - 11 1104169118')
    doc.text(20, 213,'BOD: 0116 - 0177 - 42 - 0028764030')
      doc.save(`Facturación para ${this.nombre} ${this.fecha()}.pdf`)
      this.rout.navigate(['/inicio'])
      return false;
     });
    }
  }



}
