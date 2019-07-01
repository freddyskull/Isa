import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-update-pend',
  templateUrl: './update-pend.component.html',
  styleUrls: ['./update-pend.component.scss']
})
export class UpdatePendComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UpdatePendComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.data.optionHistory = false;
    this.dialogRef.close();
  }
  
  ngOnInit() {
  }

}
