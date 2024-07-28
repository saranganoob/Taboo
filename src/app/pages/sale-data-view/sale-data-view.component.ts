import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { CommonService } from 'src/app/services/common.service';
import { ExcelService } from 'src/app/services/excel.service';
import Swal from 'sweetalert2';
import { MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-sale-data-view',
  templateUrl: './sale-data-view.component.html',
  styleUrls: ['./sale-data-view.component.scss']
})
export class SaleDataViewComponent implements OnInit {
  LoginData: any = JSON.parse(sessionStorage.getItem('LoginData') || '{}');
  currentPage = 1;
  itemsperpage = 25;
  TabDatas:any
  TabDatasF:any
  totalItems:any
  divlist:any
  division:any
  divisionID:any
  ViewTable=true
  ExportID:any=[]
  ShowExp=false;
  CurrentDiv:any
  today = new Date()
  ViewAllDiv=true
  Tot:any
  Unitcount:any
  DisplayLastMonthYear:any

  Financial_Yea:any
  currentYear = this.today.getFullYear();
  financialYearStart = new Date(this.currentYear, 3, 1); // assuming financial year starts from April 1st
  financialYearEnd = new Date(this.currentYear + 1, 2, 31); // assuming financial year ends on March 31st of next year
  lastDayOfPrevMonth:any
  lastDayOfPrevMonthfin:any
  secondLastDayOfPrevMonth:any

  TodayOnlyDate:any

  findate:any
  constructor(
    public http: HttpClient,
    private router:Router,
    private datePipe: DatePipe,
    private Commonservice: CommonService,
    private excelService: ExcelService,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void
  {
    this.division=0


    this.gettitles()
    this.getdivision()
    this.gettabledata()
  }

  gettitles()
  {


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

  getdivision()
  {
    this.Commonservice.enableLoader();
    const Urlq = this.Commonservice.Url + 'getdivdata'
    const para=
    {
      username:this.LoginData.employeeNo,
      usertype:this.LoginData.userid,
    }

    this.http.post(Urlq, para).subscribe((response:any) => {
      const status='status' ; const Data='Data' ; const count='count' ; const Message='Message'
      if(response[status])
      {
         this.Commonservice.disableLoader();
         this.divlist=response[Data]
      }
      else
      {
         this.Commonservice.disableLoader();
      }

    },
    (error: any) => {
      this.Commonservice.disableLoader();
      this.Commonservice.openSnackBar('Server Response Error. Try Again', 4000);
    })
  }

  edit(rowdata:any){
    const passval=JSON.stringify(rowdata)
    this.router.navigate(['/pages/saledataedit']);
    sessionStorage.setItem('saldata',passval);

  }

  NGXPageChange(event:any) {

    this.currentPage = event;
    this.ngOnInit()
  }






  Selectdiv(val:any)
  {

    this.division=val.DivisionName
    this.divisionID=val.Id
    this.ViewAllDiv=false
    this.Commonservice.enableLoader();
    const Url = this.Commonservice.Url + 'getsaledatax'

    const param=
    {
      username:this.LoginData.employeeNo,
      usertype:this.LoginData.EmployeeType,
      fromdate:'',
      todate:'',
      pagenumber:this.currentPage,
      subusertype:this.LoginData.subusertype,
      plantid:val.Id
    }

    this.http.post(Url, param).subscribe((response:any) => {
      const status='status' ; const Data='Data' ; const count='count' ; const tot='tot'
      if(response[status])
      {
        this.Commonservice.disableLoader();

        this.TabDatas=response[Data]
        this.totalItems=response[count]
        this.Tot=response[tot][0]

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



  ExportSAlesAPI()
  {
    let arr1 = this.TabDatas.every((elem:any) => {
      return elem.OE !== "" && elem.Retail !== ""&&elem.Export !== ""&& elem.CrNotes !== ""&&elem.ScrapSales !== ""&&elem.CumAdj !== ""&&elem.IPTSales !== ""
     })
     if (arr1)
     {
      //Move to sales starts
      this.ExportID=[]

      for (let index = 0; index < this.TabDatas.length; index++)
      {
        this.ExportID.push(this.TabDatas[index].Id)
      }

      const Url = this.Commonservice.Url + 'ExportSales'
      const param={
      username:this.LoginData.employeeNo,
      userid:this.LoginData.userid,
      Subuserid:this.LoginData.subusertype,
      EmployeeType:this.LoginData.EmployeeType,
      Recid:this.ExportID
    }
    //Submit
    Swal.fire({

      title: 'Are you sure <br>Do you want to Move this Data to Flash sales?',
      html: `<span style="color: red;">You can't be able to edit this further.!</span>`,
      icon:'warning',
      showDenyButton: true,
      confirmButtonColor: '#2a9f43',
        denyButtonColor:'#2a2a9f',
      confirmButtonText: 'Submit',
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        //Submit data
        this.Commonservice.enableLoader();
    this.http.post(Url, param).subscribe((response:any) => {
      const status='status' ; const Message='Message' ;
      if(response[status])
      {
        this.Commonservice.disableLoader();
        this.Commonservice.OpenSwal('success','Data Moved to flash Sales Successfully',2000)
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
      //Move to sales ends
      }
       else
       {
      this.Commonservice.OpenSwal('warning','Kindly Fill all the values',2000)
      return
     }

  }


  Save()
  {

console.log(this.ViewAllDiv)

if(this.ViewAllDiv) //Save all
{
  this.CorpSave()
}
else  //Save particular Divsion
{
  this.CorpDivisionSave()
}


  }

  gettabledata()
  {
    this.Commonservice.enableLoader();
    const Url = this.Commonservice.Url + 'getsaledatax'

    const param={
      username:this.LoginData.employeeNo,
      usertype:this.LoginData.EmployeeType,
      fromdate:'',
      todate:'',
      pagenumber:this.currentPage,
      subusertype:this.LoginData.subusertype,
      plantid:''
    }

    this.http.post(Url, param).subscribe((response:any) => {
      const status='status' ; const Data='Data' ; const count='count' ;
      const tot='tot' ; const unit='unit'
      if(response[status])
      {
        this.Commonservice.disableLoader();
        this.TabDatas=response[Data]

        this.totalItems=response[count]
        this.ViewTable=false
        this.Tot=response[tot][0]
        this.Unitcount=response[unit]

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

  Alldiv()
  {
this.gettabledata()
this.ViewAllDiv=true
this.division=0
  }

  CalcluateAll(index:any)
  {
    const row = this.TabDatas[index];

    let prosal = Number(row.OE) + Number(row.Retail) + Number(row.Export);
    this.TabDatas[index].ProductSales=prosal.toFixed(2)

    let netpro=Number(row.ProductSales)+Number(row.DbNotes)-Number(row.CrNotes)
    this.TabDatas[index].NetProductSales=netpro.toFixed(2)

    let totsal=Number(row.NetProductSales)+Number(row.ScrapSales)
   this.TabDatas[index].TotalSales=totsal.toFixed(2)

   let adjsla=Number(row.TotalSales)+Number(row.CumAdj)
    this.TabDatas[index].AdjSales=adjsla.toFixed(2)
  }


    exportExcel(): void {

      let myArray: any[] = [];
    myArray.push(...this.TabDatas,this.Tot)
    console.log(myArray)
    const fileToExport = myArray.map((items:any) => {
    return {
    "Division": items?.Division,
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
    "Month": items?.Month,
    }
    });

    this.excelService.exportToExcel(
    fileToExport,
    'FlashSales_'+this.lastDayOfPrevMonthfin+'_FY'+this.Financial_Yea
    );
    }



    CorpSave()
    {
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

    const Url = this.Commonservice.Url + 'SalesSaveSubmit'
    const param=
    {
      username:this.LoginData.employeeNo,
      userid:this.LoginData.userid,
      usertype:this.LoginData.EmployeeType,
      data:JSON.stringify(this.TabDatas),
      division:this.division,
      action:'0',
      todayDate:findate
      // todayDate:this.lastDayOfPrevMonthfin
    }
    console.log(param)

    Swal.fire({
      title: 'Are you sure <br>Do you want to save this data?',
        icon:'question',
        showDenyButton: true,
        confirmButtonText: 'Save',
        confirmButtonColor: '#2a9f43',
        denyButtonColor:'#2a2a9f',
        footer: 'Changes can be Edited later',
        denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        //Submit data
        this.Commonservice.enableLoader();
    this.http.post(Url, param).subscribe((response:any) => {
      const status='status' ; const Message='Message' ;
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
        //Submit data Ends
      } else if (result.isDenied) {

      }
    })
    }

    CorpDivisionSave()
    {
      this.Commonservice.enableLoader();
      const Url = this.Commonservice.Url + 'UpdateByCorp'
      const param=
      {
        username:this.LoginData.employeeNo,
        userid:this.LoginData.userid,
        usertype:this.LoginData.EmployeeType,
        savesubmit:'0',
        division:this.divisionID,
        data:JSON.stringify(this.TabDatas),
        comments:''
      }

      console.log(param)


      this.http.post(Url, param).subscribe((response:any) => {
        const status='status' ; const Message='Message' ;
        console.log(response)

        if(response[status])
        {
          this.Commonservice.disableLoader();
          this.Commonservice.OpenSwal('success',response[Message],2000)
          // this.ngOnInit()
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
      }

      )

    }

}
