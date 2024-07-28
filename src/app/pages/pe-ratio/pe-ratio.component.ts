import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-pe-ratio',
  templateUrl: './pe-ratio.component.html',
  styleUrls: ['./pe-ratio.component.scss']
})
export class PERatioComponent implements OnInit {

  form:any={}
  MonthList:any=[]
  isUpdate=false


  LoginData: any = JSON.parse(sessionStorage.getItem('LoginData') || '{}');

  today = new Date()
   currentYear = this.today.getFullYear();
   financialYearStart = new Date(this.currentYear, 3, 1); // assuming financial year starts from April 1st
   financialYearEnd = new Date(this.currentYear + 1, 2, 31); // assuming financial year ends on March 31st of next year

   DisplayfinancialYear:any

   TabDatas:any
  EditData:any

  FY:any
  Lmont:any

  constructor() { }

  ngOnInit(): void
  {
    if (this.today >= this.financialYearStart && this.today <= this.financialYearEnd) {

      //April to Dec
      this.DisplayfinancialYear=(this.currentYear + '-' + (this.currentYear + 1).toString().slice(-2))

    this.MonthList.push(
      {name:'Jan',isDisable:true},
      {name:'Feb',isDisable:true},
      {name:'Mar',isDisable:true},
      {name:'Apr',isDisable:false},
      {name:'May',isDisable:false},
      {name:'Jun',isDisable:false},
      {name:'Jul',isDisable:false},
      {name:'Aug',isDisable:false},
      {name:'Sep',isDisable:false},
      {name:'Oct',isDisable:false},
      {name:'Nov',isDisable:false},
      {name:'Dec',isDisable:false},
    )

    } else {

      //Jan to Mar
      this.DisplayfinancialYear=((this.currentYear - 1) + '-' + this.currentYear.toString().slice(-2))

      this.MonthList.push(
        {name:'Jan',isDisable:false},
        {name:'Feb',isDisable:false},
        {name:'Mar',isDisable:false},
        {name:'Apr',isDisable:true},
        {name:'May',isDisable:true},
        {name:'Jun',isDisable:true},
        {name:'Jul',isDisable:true},
        {name:'Aug',isDisable:true},
        {name:'Sep',isDisable:true},
        {name:'Oct',isDisable:true},
        {name:'Nov',isDisable:true},
        {name:'Dec',isDisable:true},
      )
    }

    this.form.month=this.DisplayfinancialYear
  }

  Submit()
  {

  }

  edit(Rowdata:any)
  {

  }

}
