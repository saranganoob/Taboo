import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { CommonService } from 'src/app/services/common.service';
import { SavedataconfirmComponent } from '../savedataconfirm/savedataconfirm.component';
import { MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-salesdatarev',
  templateUrl: './salesdatarev.component.html',
  styleUrls: ['./salesdatarev.component.scss']
})
export class SalesdatarevComponent implements OnInit {
  SaleDatas:any
  UnitList:any
  currentPage = 1;
  itemsperpage = 20;
  totalItems:any
  form:any={}
  DisplayLastMonthYear:any
  TodayOnlyDate:any
  LoginData: any = JSON.parse(sessionStorage.getItem('LoginData') || '{}');

  DisplayfinancialYear:any

   today = new Date()
   currentYear = this.today.getFullYear();
   financialYearStart = new Date(this.currentYear, 3, 1); // assuming financial year starts from April 1st
   financialYearEnd = new Date(this.currentYear + 1, 2, 31); // assuming financial year ends on March 31st of next year

   lastDayOfPrevMonth:any
   secondLastDayOfPrevMonth:any

   constructor(
    private router: Router,
    public http: HttpClient,
    private datePipe: DatePipe,
    private Commonservice: CommonService,
    public dialog: MatDialog) { }

  ngOnInit(): void {

    this.TodayOnlyDate=this.datePipe.transform(this.today, 'dd')

    if (this.today >= this.financialYearStart && this.today <= this.financialYearEnd)
    {
      this.form.Financial_Yea=(this.currentYear + '-' + (this.currentYear + 1).toString().slice(-2))
    }
    else
    {
      this.form.Financial_Yea=((this.currentYear - 1) + '-' + this.currentYear.toString().slice(-2));
    }
    this.UnitList=JSON.parse(this.LoginData.UNITS)
    var firstDayOfThisMonth = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
    var lastDayOfPrevMonth = new Date(firstDayOfThisMonth.getTime() - 1);

    this.DisplayLastMonthYear=this.datePipe.transform(lastDayOfPrevMonth, 'MMMM yyyy')
    var secondLastDayOfPrevMonth = new Date(lastDayOfPrevMonth.getFullYear(), lastDayOfPrevMonth.getMonth(), lastDayOfPrevMonth.getDate() - 1);

    this.secondLastDayOfPrevMonth=secondLastDayOfPrevMonth
    this.lastDayOfPrevMonth=lastDayOfPrevMonth

    // console.log(this.today)
    // console.log(this.secondLastDayOfPrevMonth)
    // console.log(this.lastDayOfPrevMonth)

    this.form.Division=this.LoginData.division
    this.form.Month=this.datePipe.transform(lastDayOfPrevMonth, 'MM/dd/yyyy')





//     today = new Date()
// firstDayOfThisMonth = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
//     lastDayOfPrevMonth = new Date(this.firstDayOfThisMonth.getTime() - 1);
// DisplayLastMonthYear=this.datePipe.transform(this.lastDayOfPrevMonth, 'MMMM yyyy')

  }

  NGXPageChange(event:any) {

    this.currentPage = event;
    this.ngOnInit()
  }

  Submit(){

    const dialogRef = this.dialog.open(SavedataconfirmComponent, {
      width: '40%',

      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result)
      if(result)
      {

        this.Commonservice.enableLoader();
        const Url = this.Commonservice.Url + 'InsSalesData'
        const para=
        {
          username:this.LoginData.employeeNo,
          usertype:this.LoginData.EmployeeType,
          userid:this.LoginData.userid,
          Division:this.form.Division,
          Unit:this.form.Unit,
          OE:this.form.OE,
          Retail:this.form.Retail,
          exportz:this.form.exportz,
          Product_Sales:this.form.Product_Sales,
          Cr_Notes:this.form.Cr_Notes,
          Net_Product_Sales:this.form.Net_Product_Sales,
          Scrap_Sales:this.form.Scrap_Sales,
          Total_Sales:this.form.Total_Sales,
          Cum_Adj:this.form.Cum_Adj,
          Adj_Sales:this.form.Adj_Sales,
          Month:this.datePipe.transform(this.form.Month, 'MM/dd/yyyy'),
          Financial_Yea:this.form.Financial_Yea,
          IPT_Sales:this.form.IPT_Sales,
          Budgeted_Sales:this.form.Budgeted_Sales,
          Action:'insert',
          id:''
        }

        this.http.post(Url, para).subscribe((response:any) => {
          const status='status' ; const Data='Data' ; const count='count' ; const Message='Message'
          if(response[status])
          {
            this.Commonservice.disableLoader();
            this.Commonservice.openSnackBar('Data Inserted Successfully',2000);
          }
          else
          {
            this.Commonservice.disableLoader();
           this.Commonservice.openSnackBar(response[Message],3000);
          }

        },
        (error: any) => {
          this.Commonservice.disableLoader();
          this.Commonservice.openSnackBar('Server Response Error. Try Again', 4000);
        })

      }
    });

  }

  ProductsalVal()
  {
    let prosal=Number(this.form.OE)+Number(this.form.Retail)+Number(this.form.exportz)
    this.form.Product_Sales=prosal.toFixed(2)
  }

  NetProductsalVal()
  {
    let netpro=Number(this.form.Product_Sales)-Number(this.form.Cr_Notes)
    this.form.Net_Product_Sales=netpro.toFixed(2)
  }

  TotalSalesVal()
  {
    let totsal=Number(this.form.Net_Product_Sales)+Number(this.form.Scrap_Sales)
   this.form.Total_Sales=totsal.toFixed(2)
  }

  AdjSalesVal()
  {
    let adjsla=Number(this.form.Total_Sales)+Number(this.form.Cum_Adj)
    this.form.Adj_Sales=adjsla.toFixed(2)
  }
}
