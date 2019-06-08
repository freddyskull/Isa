import { Component, OnInit,ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { ProductService } from '../../services/product.service'
@Component({
  selector: 'app-history-user',
  templateUrl: './history-user.component.html',
  styleUrls: ['./history-user.component.scss']
})
export class HistoryUserComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['date', 'total', 'estado'];
  dataSource;
  history:any = [];
  userName:string;
  constructor(private serv:ProductService) { }

  ngOnInit() {
    this.userName = localStorage.getItem("username")
    this.getHistory()
  }

  getHistory(){
    this.serv.getHistorys().subscribe(
      req => {
        let j = 0;
        var ult =Object.keys(req).length
        for (let i = 0; i < ult; i++) {
          if(req[i].userName == this.userName){
             this.history[j] = req[i]
          }
          j++;
        }
        this.dataSource = new MatTableDataSource(this.history)
        this.dataSource.paginator = this.paginator;
      }
    )
  }
  

}
