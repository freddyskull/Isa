import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-hermano',
  templateUrl: './hermano.component.html',
  styleUrls: ['./hermano.component.scss']
})
export class HermanoComponent implements OnInit {
 
  constructor(private serv: ProductService ) { }
  @Input() aux;
  @Input() show;
  @Input() pr;
  @Input() err;
  @Input() err2;
  @Input() aux2;
  @Input() stock;
  @Input() pro;
  @Input() productos;
  ivaT:boolean = false;
  @Output() enviar = new EventEmitter<number>();
  @Output() volver = new EventEmitter<boolean>();
  usdValor:number = 0;
  // restar es la variable que se le debe restar al stock
  restar: number = 1;
  //presupuesto total es el array que contiene todo lo que se agrega al presupuesto
  presupuestoTotal: any = [];

  ngOnInit() {
    this.getUSD();
    console.log(this.pr)
  }

  getUSD(){
    this.serv.getUsdValor().subscribe(
      req => {
        this.usdValor = Object.values(req)[0].priceUSD
      }
    )
  }
//funcion que devuelve las variables para hacer cambios en que hacen desaparecer en el html
  back(){
    this.volver.emit(true)
    this.restar = 1;
  }
  //esta función es la que agrega en general todas las peticiones
  add(canti:NgForm,nam:string,restar:number,Usd:number,bs:number,id:number,bs$:number,Usd$:number,iva:number){
    if(iva == 1){
      console.log("si iva")
      if(bs == 0){ 
        console.log("fue agregado con $ al almacen pero tiene iva")
        this.addMasDol(canti,nam,restar,Usd,bs,id,bs$,Usd$,iva)
      }else{
        console.log("fue agregado con bs al almacen pero tiene iva")
        this.addIvayno(canti,nam,restar,Usd,bs,id,iva)
      }
    //aqui termina el if que verifica si hay iva y comienza el que verifica si no hay iva
    }else{
      if(bs == 0){
        console.log("fue comprado con $ no tiene iva")
        this.addMasDol(canti,nam,restar,Usd,bs,id,bs$,Usd$,iva)
      }else{
        console.log("comprado con bolivares sin iva")
        this.addIvayno(canti,nam,restar,Usd,bs,id,iva)
      }
    }
  }



  //esta agrega los productos sin iva al array de presupuestos
  addIvayno(canti:NgForm,nam:string,restar:number,Usd:number,bs:number,id:number,iva:number){
    let iv;
    //este primer if verifica si el formulario es valido
    if(canti.valid == true && restar != 0){
      //el aux2 es el que hace aparecer el siguien formulario
      this.aux2 = true;
      //este if verifica si el iva está desactivado para no tomarlo en cuenta
      if(iva == 0){
       var bsT = bs*restar; 
      }else{
        var bsT = bs*restar 
        iv = true;
      }
      var priBs =  bsT / restar; //variable que de vuelve el unitario en bs si es al detal
      var UsdT = bs*restar / Usd;//variable que devuelve el total en dolares si es unitario
      var priUs = UsdT / restar; //variable que devuelve el unitario en dolares si es al detal
     //aquí se asignan las variables correspondientes a la facturación
     
        this.serv.addPre({
          id: id,
          name: nam,
          stock: restar,
          price: bsT,
          price2: UsdT,
          price3: priBs,
          price4: priUs,
          priceB: this.pr.priceB,
          priceS: this.pr.priceS,
          recibo: this.pr.recibo,
          create_at: this.pr.create_at,
          description: this.pr.marca,
          description2: this.pr.marca2,
          category: this.pr.category,
          img: this.pr.img,
          iva: iv,    
         })
      
       
      this.presupuestoTotal = this.serv.getPresupuestos();
      this.pr = [];
      this.stock = 0;
      this.restar = 1;
      this.aux = false;
      this.show = true
      this.enviar.emit(this.pro);
     }else{
      this.err2 = true;
      setTimeout(()=>{
        this.err2 = false;
      },4000);
     }
  }

  //esta función agrega los items que fueron comprados con $ al presupuesto
  addMasDol(canti:NgForm,nam:string,restar:number,Usd:number,bs:number,id:number,bs$:number,Usd$:number,iva:number){
    if(canti.valid == true && restar != 0){
      this.aux2 = true;
      var bsT = 0;
      var UsdT = 0;
      var priBs = 0;
      var priUs = 0; 
        bsT = bs$*restar * Usd;
        UsdT = bs$*restar;
        priBs =  bsT / restar;
        priUs = UsdT / restar;
        let iv:boolean 
        if(iva == 0){
          iv = false
        }else{
          iv = true
        }
      this.serv.addPre({
        id: id,
        name: nam,
        stock: restar,
        price: bsT,
        price2: UsdT,
        price3: priBs,
        price4: priUs,
        priceB: this.pr.priceB,
        priceS: this.pr.priceS,
        recibo: this.pr.recibo,
        create_at: this.pr.create_at,
        description: this.pr.marca,
        description2: this.pr.marca2,
        category: this.pr.category,
        img: this.pr.img,
        iva:  iv   
       })
      this.presupuestoTotal = this.serv.getPresupuestos();
      this.pr = [];
      this.stock = 0;
      this.restar = 1;
      this.aux = false;
      this.show = true
      this.enviar.emit(this.pro);
     }else{
      this.err2 = true;
      setTimeout(()=>{
        this.err2 = false;
      },4000);
     }
  }


  delete(id:Number){
    var ult = Object.keys(this.productos).length;
    for(let i = 0; i < ult; i++){
      if(id == this.productos[i].id){
       return this.productos.splice(i,1);
      }
    }
  }
}
