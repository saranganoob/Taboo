import { Component,Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-savedataconfirm',
  templateUrl: './savedataconfirm.component.html',
  styleUrls: ['./savedataconfirm.component.scss']
})
export class SavedataconfirmComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<any>,@Inject(MAT_DIALOG_DATA) public dialogdata: any
  ) { }

  ngOnInit(): void {
  }

  close(val:any)
  {
    this.dialogRef.close(val)
  }
}
