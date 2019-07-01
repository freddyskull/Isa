import { Component, OnInit, Input,ViewChild, ElementRef } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { product } from '../../../models/productModel';
import { history } from '../../../models/historyModel';
import { pend } from '../../../models/pendientesModel';
import * as jsPDF from 'jspdf'; 
import html2canvas from 'html2canvas'; 
@Component({
  selector: 'app-notaEntrega',
  templateUrl: './nota-d-entrega.component.html',
  styleUrls: ['./nota-d-entrega.component.scss']
})
export class NotaDEntregaComponent implements OnInit {

  constructor(private serv: ProductService ) { }
  userName:string = "";
  ngOnInit() {
    this.getporduct()
    this.getPro()
  this.obtener()
  this.userName = localStorage.getItem("username")
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
    tipo: ""
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
    date: new Date(),
    compraD: "",
    estado: 0,
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
  @Input()optionAux;
  productos:any =[];
  errorForm: boolean = false;
  option: boolean = true;
  restar: any = [];
  pro:any = [];
  pre:any = [];
  subTotal:any;
  montoIv:any;
  montoEx:any;
  montoTo:any;
  fecha(){
    var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
    var f=new Date();
    return (f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear())
  }

  getporduct(){
    this.productos = this.serv.getPresupuestos()
  }

  obtenerTotales(){
    this.subTotal = Object.values(this.totales)[0];
    this.montoIv  = Object.values(this.totales)[1];
    this.montoEx  = Object.values(this.totales)[2];
    this.montoTo  = Object.values(this.totales)[3];
  }


getPro(){
    this.serv.getProducts().subscribe(
      req => {
         this.pro = req;
      }
    )
  }

  savePend(){
    if(this.optionHistory == true){
      delete this.pendientes.id;
      this.pendientes.vendedor  = this.vendedor;
      this.pendientes.comprador = this.nombre;
      this.pendientes.estado    = true;
      this.pendientes.observa   = this.description;
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


  obtener(){
    this.pre = this.serv.getPresupuestos()
  }


  saveHistory(){
    delete this.history.id;
    this.history.nameVend = this.vendedor;
    this.history.compraD  = this.nombre;
    this.history.tipo     = this.metodo;
    this.history.origen     = this.origen;
    this.history.observa    = this.observacion;
    if(this.optionHistory == true){
    this.history.estado       = 1 ;
    }else{
      this.history.estado     = 0 ;
    }
    this.history.userName   = this.userName;
    this.history.numFac     = this.factura;
    if(this.optionChoose == 1){
      this.history.tipoFac   = "Facturación";
    }else{
      this.history.tipoFac    = "Nota de entrega";
    }
    if(this.tipoDV == false){
      var montIv = this.montoIv * 1.10;
      let res = (this.montoTo   * 1.10);
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



  //condiciones de validación, esta función lo que hace es que valida si la factura es decontado o a credito para hacer sus respecticas validaciones
  condicVal(option:boolean){
    if(this.condic == "DECONTADO"){
      if(this.nombre == "" || this.totales == "" || this.metodo == ""  || this.cedula == "" || this.factura == "" || this.direccion == "" || this.origen=="IF-" || this.optionAux == 0){
        this.errorForm = true;
            setTimeout(()=>{
              this.errorForm = false;
          },3000);
      }else{
       this.downloadPDF()
      }
    }else{
      if(this.nombre == "" || this.totales == "" || this.metodo == ""  || this.cedula == "" || this.factura == "" || this.direccion == "" || this.origen=="IF-"){
        this.errorForm = true;
            setTimeout(()=>{
              this.errorForm = false;
          },3000);
      }else{
        this.downloadPDF()
      }
    }
  }


  public downloadPDF(){
    this.updateProduct()
    this.obtenerTotales()
    this.saveHistory()
    this.savePend()
    let doc = new jsPDF()
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
    doc.setFontSize(11)
    doc.setFontType("bold")
    doc.text(140, 10, 'VENTA DE INSUMOS MÉDICOS')
    doc.setFontType("normal")
    doc.setFontSize(10.2)
    doc.text(140, 14, 'Calle González Cc San Miguel Nivel')
    doc.setFontSize(8)
    doc.text(140, 18, 'Planta Baja Local Nº01 Sector Pantano Abajo')
    doc.setFontSize(8.2)
    doc.text(140, 22, 'Santa Ana de Coro Falcòn Zona Postal 4101')
    doc.text(140, 26, 'Telf:(0412)661.58.59 / (0414)688.40.17')
    doc.setFontType("bold");
    doc.text(140,35, 'NOTA DE ENTREGA')
    doc.setFontSize(10)
    doc.setLineWidth(0.1)
    doc.line(120, 42.5, 120, 56.5) 
    doc.line(198.2, 42.5, 198.2, 56.5) 
    doc.line(165, 42.5, 165, 56.5) 
    doc.setFontSize(10);
    doc.setFontSize(8);
    doc.text(120, 42, '__________________________________________________')
    doc.text(122, 46, 'ORIGEN DEL PEDIDO')
    doc.text(167, 46, '' + this.origen)
    doc.text(120, 47, '__________________________________________________')
    doc.text(122, 51, 'LUGAR DE EMISIÓN                             DIA-MES-AÑO ' )
    doc.text(120, 52, '__________________________________________________')
    doc.text(122, 56, `SANTA ANA DE CORO                   ${this.fecha()}`)
    doc.text(120, 56, '__________________________________________________') 
    doc.setFontSize(6.5)
    doc.text(5,30, 'VENTA DE INSUMOS MÉDICOS CALLE GONZÀLEZ CC SAN MIGUEL NIVLE PLANTA BAJA')
    doc.text(5,33, ' LOCAL N,01 SECTOR PANTANO ABAJO SANTA ANA DE CORO FALCÓN ZONA POSTAL')
    doc.text(5,36,'TELF:(0412)661.58.59 / (0414)688.40.17')
    doc.setFontType("bold")
    doc.setFontSize(7)
    doc.setFontSize(10)
    doc.setFontType("bold");
    doc.text(5,70, 'NOMBRE APELLIDO O RAZÓN SOCIAL')
    doc.setFontSize(10)
    doc.setFontType("normal")
    doc.text(5,74, ''+this.nombre)
    doc.setFontType("normal")
    doc.setFontType("bold");
    doc.text(140,69, 'RIF/C.I')
    doc.setFontType("normal")
    doc.text(140,73, ''+this.cedula)
    doc.text(140,74, '________________')
    doc.setFontType("bold")
    doc.text(140,80, `NRO. DE CONTACTO`)
    doc.text(140,85, '' + this.contacto)
    
    
    doc.text(5,82, 'DIRECCIÓN FISCAL')
    doc.setFontType("normal")
    doc.text(5,86, ''+this.direccion)
    doc.text(5,90, ''+this.direccion2)
    doc.setFontType("bold")
    doc.text(5,78, 'VENDEDOR ' +this.vendedor) 
    doc.setFontType("bold")
    doc.text(5,95, 'POR EL CONCEPTO DE LA VENTA DE LOS SIGUIENTES PRODUCTOS:') 
    doc.setFontSize(8)
    doc.text(140,95, 'CONDICIONES DE PAGO:')  
    doc.setFontSize(7)
    doc.text(176,95, '' + this.condic)  
    //autotable
    doc.addImage(contentDataURL, 'PNG', 5, 99, imgWidth, imgHeight)  
    doc.setFontSize(8)
    doc.setFontType("bold")
    if(this.metodo == 'Bs'){//este obviamente evalua si es en bolivares
      
      if(this.efectivo > 0){
        doc.text(5, 255,'EFECTIVO ' + this.efectivo.toLocaleString())
      }
      if(this.cheque > 0){
        doc.text(5, 260,'CHEQUE ' + this.cheque.toLocaleString())
      }
      if(this.transferencia > 0){
        var tra = this.transferencia
        doc.text(5, 265,'TRANSFERENCIA: ' + tra.toLocaleString())
      }

      if(this.deposito > 0){
      var tra = this.transferencia
      doc.text(20, 270,'DEPOSITO: ' + this.deposito.toLocaleString())
      }
      if(this.tipoDV == true){ // este if evalua si la compra es al mayor o al detal
        doc.text(172, 251,  '_______________')
        doc.text(148, 255, 'SUB-TOTAL BS.S ' + Math.round(this.subTotal).toLocaleString() )
        doc.text(112.2, 260,' MONTO TOTAL BASE IMPONIBLE 16% BS.S ' + Math.round(this.montoIv).toLocaleString() )
        doc.text(114.5, 265,'MONTO TOTAL EXONERADO DE IVA BS.S ' + Math.round(this.montoEx).toLocaleString() )
        var IvaTot = (this.montoTo - this.montoEx)
        doc.text(125.7, 270,'MONTO TOTAL I.V.A AL 16% BS.S ' + Math.round(IvaTot).toLocaleString())
        doc.setFontType("bold");
        doc.text(130, 275,'MONTO TOTAL A PAGAR BS.S ' + Math.round(this.montoTo).toLocaleString() )
        doc.text(172, 276,  '_______________')
        
      }else{
        doc.text(172, 251,  '_______________')
        doc.text(148, 255, 'SUB-TOTAL BS.S ' + (this.subTotal * 1.10).toLocaleString() )
        doc.text(112.2, 260,'MONTO TOTAL BASE IMPONIBLE 16% BS.S ' + Math.round(this.montoIv * 1.10).toLocaleString())
        var exo = this.montoEx * 1.10
        var tot = this.montoTo * 1.10
        doc.text(114.5, 265,'MONTO TOTAL EXONERADO DE IVA BS.S ' + Math.round(exo).toLocaleString())
        var IvaTot = (tot - exo)
        doc.text(125.7, 270,'MONTO TOTAL I.V.A AL 16% BS.S ' + Math.round(IvaTot).toLocaleString())
        doc.setFontType("bold");
        doc.text(130, 275,'MONTO TOTAL A PAGAR BS.S ' + Math.round(tot).toLocaleString())
        doc.text(172, 276,  '_______________')
        
      }
    }else{

      if(this.efectivo > 0){
        doc.text(5, 255,'EFECTIVO ' + this.efectivo.toFixed(2))
      }
      if(this.cheque > 0){
        doc.text(5, 260,'CHEQUE ' + this.cheque.toFixed(2))
      }
      if(this.transferencia > 0){
        var tra = this.transferencia
        doc.text(5, 265,'TRANSFERENCIA: ' + tra.toFixed(2))
      }

      if(this.tipoDV == true){
        doc.text(130, 270,`MONTO TOTAL A PAGAR USD: $${this.montoTo.toFixed(2)} `)
      }else{
        var res2 = this.montoTo * 1.10
        doc.text(130, 270,`MONTO TOTAL A PAGAR USD: $${res2.toFixed(2)} `)
      }
    }
    doc.text(5,280, `OBSERVACIONES ${this.observacion}`)
    doc.text(5,285, `FORMA DE PAGO ${this.metodo}`)
    doc.save(`Nota de entrega para ${this.nombre} ${this.fecha()}.pdf`)
    return false;
    })
  }
}

