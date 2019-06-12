import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ProductService } from '../../../services/product.service';



@Component({
  selector: 'app-history-ventas-dialog',
  templateUrl: './history-ventas-dialog.component.html',
  styleUrls: ['./history-ventas-dialog.component.scss']
})
export class HistoryVentasDialogComponent implements OnInit {
  dataVentas:any = [];
  
  constructor(
    public serv: ProductService,
    public dialogRef: MatDialogRef<HistoryVentasDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public id: number) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.getData()
  }
  getData(){
    this.serv.getHistory(this.id).subscribe(
      req => {
        this.dataVentas = req
        console.log(req)
      }
    )
  }


}

