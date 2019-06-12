import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigate',
  templateUrl: './navigate.component.html',
  styleUrls: ['./navigate.component.scss']
})
export class NavigateComponent implements OnInit {
  
  constructor() { }

  ngOnInit() {
    
  }
  status: boolean = false;
clickEvent(){
    this.status = !this.status;       
}
  
}
