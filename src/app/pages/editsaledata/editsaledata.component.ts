import { Component, OnInit } from '@angular/core';
import {ActivatedRoute ,Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { CommonService } from 'src/app/services/common.service';
import { SavedataconfirmComponent } from '../savedataconfirm/savedataconfirm.component';
import { MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-editsaledata',
  templateUrl: './editsaledata.component.html',
  styleUrls: ['./editsaledata.component.scss']
})
export class EditsaledataComponent implements OnInit {
  UnitList:any
  form:any={}
  editdata:any
  DisplayLastMonthYear:any
  today = new Date()
  LoginData: any = JSON.parse(sessionStorage.getItem('LoginData') || '{}');
  SaleData: any = JSON.parse(sessionStorage.getItem('saldata') || '{}');
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private datePipe: DatePipe,
    private Commonservice: CommonService,
    public dialog: MatDialog,
    public http: HttpClient,) { }

  ngOnInit(): void
  {
    this.UnitList=JSON.parse(this.LoginData.UNITS)
      this.form.Division=this.SaleData.Division
      this.form.Unit=this.SaleData.Unit
      this.form.Financial_Yea=this.SaleData.FinancialYear
      this.form.OE=this.SaleData.OE
      this.form.Retail=this.SaleData.Retail
      this.form.exportz=this.SaleData.Export
      this.form.Product_Sales=this.SaleData.ProductSales
      this.form.Cr_Notes=this.SaleData.CrNotes
      this.form.Net_Product_Sales=this.SaleData.NetProductSales
      this.form.Scrap_Sales=this.SaleData.ScrapSales
      this.form.Total_Sales=this.SaleData.TotalSales
      this.form.Cum_Adj=this.SaleData.CumAdj
      this.form.Adj_Sales=this.SaleData.AdjSales
      this.form.IPT_Sales=this.SaleData.IPTSales
      this.form.Budgeted_Sales=this.SaleData.BudgetedSales
      this.form.Month=this.datePipe.transform(this.SaleData.Month, 'MM/dd/yyyy')
    // this.route.queryParams.subscribe((params: any) => {

    //   let EditData=JSON.parse(params.data)
    //   this.editdata=JSON.parse(params.data)
    //   //Assign Values
    //   this.form.Division=EditData.Division
    //   this.form.Unit=EditData.Unit
    //   this.form.Financial_Yea=EditData.FinancialYear
    //   this.form.OE=EditData.OE
    //   this.form.Retail=EditData.Retail
    //   this.form.exportz=EditData.Export
    //   this.form.Product_Sales=EditData.ProductSales
    //   this.form.Cr_Notes=EditData.CrNotes
    //   this.form.Net_Product_Sales=EditData.NetProductSales
    //   this.form.Scrap_Sales=EditData.ScrapSales
    //   this.form.Total_Sales=EditData.TotalSales
    //   this.form.Cum_Adj=EditData.CumAdj
    //   this.form.Adj_Sales=EditData.AdjSales
    //   this.form.IPT_Sales=EditData.IPTSales
    //   this.form.Budgeted_Sales=EditData.BudgetedSales
    //   this.form.Month=this.datePipe.transform(EditData.Month, 'MM/dd/yyyy')
    // })


let firstDayOfThisMonth = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
    let lastDayOfPrevMonth = new Date(firstDayOfThisMonth.getTime() - 1);
this.DisplayLastMonthYear=this.datePipe.transform(lastDayOfPrevMonth, 'MMMM yyyy')

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
          Action:'edit',
          id:this.editdata.Id
        }

        this.http.post(Url, para).subscribe((response:any) => {
          const status='status' ; const Data='Data' ; const count='count' ; const Message='Message'
          if(response[status])
          {
            this.Commonservice.disableLoader();
            this.Commonservice.openSnackBar('Data Updated Successfully',2000);
            this.router.navigate(['/pages/saledataview'])
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
