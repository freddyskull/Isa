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
  @Input()condic
  productos:any =[];
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

  public downloadPDF(){
       if(this.nombre == "" || this.totales == "" || this.metodo == ""  || this.cedula == "" || this.direccion == "" || this.vendedor == "" || this.origen=="IF-"){
        this.errorForm = true;
            setTimeout(()=>{
              this.errorForm = false;
            },3000);
      }else{
    
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
      doc.text(140,40, 'NOTA DE ENTREGA')
      doc.text(180,40, ''+this.origen)
      doc.setFontSize(6)
      doc.text(140,48, 'FECHA Y LUGAR DE EMISIÒN')
      doc.text(180,48, 'DIA MES AÑO')
      doc.setFontSize(7)
      doc.text(140,52, 'SANTA ANA DE CORO')
      doc.text(180,52, ''+this.fecha())
      doc.setFontSize(6.5)
      doc.text(5,30, 'VENTA DE INSUMOS MÉDICOS CALLE GONZÀLEZ CC SAN MIGUEL NIVLE PLANTA BAJA LOCAL N,01 SECTOR')
      doc.text(5,33, 'PANTANO ABAJO SANTA ANA DE CORO FALCÓN ZONA POSTAL TELF:(0412)661.58.59 / (0414)688.40.17')
      doc.setFontType("bold")
      doc.setFontSize(7)
      doc.text(5,70, 'NOMBRE APELLIDO O RAZÓN SOCIAL')
      doc.setFontSize(8)
      doc.setFontType("normal")
      doc.text(5,74, ''+this.nombre)
      doc.setFontType("normal")
      doc.text(140,69, 'RIF/C.I')
      doc.text(140,73, ''+this.cedula)
      doc.setFontType("bold")
      doc.text(140,82, `NRO. DE CONTACTO ${this.contacto}`)
     
      doc.setFontType("normal")
      doc.text(5,82, 'DIRECCIÓN FISCAL')
      doc.text(5,86, ''+this.direccion)
      doc.text(5,78, 'VENDEDOR') 
      doc.text(40,77.5, ''+this.vendedor)
      doc.text(5,90, 'POR EL CONCEPTO DE LA VENTA DE LOS SIGUIENTES PRODUCTOS:') 
      doc.text(140,90, 'CONDICIONES DE PAGO') 
      //autotable
      doc.addImage(contentDataURL, 'PNG', 5, 92, imgWidth, imgHeight)  
     
      if(this.metodo == 'Bs'){//este obviamente evalua si es en bolivares
        if(this.efectivo != 0){
          doc.text(5, 242,"EFECTIVO " + this.efectivo.toLocaleString())
         }
        if(this.transferencia != 0){
         doc.text(5, 245, "TRANSFERENCIA: "+this.transferencia.toLocaleString())
        }
        if(this.deposito != 0){
        doc.text(5, 248, "DEPOSITO: "+this.deposito.toLocaleString())
       }
       if(this.cheque != 0){
         doc.text(5, 251, "CHEQUE: "+this.cheque.toLocaleString())
        }
        if(this.tipoDV == true){ // este if evalua si la compra es al mayor o al detal
        doc.text(120, 250,`SUB-TOTAL BS. S: ${this.subTotal.toLocaleString()}`)
        doc.text(120, 255,`MONTO TOTAL BASE IMPONIBLE AL 16% BS.S ${this.montoIv.toLocaleString()}`)
        doc.text(120, 260,`MONTO TOTAL EXONERADO O EXENTO DE IVA BS.S ${this.montoEx.toLocaleString()}`)
        doc.text(120, 265,`MONTO TOTAL DE I.V.A AL 16 % BS.S `)
        doc.setFontType("bold");
        doc.setFontSize(10)
        doc.text(120, 270,`MONTO TOTAL A PAGAR BS.S: ${this.montoTo.toLocaleString()}`)
        }else{// si la venta es al detal solo se le aumenta el 10%
        var res5 = this.subTotal * 1.10
        doc.text(120, 250,`SUB-TOTAL BS. S: ${res5.toLocaleString()}`)
        var res4 = this.montoIv * 1.10
        doc.text(120, 255,`MONTO TOTAL BASE IMPONIBLE AL 16% BS.S ${res4.toLocaleString()}`)
        var res3 = this.montoEx * 1.10
        doc.text(120, 260,`MONTO TOTAL EXONERADO O EXENTO DE IVA BS.S ${res3.toLocaleString()}`)
        doc.text(120, 265,`MONTO TOTAL DE I.V.A AL 16 % BS.S `)
        doc.setFontType("bold");
        doc.setFontSize(10)
        let res = res5 + res4
        doc.text(120, 270,`MONTO TOTAL A PAGAR BS.S: ${res.toLocaleString()}`)
        }
      }else{
        if(this.efectivo != 0){
          doc.text(5, 242,"EFECTIVO " + this.efectivo.toFixed(2))
         }
        if(this.transferencia != 0){
         doc.text(5, 245, "TRANSFERENCIA: "+this.transferencia.toFixed(2))
        }
        if(this.deposito != 0){
        doc.text(5, 248, "DEPOSITO: "+this.deposito.toFixed(2))
       }
       if(this.cheque != 0){
         doc.text(5, 251, "CHEQUE: "+this.cheque.toFixed(2))
        }
      doc.setFontType("bold");
      doc.setFontSize(10)
        if(this.tipoDV == true){
          doc.text(120, 260,`MONTO TOTAL A PAGAR USD: $${this.montoTo.toFixed(2)} `)
        }else{
          var res2 = this.montoTo * 1.10
          doc.text(120, 260,`MONTO TOTAL A PAGAR USD: $${res2.toFixed(2)} `)
        }
      }
      doc.text(5,280, `OBSERVACIONES ${this.observacion}`)
      doc.text(5,285, `FORMA DE PAGO ${this.metodo}`)
      doc.save(`Nota de entrega para ${this.nombre} ${this.fecha()}.pdf`)
      return false;
      })
    }
  }
}

