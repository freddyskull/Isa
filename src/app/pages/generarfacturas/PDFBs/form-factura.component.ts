import { Component, OnInit, Input,ViewChild, ElementRef } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { product } from '../../../models/productModel';
import { history } from '../../../models/historyModel';
import { pend } from '../../../models/pendientesModel';
import * as jsPDF from 'jspdf'; 
import html2canvas from 'html2canvas'; 
import {  Router } from '@angular/router';
import {ConvertBsPipe} from '../../../pipes/bsPipes/convert-bs.pipe';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmFacNotaComponent } from '../../../components/dialog/confirm-fac-nota/confirm-fac-nota.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-factura',
  templateUrl: './form-factura.component.html',
  styleUrls: ['./form-factura.component.scss']
})
export class FormFacturaComponent implements OnInit {
  restarAAlmacen: any;
  userName:string = "";
  constructor(private serv: ProductService, private rout: Router, public dialog: MatDialog, private _snackBar: MatSnackBar) { }

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
    encargado: "",
    idOrigen:"",
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
  //declaracion de las variables que hereda del componet padre
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
  // mas variables
  total:string = "";
  errorForm: boolean = false;
  option: boolean = true;
  restar: any = [];
  pro:any = [];
  pre:any = [];
  subTotal:any;
  montoIv:any;
  montoEx:any;
  montoTo:any;
  montoToIvSum:any;
  UserNom:string = "";
  
  
  //funciones de obtención de datos y actualización de datos
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

  //funcion que salva en la tabla historial
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
    this.montoToIvSum = Object.values(this.totales)[4];
    console.log(this.montoToIvSum + " aparte " + this.montoEx)
  }

  savePend(){
    if(this.optionHistory == true){
      delete this.pendientes.id;
      this.pendientes.vendedor  = this.vendedor;
      this.pendientes.comprador = this.nombre;
      this.pendientes.estado    = true;
      this.pendientes.observa   = this.description;
      this.pendientes.encargado = this.UserNom;
      this.pendientes.idOrigen  = this.origen;
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

 
  //condiciones de validación, esta función lo que hace es que valida si la factura es decontado o a credito para hacer sus respecticas validaciones
  condicVal(option:boolean){
    if(this.condic == "DECONTADO"){
      if(this.nombre == "" || this.totales == "" || this.metodo == ""  || this.cedula == "" || this.factura == "" || this.direccion == "" || this.origen=="IF-" || this.optionAux == 0){
        this.errorForm = true;
            setTimeout(()=>{
              this.errorForm = false;
          },3000);
      }else{
        if(option == true){
          this.facTipoLib()
        }else{
          this.facturaPdf()
        }
      }
    }else{
      if(this.nombre == "" || this.totales == "" || this.metodo == ""  || this.cedula == "" || this.factura == "" || this.direccion == "" || this.origen=="IF-"){
        this.errorForm = true;
            setTimeout(()=>{
              this.errorForm = false;
          },3000);
      }else{
        if(option == true){
          this.facTipoLib()
        }else{
          this.facturaPdf()
        }
      }
    }
  }


//facturas pdf
  facturaPdf(){
    if(this.nombre == "" || this.totales == "" || this.metodo == ""  || this.cedula == "" || this.factura == "" || this.direccion == "" || this.origen=="IF-" || this.condic == ""){
      this.errorForm = true;
          setTimeout(()=>{
            this.errorForm = false;
        },3000);
    }else{
    let total = 0; 
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
      doc.text(120, 170,`SUB-TOTAL BS. S: ${ConvertBsPipe.prototype.transform(this.subTotal)}`)
      doc.text(120, 180,`MONTO TOTAL BASE IMPONIBLE AL 16% BS.S ${ConvertBsPipe.prototype.transform(this.montoIv)}`)
      doc.text(120, 190,`MONTO TOTAL EXONERADO O EXENTO DE IVA BS.S ${ConvertBsPipe.prototype.transform(this.montoEx)}`)
      doc.text(120, 200,`MONTO TOTAL DE I.V.A AL 16 % BS.S `)
      doc.setFontType("bold");
      doc.setFontSize(10)
      doc.text(120, 210,`MONTO TOTAL A PAGAR BS.S: ${ConvertBsPipe.prototype.transform(this.montoTo)}`)
      }else{// si la venta es al detal solo se le aumenta el 10%
      var res5 = this.subTotal * 1.10
      doc.text(120, 170,`SUB-TOTAL BS. S: ${res5}`)
      var res4 = this.montoIv * 1.10
      doc.text(120, 180,`MONTO TOTAL BASE IMPONIBLE AL 16% BS.S ${ConvertBsPipe.prototype.transform(res4)}`)
      var res3 = this.montoEx * 1.10
      doc.text(120, 190,`MONTO TOTAL EXONERADO O EXENTO DE IVA BS.S ${ConvertBsPipe.prototype.transform(res3)}`)
      doc.text(120, 200,`MONTO TOTAL DE I.V.A AL 16 % BS.S `)
      doc.setFontType("bold");
      doc.setFontSize(10)
      let res = res5 + res4
      doc.text(120, 210,`MONTO TOTAL A PAGAR BS.S: ${ConvertBsPipe.prototype.transform(res)}`)
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
      doc.line(120, 47.5, 120, 57.5)//lineas inicio
      doc.line(162, 57.5, 162, 47)//lineas medio
      doc.line(198.2, 47.5, 198.2, 57.5) //lineas final
      doc.setFontSize(12);
      doc.setFontType("bold")
      doc.text(122, 46, 'FACTURA NRO')
      doc.text(155, 46, '' + this.factura )
      doc.setFontSize(8);
      doc.text(120, 47, '__________________________________________________')
      doc.text(122, 51, 'LUGAR DE EMISIÓN                            DIA-MES-AÑO ' )
      doc.text(120, 52, '__________________________________________________')
      doc.text(122, 56, `SANTA ANA DE CORO               ${this.fecha()}` )
      doc.text(120, 57, '__________________________________________________')
      doc.setFontSize(8);
      doc.text(20, 62, 'NOMBRE Y APELLIDO O RAZÓN SOCIAL')
      doc.setFontSize(12)
      doc.setFontType("normal")
      doc.text(20, 66, ''+ this.nombre )
      doc.setFontSize(10)
      doc.setFontType("bold")
      doc.text(20, 70, 'DIRECCIÓN FISCAL')
      doc.setFontType("normal")
      doc.setFontSize(8.5)
      doc.text(20, 73.5, ''+ this.direccion  )
      doc.text(20, 76.5, ''+ this.direccion2  )
      doc.setFontSize(10)
      doc.setFontType("bold")
      doc.text(128, 62, 'RIF/C.I ' )
      doc.setFontType("normal")
      doc.text(128, 66, ''+ this.cedula   )
      doc.text(128, 67, '_________________')
      doc.setFontType("bold")
      doc.text(128, 72, 'NRO. DE CONTACTO ' )
      doc.setFontType("normal")
      doc.text(128, 75.2, '' + this.contacto )
      doc.setFontType("bold")
      doc.text(20, 82, 'VENDEDOR:' + this.vendedor )
      doc.text(128, 82, 'CONDICIONES DE PAGO ')
      doc.setFontSize(8)
      doc.setFontType("normal")
      doc.text(172, 82, '' + this.condic)
      //tabla
      doc.addImage(contentDataURL, 'PNG', 20, 84, imgWidth, imgHeight) 
      //cierre de tabla
      doc.setFontSize(10)
      if(this.metodo == 'Bs'){//este obviamente evalua si es en bolivares
        if(this.tipoDV == true){ // este if evalua si la compra es al mayor o al detal
          doc.text(160, 172.5,  '_________________')
          doc.text(130, 177, 'SUB-TOTAL BS.S ' )
          doc.text(166, 177, '' + ConvertBsPipe.prototype.transform(this.subTotal) )
          doc.text(84.5, 180.5,' MONTO TOTAL BASE IMPONIBLE 16% BS.S ' )
          
          doc.text(166, 180.5, ''+ ConvertBsPipe.prototype.transform(this.montoToIvSum) )
          doc.text(88, 184,'MONTO TOTAL EXONERADO DE IVA BS.S '  )
          doc.text(166, 184, '' + ConvertBsPipe.prototype.transform(this.subTotal - this.montoIv) )
          doc.text(102, 187.5,'MONTO TOTAL I.V.A AL 16% BS.S ' )
          doc.text(166, 187.5, '' + ConvertBsPipe.prototype.transform(this.montoIv) )
          doc.setFontType("bold")
          doc.text(106.5, 191,'MONTO TOTAL A PAGAR BS.S ' )
          doc.text(166, 191, '' + ConvertBsPipe.prototype.transform(this.montoTo) )
          doc.setFontType("normal")
          doc.text(160, 192,  '_________________')
          this.total == ConvertBsPipe.prototype.transform(this.montoTo)
        }else{
          doc.text(160, 172.5,  '_________________')
          doc.text(130, 177, 'SUB-TOTAL BS.S ' )
          doc.text(166, 177, ''  + ConvertBsPipe.prototype.transform(this.subTotal * 1.10) )
          doc.text(84.5, 180.5,' MONTO TOTAL BASE IMPONIBLE 16% BS.S ' )
          doc.text(166, 180.5, ''+ ConvertBsPipe.prototype.transform(this.montoToIvSum * 1.10))
          var exo = this.montoEx * 1.10
          var tot = this.montoTo * 1.10
          doc.text(88, 184,   'MONTO TOTAL EXONERADO DE IVA BS.S '  )
          
          doc.text(166, 184, '' +  ConvertBsPipe.prototype.transform(exo))
          var IvaTot = (tot - exo)
          doc.text(102, 187.5,'MONTO TOTAL I.V.A AL 16% BS.S ' )
          doc.text(166, 187.5, '' + ConvertBsPipe.prototype.transform(this.montoIv * 1.10) )
          doc.setFontType("bold")
          doc.text(106, 191,'MONTO TOTAL A PAGAR BS.S ' )
          doc.text(166, 191, '' + ConvertBsPipe.prototype.transform(tot) )
          doc.text(160, 192,  '_________________')
          this.total == ConvertBsPipe.prototype.transform(tot)
        }
      }else{
        if(this.tipoDV == true){
          doc.setFontType("bold")
          doc.text(106.5, 191,`MONTO TOTAL A PAGAR USD: $${this.montoTo.toFixed(2)} `)
          this.total == "$ " + this.montoTo.toFixed(2)
        }else{
          var res2 = this.montoTo * 1.10
          doc.setFontType("bold")
          doc.text(106.5, 191,`MONTO TOTAL A PAGAR USD: $${res2.toFixed(2)} `)
          this.total == "$ " + res2.toFixed(2)
        }
      }
      doc.setFontType("normal")
      doc.text(20, 172,'OBSERVACIONES')
      if(this.condic == 'DECONTADO'){
        doc.text(20, 176,'FORMA DE PAGO')
      }
      if(this.efectivo > 0){
        doc.text(20, 179,'EFECTIVO ' + this.efectivo.toLocaleString()+ ",00")
      }
      if(this.cheque > 0){
        doc.text(20, 190,'CHEQUE ' + this.cheque.toLocaleString()+ ",00")
      }
      if(this.transferencia > 0){
        var tra = this.transferencia
        doc.text(20, 183,'TRANSFERENCIA: ' + tra.toLocaleString()+ ",00")
      }
      if(this.deposito > 0){
      var tra = this.transferencia
      doc.text(20, 186,'DEPOSITO: ' + this.deposito.toLocaleString()+ ",00")
      }
      doc.text(119.5, 200,'ORIGEN DEL PEDIDO NRO')
      doc.text(175, 200,'' + this.origen )
      doc.setFontSize(10)
      doc.text(20, 208,'REALIZAR TRANSFERENCIAS A LAS SIGUIENTES CUENTAS')
      doc.text(20, 212,'BOD 0116-0177-42-0028764030 /MERCANTIL 0105-0104-11-1104169118')
      doc.text(20, 216,'VZLA 0102-0696-14-0000403513/CARONI 0128-0113-12-1301026982/')
      doc.text(20, 220,'BANESCO-0134-0409-7440-9105-0075')
      doc.save(`Facturación para ${this.nombre} ${this.fecha()}.pdf`)
      this.rout.navigate(['/inicio'])
      return false;
     });
  }

//funciones adicionales

fecha(){
  var meses = new Array ("ENERO","FEBRERO","MARZO","ABRIL","MAYO","JUNIO","JULIO","AGOSTO","SEPTIEMBRE","OCTUBRE","NOVIEMBRE","DICIEMBRE");
  var f=new Date();
  return (f.getDate() + " DE " + meses[f.getMonth()] + " DEL " + f.getFullYear())
}


openDialog(tipo:boolean) {
  let name = localStorage.getItem('name')
  const dialogRef = this.dialog.open(ConfirmFacNotaComponent, {
    width: '450px',
    data: {name: `Hola ${name}`, metodo: this.metodo, condicion: this.tipoDV, total: this.total}
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log(result)
    if(result == false){
      this.openSnackBar('La venta fué realizada y descontada, guarde su comprobante', 'Entendido');
      if(tipo == true){
        this.facTipoLib()
      }else{
        this.facturaPdf()
      }
      
    }else{
      this.openSnackBar('Por favor rectifique su venta', 'Ok')
    }
  });
  
}


openSnackBar(message: string, action: string) {
  this._snackBar.open(message, action, {
    duration: 4000,
  });
}

}
