import { Component,ViewChild,ElementRef,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { CommonService } from 'src/app/services/common.service';
import { ExcelService } from 'src/app/services/excel.service';

@Component({
  selector: 'app-salesclassification',
  templateUrl: './salesclassification.component.html',
  styleUrls: ['./salesclassification.component.scss']
})
export class SalesclassificationComponent implements OnInit {

  //var
  LoginData: any = JSON.parse(sessionStorage.getItem('LoginData') || '{}');
  currentPage = 1;
  itemsperpage = 20;
  TabDatas:any
  totalItems:any
  Tot:any
// today = new Date('Thur June 1 2023 10:41:12 GMT+0530 (India Standard Time)')
today = new Date()
DisplayLastMonthYear:any

lastDayOfPrevMonthfin:any
form:any={}
Financial_Yea:any
UnitList:any
   currentYear = this.today.getFullYear();
   financialYearStart = new Date(this.currentYear, 3, 1); // assuming financial year starts from April 1st
   financialYearEnd = new Date(this.currentYear + 1, 2, 31); // assuming financial year ends on March 31st of next year

   lastDayOfPrevMonth:any
   secondLastDayOfPrevMonth:any

   TodayOnlyDate:any

      Sales:any=[{}]
      Salesclass:any=[{}]
      SalesclassData:any=[{}]
      SalesisSubmitted:any
      SalesClassisSubmitted:any
  //var

  constructor(
    public http: HttpClient,
    private datePipe: DatePipe,
    private Commonservice: CommonService,
    private excelService: ExcelService,
    ) { }

    ngOnInit(): void
    {
  //date
  this.gettitles()
  // this.UnitList=JSON.parse(this.LoginData.UNITS)

  // this.TodayOnlyDate=this.datePipe.transform(this.today, 'dd')

  // if (this.today >= this.financialYearStart && this.today <= this.financialYearEnd)
  // {
  //   this.Financial_Yea=(this.currentYear + '-' + (this.currentYear + 1).toString().slice(-2))
  // }
  // else
  // {
  //   this.Financial_Yea=((this.currentYear - 1) + '-' + this.currentYear.toString().slice(-2));
  // }

  // var firstDayOfThisMonth = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
  // var lastDayOfPrevMonth = new Date(firstDayOfThisMonth.getTime() - 1);

  // this.DisplayLastMonthYear=this.datePipe.transform(lastDayOfPrevMonth, 'MMMM yyyy')
  // var secondLastDayOfPrevMonth = new Date(lastDayOfPrevMonth.getFullYear(), lastDayOfPrevMonth.getMonth(), lastDayOfPrevMonth.getDate() - 1);

  // this.secondLastDayOfPrevMonth=secondLastDayOfPrevMonth
  // this.lastDayOfPrevMonth=lastDayOfPrevMonth

  // this.lastDayOfPrevMonthfin=this.datePipe.transform(lastDayOfPrevMonth, 'MM/dd/yyyy')


  //date
     this.getsalesclassification()



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


    getsalesclassification()
  {
    this.Commonservice.enableLoader();
    const Url = this.Commonservice.Url + 'NewSecondrySalesJsoninsedt'

    const param=
    {
      username:this.LoginData.employeeNo,
      EmployeeType:this.LoginData.EmployeeType,
      userid:this.LoginData.userid,
      Divid:this.LoginData.DivisionId,
    }

    this.http.post(Url, param).subscribe((response:any) => {
      const status='status' ; const Data='Data' ; const count='count'; const IsSubmitted='IsSubmitted';
      if(response[status])
      {
        this.Commonservice.disableLoader();
        this.Salesclass=response[Data]
        console.log(response[IsSubmitted])
         this.SalesClassisSubmitted=response[IsSubmitted]=="1" ? true : false
        this.Salesclass.forEach((element:any) =>
        {

        element.disable=
        element.indata=JSON.parse(element.data)

        });

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

    console.log(this.Salesclass)

    const Url = this.Commonservice.Url + 'NewInsertPlantSecondrySales'
    const param=
    {
      username:this.LoginData.employeeNo,
      userid:this.LoginData.userid,
      usertype:this.LoginData.EmployeeType,
      data:JSON.stringify(this.Salesclass),
      division:this.LoginData.division,
      action:isSubmit ? '1' : '0',
      todayDate:this.lastDayOfPrevMonthfin
    }


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
    this.Commonservice.OpenSwal('error',response[Message],5000)
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
//Submit ends
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
    this.Commonservice.OpenSwal('error',response[Message],5000)
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
       timer:1500,
       timerProgressBar: true,
      })
  }
})
//save ends
      }

  }


  CalcluateSalesClass(i:any,j:any,ev:any)
  {
    console.log(ev)


    const item = this.Salesclass[j].indata[i];
    console.log(item)
    let prosal = Number(item.OE) + Number(item.Retail) + Number(item.Export);
    this.Salesclass[j].indata[i].ProductSales=prosal.toFixed(2)

    let partJSON=this.Salesclass[j].indata

    this.Salesclass[j].indata[3].OE=Number(partJSON[0].OE) + Number(partJSON[1].OE) + Number(partJSON[2].OE)
    this.Salesclass[j].indata[3].Retail=Number(partJSON[0].Retail) + Number(partJSON[1].Retail) + Number(partJSON[2].Retail)
    this.Salesclass[j].indata[3].Export=Number(partJSON[0].Export) + Number(partJSON[1].Export) + Number(partJSON[2].Export)
    this.Salesclass[j].indata[3].ProductSales=Number(partJSON[0].ProductSales) + Number(partJSON[1].ProductSales) + Number(partJSON[2].ProductSales)




  }


  // CalcluateSalesClassB(i:any,j:any)
  // {

  //   console.log(i,j)
  //   const item = this.Salesclass[j].indata[i];
  //   console.log(item)

  //   let prosal = Number(item.OE) + Number(item.Retail) + Number(item.Export);
  //   this.Salesclass[j].indata[i].ProductSales=prosal.toFixed(2)

  //   let partJSON=this.Salesclass[j].indata

  //   this.Salesclass[j].indata[3].OE=Number(partJSON[0].OE) + Number(partJSON[1].OE) + Number(partJSON[2].OE)
  //   this.Salesclass[j].indata[3].Retail=Number(partJSON[0].Retail) + Number(partJSON[1].Retail) + Number(partJSON[2].Retail)
  //   this.Salesclass[j].indata[3].Export=Number(partJSON[0].Export) + Number(partJSON[1].Export) + Number(partJSON[2].Export)
  //   this.Salesclass[j].indata[3].ProductSales=Number(partJSON[0].ProductSales) + Number(partJSON[1].ProductSales) + Number(partJSON[2].ProductSales)
  // }
  // CalcluateSalesClassC(i:any,j:any)
  // {
  //   console.log(i,j)
  //   const item = this.Salesclass[j].indata[i];
  //   console.log(item)
  //   let prosal = Number(item.OE) + Number(item.Retail) + Number(item.Export);
  //   this.Salesclass[j].indata[i].ProductSales=prosal.toFixed(2)

  //   let partJSON=this.Salesclass[j].indata

  //   this.Salesclass[j].indata[3].OE=Number(partJSON[0].OE) + Number(partJSON[1].OE) + Number(partJSON[2].OE)
  //   this.Salesclass[j].indata[3].Retail=Number(partJSON[0].Retail) + Number(partJSON[1].Retail) + Number(partJSON[2].Retail)
  //   this.Salesclass[j].indata[3].Export=Number(partJSON[0].Export) + Number(partJSON[1].Export) + Number(partJSON[2].Export)
  //   this.Salesclass[j].indata[3].ProductSales=Number(partJSON[0].ProductSales) + Number(partJSON[1].ProductSales) + Number(partJSON[2].ProductSales)
  // }


}
