import { Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ProductService } from '../../../../services/product.service'
@Component({
  selector: 'app-update-pre',
  templateUrl: './update-pre.component.html',
  styleUrls: ['./update-pre.component.scss']
})
export class UpdatePreComponent implements OnInit {
  product:any = [];
  restar:number;
  constructor(
    public dialogRef: MatDialogRef<UpdatePreComponent>,
    public serv: ProductService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.restar = data.cant;
    }
  
  obtenerTotStock(){
    this.serv.getProduct(this.data.id).subscribe(
      req => {
        this.product = req;
      }
    )
  }
  onNoClick(): void {
    this.dialogRef.close();
  }


  editPresu(){
    this.data.item.stock = this.restar
    this.serv.editPre(this.data.item)
    this.dialogRef.close();
  }

  ngOnInit() {
    this.obtenerTotStock();
  }

}
