import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatSort, MatSortable} from '@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-history-ventas',
  templateUrl: './history-ventas.component.html',
  styleUrls: ['./history-ventas.component.scss']
})
export class HistoryVentasComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort
  history:any = [];
  displayedColumns: string[] = ['id', 'nameVend', 'total', 'date','compraD','estado','observa','origen','tipo','totIva','numFac','tipoFac'];
  dataSource;
  constructor(private serv:ProductService){
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

}