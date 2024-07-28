import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-market-capitalization',
  templateUrl: './market-capitalization.component.html',
  styleUrls: ['./market-capitalization.component.scss']
})
export class MarketCapitalizationComponent implements OnInit {
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

  constructor(
    public http:HttpClient,
    private common:CommonService,
  ) { }

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
    this.GetMarketCapData()
  }




  GetMarketCapData()
  {
    this.common.enableLoader();
    const Url = this.common.Url + 'GetMarCap'

        const param=
        {
          username:this.LoginData.employeeNo,
        usertype:this.LoginData.userid,
        }

    this.http.post(Url, param).subscribe((response:any) => {
      const status='status' ; const Data='Data' ;
      if(response[status])
      {
        this.TabDatas=response[Data]
        this.common.disableLoader();
      }
      else
      {
        this.common.disableLoader();
       this.common.openSnackBar('Something Went Wrong...Please try Again Later',3000);
      }

         },
      (error: any) => {
        this.common.disableLoader();
        this.common.openSnackBar('Server Response Error. Try Again', 4000);
      })
  }

  Submit()
  {
    this.common.enableLoader();
    const Url = this.common.Url + 'InsUpdMarCap'

      const param=
      {
        username:this.LoginData.employeeNo
        ,usertype:this.LoginData.userid
        ,Particular:this.form.particular
        ,action:this.isUpdate? 'edit' : 'insert'
        ,year:this.form.month
        ,marcap:this.form.marketcap
        ,id:this.isUpdate? this.EditData.SNo : ''
      }

      this.http.post(Url, param).subscribe((response:any) => {
      const status='status' ; const Message='Message'
      if(response[status])
      {
        this.common.disableLoader();
        this.common.openSnackBar(response[Message],3000);
        this.form={}
        this.ngOnInit()
      }
      else
      {
        this.common.disableLoader();
       this.common.openSnackBar('Something Went Wrong ',3000);
      }

    },
    (error: any) => {
      this.common.disableLoader();
      this.common.openSnackBar('Server Response Error. Try Again', 4000);
    })


  }

  edit(Rowdata:any)
  {

  }

}
