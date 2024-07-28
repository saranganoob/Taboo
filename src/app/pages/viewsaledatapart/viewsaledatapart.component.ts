import { Component,ViewChild,ElementRef,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { CommonService } from 'src/app/services/common.service';
import { ExcelService } from 'src/app/services/excel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewsaledatapart',
  templateUrl: './viewsaledatapart.component.html',
  styleUrls: ['./viewsaledatapart.component.scss']
})
export class ViewsaledatapartComponent implements OnInit {


LoginData: any = JSON.parse(sessionStorage.getItem('LoginData') || '{}');
  currentPage = 1;
  itemsperpage = 20;
  TabDatas:any
  totalItems:any
  Tot:any
  cmnt:any
// today = new Date('Thur June 1 2023 10:41:12 GMT+0530 (India Standard Time)')
today = new Date()
DisplayLastMonthYear:any

lastDayOfPrevMonthfin:any

Financial_Yea:any
UnitList:any
   currentYear = this.today.getFullYear();
   financialYearStart = new Date(this.currentYear, 3, 1); // assuming financial year starts from April 1st
   financialYearEnd = new Date(this.currentYear + 1, 2, 31); // assuming financial year ends on March 31st of next year

   lastDayOfPrevMonth:any
   secondLastDayOfPrevMonth:any
   TodayOnlyDate:any

   HideSubmit:any
      Sales:any=[{}]
      SalesisSubmitted:any

      Dasboalink:any

    constructor(
    public http: HttpClient,
    public Rout: Router,
    private datePipe: DatePipe,
    private Commonservice: CommonService,
    private excelService: ExcelService,
    ) { }

  ngOnInit(): void
  {
    this.checkdate()
    this.gettitles()
    this.getflashsales()

  }

  CreateDasboalink()
  {
  //   console.log(this.LoginData.division)

  //   switch(this.LoginData.division) {
  //     case "FD":
  //     {
  //        this.Dasboalink='http://10.100.2.91:8000/#/views/UnitWise1/FDdash'

  //        break;
  //     }
  //     case "UKD": {
  //       this.Dasboalink='http://10.100.2.91:8000/#/views/UnitWise1/UKDDash'
  //        break;
  //     }
  //     case "MFD": {
  //       this.Dasboalink='http://10.100.2.91:8000/#/views/UnitWise1/MFDDash'
  //        break;
  //     }
  //     case "PTC": {
  //       this.Dasboalink='http://10.100.2.91:8000/#/views/UnitWise1/PTCDash'
  //        break;
  //     }
  //     case "Autolec": {
  //       this.Dasboalink='http://10.100.2.91:8000/#/views/UnitWise1/AutolecDash'
  //        break;
  //     }
  //     default: {
  //        console.log('75 non')
  //        break;
  //     }
  //  }
  //   "RCA"


  this.Rout.navigate(['pages/partisaledata/dasboardview'])


  }

  checkdate()
  {
    //Check if today's date is month first day or month last day

    // Get the current date
const currentDate = new Date()
console.log(currentDate)
// Get the current month
const currentMonth = currentDate.getMonth();

// Check if it's the first day of the month
const isFirstDayOfMonth = currentDate.getDate() === 1;

// Get the last day of the month
const lastDayOfMonth = new Date(currentDate.getFullYear(), currentMonth + 1, 0).getDate();

// Check if it's the last day of the month
const isLastDayOfMonth = currentDate.getDate() === lastDayOfMonth;

// Output the result
if (isFirstDayOfMonth)
{
  this.HideSubmit=false
}
 else if (isLastDayOfMonth)
{
  this.HideSubmit=false
}
 else
{
  this.HideSubmit=true
}

  }

  gettitles()
  {
    this.UnitList=JSON.parse(this.LoginData.UNITS)

    this.TodayOnlyDate=this.datePipe.transform(this.today, 'dd')

    if (this.today >= this.financialYearStart && this.today <= this.financialYearEnd)
    {
      this.Financial_Yea=(this.currentYear + '-' + (this.currentYear + 1).toString().slice(-2))
    }
    else
    {
      this.Financial_Yea=((this.currentYear - 1) + '-' + this.currentYear.toString().slice(-2));
    }

    var firstDayOfThisMonth = new Date(this.today.getFullYear(), this.today.getMonth(), 1);

    if(this.TodayOnlyDate==28 || this.TodayOnlyDate==29 || this.TodayOnlyDate==30 ||this.TodayOnlyDate==31)
    {
      var lastDayOfPrevMonth = new Date(firstDayOfThisMonth.getTime());

      this.DisplayLastMonthYear=this.datePipe.transform(lastDayOfPrevMonth, 'MMMM yyyy')
      var secondLastDayOfPrevMonth = new Date(lastDayOfPrevMonth.getFullYear(), lastDayOfPrevMonth.getMonth(), lastDayOfPrevMonth.getDate() - 1);

      this.secondLastDayOfPrevMonth=secondLastDayOfPrevMonth
      this.lastDayOfPrevMonth=lastDayOfPrevMonth

      this.lastDayOfPrevMonthfin=this.datePipe.transform(lastDayOfPrevMonth, 'MM/dd/yyyy')
    }
    else
    {
      var lastDayOfPrevMonth = new Date(firstDayOfThisMonth.getTime() - 1);

      this.DisplayLastMonthYear=this.datePipe.transform(lastDayOfPrevMonth, 'MMMM yyyy')
      var secondLastDayOfPrevMonth = new Date(lastDayOfPrevMonth.getFullYear(), lastDayOfPrevMonth.getMonth(), lastDayOfPrevMonth.getDate() - 1);

      this.secondLastDayOfPrevMonth=secondLastDayOfPrevMonth
      this.lastDayOfPrevMonth=lastDayOfPrevMonth

      this.lastDayOfPrevMonthfin=this.datePipe.transform(lastDayOfPrevMonth, 'MM/dd/yyyy')
    }

  }

  getflashsales()
  {
    this.Commonservice.enableLoader();
    const Url = this.Commonservice.Url + 'Salesdisplayrev'

    const param=
    {
      username:this.LoginData.employeeNo,
      EmployeeType:this.LoginData.EmployeeType,
      userid:this.LoginData.userid,
      Divid:this.LoginData.DivisionId,
    }

    this.http.post(Url, param).subscribe((response:any) => {
      const status='status' ; const Data='Data' ; const count='count';
      const IsSubmitted='IsSubmitted'; const total='total';const comments='comments'
      if(response[status])
      {
        this.Commonservice.disableLoader();
        this.Sales=response[Data]
        this.Tot=response[total]
        this.cmnt =response[comments] ? response[comments]:''
        this.SalesisSubmitted=response[IsSubmitted]==1 ? true : false
        this.Sales.forEach((element:any) =>
        {
        // element.disable=false
        element.disable=response[IsSubmitted]==1 ? true : false

        });
        this.totalItems=response[count]
      }
      else
      {
        this.Commonservice.disableLoader();
       this.Commonservice.openSnackBar('Something Went Wrong',3000);
      }

    },
    (error: any) => {
      this.Commonservice.disableLoader();
      this.Commonservice.openSnackBar('Server Response Error. Try Again', 4000);
    })
  }

  Submit(isSubmit:any){
    //variable Declarations
    let dataDate=localStorage.getItem('LoginDate')
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const lastDay = new Date(year, month, 0).getDate();
    let ThisMonthLastDate = `${month.toString().padStart(2, '0')}/${lastDay.toString().padStart(2, '0')}/${year}`;
    console.log(ThisMonthLastDate); // Output: 07/31/2023

    let formatteddataDate = this.datePipe.transform(dataDate, 'dd/MM/yyyy');
    let todaydataDate = this.datePipe.transform(today, 'dd/MM/yyyy');
    let datealone=today.getDate();
    let passvarval:any

    let DEV_URL='https://sflnalamdev.sfl.co.in:7700/'
    let PROD_URL='https://sflnalam.sfl.co.in:7700/'
    //variable Declarations Ends

    if (formatteddataDate == todaydataDate)
    {
    //If localstorage date is today date
    const Url = this.Commonservice.Url + 'SalesSaveSubmit'

    // if(this.Commonservice.Url==DEV_URL)
    // {
    //   console.log('DEV_URL',this.lastDayOfPrevMonthfin,todaydataDate,'datealone',datealone)

    //   if(datealone==1)
    //   {
    //     passvarval=todaydataDate
    //   }
    //   else
    //   {
    //     passvarval=ThisMonthLastDate
    //   }
    // }
    // else if(this.Commonservice.Url==PROD_URL)
    // {
    //   passvarval=todaydataDate
    // }
    // else
    // {
    //   console.log('NONE')
    // }


    //new changes on 31/7/2023


const currentDate: Date = new Date();
const curday: number = currentDate.getDate();
const lastDayOfPreviousMonth: Date = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
const lastDayOfCurrentMonth: Date = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
let findate:any

if (curday >= 1 && curday <= 5)
{
  const day = lastDayOfPreviousMonth.getDate().toString().padStart(2, '0');
  const month = (lastDayOfPreviousMonth.getMonth() + 1).toString().padStart(2, '0');
  const year = lastDayOfPreviousMonth.getFullYear();
  findate= `${month}/${day}/${year}`;
  // findate= `${day}/${month}/${year}`;
  console.log(findate)
}
else
{
  const currentDate: Date = new Date();

// Get the last day of the current month
const lastDayOfCurrentMonth: Date = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

const day = lastDayOfCurrentMonth.getDate().toString().padStart(2, '0');
  const month = (lastDayOfCurrentMonth.getMonth() + 1).toString().padStart(2, '0');
  const year = lastDayOfCurrentMonth.getFullYear();
  findate= `${month}/${day}/${year}`;
  console.log(findate)
}

    //changes on 31/7/2023


    const param=
    {
      username:this.LoginData.employeeNo,
      userid:this.LoginData.userid,
      usertype:this.LoginData.EmployeeType,
      data:JSON.stringify(this.Sales),
      division:this.LoginData.division,
      action:isSubmit ? '1' : '0',
      todayDate:findate,
      // todayDate:passvarval,
      // todayDate:this.lastDayOfPrevMonthfin,
      comments:this.cmnt
    }

     let arr1 = this.Sales.every((elem:any) => {
      return elem.OE !== "" && elem.Retail !== ""&&elem.Export !== ""&& elem.CrNotes !== ""&&elem.ScrapSales !== ""&&elem.CumAdj !== ""&&elem.IPTSales !== ""
     })
     if (arr1) {

      if(isSubmit)
      {
   //Submit
   Swal.fire({
    title: 'Are you sure <br>Do you want to Submit this data?',
    html: `<span style="color: red;">You can't be able to edit this further.!</span>`,
    icon:'warning',
    showDenyButton: true,
    confirmButtonColor: '#2a9f43',
    denyButtonColor:'#2a2a9f',
    confirmButtonText: 'Submit',
    denyButtonText: `Cancel`,
    showCloseButton: true
  }).then((result) => {
    if (result.isConfirmed) {
      //Submit data
      this.Commonservice.enableLoader();
  this.http.post(Url, param).subscribe((response:any) => {
    const status='status' ; const Message='Message' ;
    if(response[status])
    {
      this.Commonservice.disableLoader();
      this.Commonservice.OpenSwal('success','Data Submitted Successfully',2000)
      this.ngOnInit()
    }
    else
    {
      this.Commonservice.disableLoader();
      this.Commonservice.OpenSwal('error',response[Message],2000)
    }

  },
  (error: any) => {
    this.Commonservice.disableLoader();
    this.Commonservice.openSnackBar('Server Response Error. Try Again', 4000);
  })
      //Submit data Ends
    } else if (result.isDenied) {

    }
  })
      }
      else
      {
//Save
Swal.fire({
  title: 'Are you sure <br>Do you want to save this data?',
  icon:'question',
  showDenyButton: true,
  confirmButtonText: 'Save',
  confirmButtonColor: '#2a9f43',
  denyButtonColor:'#2a2a9f',
  footer: 'Changes can be Edited later',
  denyButtonText: `Cancel`,
  showCloseButton: true
}).then((result) => {
  if (result.isConfirmed) {
    //Save data
    this.Commonservice.enableLoader();
this.http.post(Url, param).subscribe((response:any) => {
  const status='status' ; const Message='Message' ; const count='count'
  if(response[status])
  {
    this.Commonservice.disableLoader();
    this.Commonservice.OpenSwal('success',response[Message],2000)
    this.ngOnInit()
  }
  else
  {
    this.Commonservice.disableLoader();
    this.Commonservice.OpenSwal('error',response[Message],2000)
  }

},
(error: any) => {
  this.Commonservice.disableLoader();
  this.Commonservice.openSnackBar('Server Response Error. Try Again', 4000);
})
    //Save data Ends
  } else if (result.isDenied) {
    Swal.fire(
    {
      title:'Data not saved',
       icon:'info',
       showCloseButton: true,
       timer:1500,
       timerProgressBar: true,
      })
  }
})
      }

     } else {
      this.Commonservice.OpenSwal('warning','Kindly Fill all the values',2000)
      this.Commonservice.disableLoader()
      return
     }
    //If localstorage date is today date ends
    } else {
      //If localstorage date is not today date
      this.Commonservice.OpenSwal('warning','Invalid Date Kindly Re-login',2000)
    }




  }


  exportExcel(): void {

    let myArray: any[] = [];
    myArray.push(...this.Sales,this.Tot)
    console.log(myArray)

    const fileToExport = myArray.map((items:any) => {
    return {
    "Unit": items?.Unit=='-'?'Total':items?.Unit,
    "OE": items?.OE,
    "Retail": items?.Retail,
    "Export": items?.Export,
    "Product Sales": items?.ProductSales,
    "Cr Notes": items?.CrNotes,
    "Net Product Sales": items?.NetProductSales,
    "Scrap Sales": items?.ScrapSales,
    "Total Sales": items?.TotalSales,
    "Cum Adj": items?.CumAdj,
    "Adj Sales": items?.AdjSales,
    "IPT sales": items?.IPTSales,
    "Budgeted Sales": items?.BudgetedSales,
    }
    });

    this.excelService.exportToExcel(
    fileToExport,
    'FlashSales_' +this.LoginData.division+'_'+this.lastDayOfPrevMonthfin+'_FY'+this.Financial_Yea
    );
    }


  CalcluateAll(index: number)
  {
    const row = this.Sales[index];

    let prosal = Number(row.OE) + Number(row.Retail) + Number(row.Export);
    this.Sales[index].ProductSales=prosal.toFixed(2)

    let netpro=Number(row.ProductSales)+Number(row.DbNotes)-Number(row.CrNotes)
    this.Sales[index].NetProductSales=netpro.toFixed(2)

    let totsal=Number(row.NetProductSales)+Number(row.ScrapSales)
   this.Sales[index].TotalSales=totsal.toFixed(2)

   let adjsla=Number(row.TotalSales)+Number(row.CumAdj)
    this.Sales[index].AdjSales=adjsla.toFixed(2)
  }



}

