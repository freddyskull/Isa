import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatSort, MatSortable} from '@angular/material';
import { ProductService } from '../../../services/product.service';
import {MatDialog} from '@angular/material/dialog';
import { HistoryVentasDialogComponent } from '../../../components/dialog/history-ventas-dialog/history-ventas-dialog.component'; 



@Component({
  selector: 'app-history-ventas',
  templateUrl: './history-ventas.component.html',
  styleUrls: ['./history-ventas.component.scss']
})
export class HistoryVentasComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort
  history:any = [];
  displayedColumns: string[] = ['nameVend', 'date','compraD','estado','origen','numFac', 'id'];
  dataSource;
  constructor(private serv:ProductService, public dialog: MatDialog){
  }
  panelOpenState = false;
  
  ngOnInit() {
    this.getHistory()
  }

  getHistory(){
    this.serv.getHistorys().subscribe(
      req => {
        this.history = req
        this.dataSource = new MatTableDataSource(this.history);
        this.dataSource.sort = this.sort;
      }
    )
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  veMas(id:number):void{
    const dialogRef = this.dialog.open(HistoryVentasDialogComponent, {
      width: '500px',
      data: id
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
    })
  }

}