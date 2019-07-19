import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
@Component({
  selector: 'app-confirm-fac-nota',
  templateUrl: './confirm-fac-nota.component.html',
  styleUrls: ['./confirm-fac-nota.component.scss']
})
export class ConfirmFacNotaComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmFacNotaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  ngOnInit() {
    console.log(this.data)
  }
}
