import { Component, OnInit,Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-cnfrmsales',
  templateUrl: './cnfrmsales.component.html',
  styleUrls: ['./cnfrmsales.component.scss']
})
export class CnfrmsalesComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<any>,@Inject(MAT_DIALOG_DATA) public dialogdata: any
  ) { }

  ngOnInit(): void {
  }
  close(val:any)
  {
    this.dialogRef.close(val)
  }

}
