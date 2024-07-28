import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe, ViewportScroller } from '@angular/common';
import { CommonService } from 'src/app/services/common.service';
import { ExcelService } from 'src/app/services/excel.service';
import { Inject} from "@angular/core";
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss']
})
export class AddNewComponent implements OnInit {
  TabDatas:any
  LoginData: any = JSON.parse(sessionStorage.getItem('LoginData') || '{}');
  DisableToDate=true
  showresetbutton=false
  finy:any
  itemsperpage = 20;
  currentPage = 1;
  financialYears: string[] = [];

  months:any=[];
  divlist:any
  Unitlist:any
  Seldiv:any
  Selmon:any
  Selunit:any

  Showfilbutton:boolean=true

  MonList=[
    {name:'January',id:1,isDisable:false},
        {name: 'February',id:2,isDisable:false},
        {name: 'March',id:3,isDisable:false},
        {name: 'April',id:4,isDisable:false},
        {name: 'May',id:5,isDisable:false},
        {name: 'June',id:6,isDisable:false},
        {name:'July',id:7,isDisable:false},
        {name: 'August',id:8,isDisable:false},
        {name: 'September',id:9,isDisable:false},
        {name: 'October',id:10,isDisable:false},
        {name: 'November',id:11,isDisable:false},
        {name: 'December',id:12,isDisable:false}
  ];

  totalItems:any
  today=new Date()
  DisplayLastMonthYear:any
  edate:any
  sdate:any

   currentYear = new Date().getFullYear();
   nextYear = this.currentYear + 1;
   financialYear = `${this.currentYear}-${(this.nextYear % 100).toString().padStart(2, '0')}`;


  constructor(
    public http: HttpClient,
    private datePipe: DatePipe,
    private excelService: ExcelService,
    private viewportScroller: ViewportScroller,
    @Inject(DOCUMENT) private document: Document,
    private Commonservice: CommonService,) { }
  ngOnInit(): void
  {

    this.Commonservice.enableLoader();
    const param=
    {
      username:this.LoginData.employeeNo,
      usertype:this.LoginData.EmployeeType,
      fromdate:'',
      todate:'',
      pagenumber:this.currentPage,
      finance:this.financialYear,
      fmonth:'',
      divid:'',
      unitid:'',
    }
    this.getsaleFindata(param)
    this.gettitles()
    this.populateFinancialYears();
    this.getdivision()
  }

  gettitles()
  {

    let today = new Date()

    let TodayOnlyDate=this.datePipe.transform(today, 'dd')

    // console.log(TodayOnlyDate)


    if(TodayOnlyDate=='28' || TodayOnlyDate=='29' || TodayOnlyDate=='30' ||TodayOnlyDate=='31')
    {

      let firstDayOfThisMonth = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
      let  lastDayOfPrevMonth = new Date(firstDayOfThisMonth.getTime());
   this.DisplayLastMonthYear=this.datePipe.transform(lastDayOfPrevMonth, 'MMMM yyyy')
    }
    else
    {

      let firstDayOfThisMonth = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
      let  lastDayOfPrevMonth = new Date(firstDayOfThisMonth.getTime() - 1);
   this.DisplayLastMonthYear=this.datePipe.transform(lastDayOfPrevMonth, 'MMMM yyyy')
    }

  }




  NGXPageChange(event:any) {
    this.Commonservice.enableLoader();
    this.currentPage = event;

    const param=
    {
      username:this.LoginData.employeeNo,
      usertype:this.LoginData.EmployeeType,
      fromdate:'',
      todate:'',
      pagenumber:this.currentPage,
      finance:this.financialYear?this.financialYear:'',
      // finance:this.finy?this.finy:'',
      fmonth:this.Selmon?this.Selmon:'',
      // finance:this.finy,
      // fmonth:this.Selmon,
      divid:this.Seldiv?this.Seldiv:'',
      unitid:'',
    }

    this.getsaleFindata(param)
  }

  populateFinancialYears() {
    const currentYear = new Date().getFullYear();
    const startYear = 2022;

    for (let year = startYear; year <= currentYear; year++) {
      const formattedYear = `${year}-${(year % 100) + 1}`;
      this.financialYears.push(formattedYear);
    }
  }
  Selectfiny(val:any)
  {

    this.Commonservice.enableLoader();
    const param=
          {
            username:this.LoginData.employeeNo,
            usertype:this.LoginData.EmployeeType,
            fromdate:'',
            todate:'',
            pagenumber:this.currentPage,
            finance:this.finy,
            fmonth:'',
            divid:'',
            unitid:'',
          }
          this.getsaleFindata(param)


    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const financialYear = `${currentYear}-${(nextYear % 100).toString().padStart(2, '0')}`;


    if(val==financialYear)
    {

        const currentDate = new Date();
        const currentMonthIndex = currentDate.getMonth();

        // Disable future months
        for (let i = currentMonthIndex + 1; i < 12; i++)
        {
          this.MonList[i].isDisable = true;
        }
    }
    else
    {
      const currentDate = new Date();
        const currentMonthIndex = currentDate.getMonth();

        // Disable future months
        for (let i = currentMonthIndex + 1; i < 12; i++)
        {
          this.MonList[i].isDisable = false;
        }


    }



  }

  Selectmon(val:any)
  {
    this.Commonservice.enableLoader();
    const param=
          {
            username:this.LoginData.employeeNo,
            usertype:this.LoginData.EmployeeType,
            fromdate:'',
            todate:'',
            pagenumber:this.currentPage,
            finance:this.finy,
            // finance:this.finy,
            fmonth:this.Selmon,
            divid:'',
            unitid:'',
          }
          this.getsaleFindata(param)
  }

  getdivision()
  {
    // this.Commonservice.enableLoader();
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
        //  this.Commonservice.disableLoader();
         this.divlist=response[Data]
      }
      else
      {
        //  this.Commonservice.disableLoader();
      }

    },
    (error: any) => {
      // this.Commonservice.disableLoader();
      this.Commonservice.openSnackBar('Server Response Error. Try Again', 4000);
    })
  }

  Selectdiv(val:any)
  {
    this.Commonservice.enableLoader()
    const Url= this.Commonservice.Url + 'GettingUnits'
    const params={
      username:this.LoginData.employeeNo,
      userid:this.LoginData.userid,
      usertype:this.LoginData.EmployeeType,
      subusertype:this.LoginData.subusertype,
      DivisionId:val
    }

    this.http.post(Url, params).subscribe((response:any) => {
      const status='status' ; const Data='Data' ;
      if(response[status])
      {

          this.Unitlist=response[Data]
      }
      else
      {

      }

    },
    (error: any) => {
      this.Commonservice.disableLoader();
      this.Commonservice.openSnackBar('Server Response Error. Try Again', 4000);
    })

    const param=
    {
      username:this.LoginData.employeeNo,
      usertype:this.LoginData.EmployeeType,
      fromdate:'',
      todate:'',
      pagenumber:this.currentPage,
      finance:this.finy?this.finy:'',
      fmonth:this.Selmon?this.Selmon:'',
      // finance:this.finy,
      // fmonth:this.Selmon,
      divid:this.Seldiv,
      unitid:'',
    }
    this.getsaleFindata(param)



  }

  SelectUnit(val:any)
  {
    this.Commonservice.enableLoader();

    const param=
    {
      username:this.LoginData.employeeNo,
      usertype:this.LoginData.EmployeeType,
      fromdate:'',
      todate:'',
      pagenumber:this.currentPage,
      finance:this.finy,
      fmonth:this.Selmon,
      divid:this.Seldiv,
      unitid:this.Selunit,
    }
    this.getsaleFindata(param)

  }


  getsaleFindata(param:any)
  {

    this.Commonservice.enableLoader();
    const Url = this.Commonservice.Url + 'getsaledata'


    this.http.post(Url, param).subscribe((response:any) => {
      const status='status' ; const Data='Data' ; const count='count'
      if(response[status])
      {
        this.Commonservice.disableLoader();
        this.TabDatas=response[Data]
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


  clearfilter()
  {

    this.Seldiv=''
    this.Selmon=''
    this.Selunit=''
    this.finy=''


    const param=
    {
      username:this.LoginData.employeeNo,
      usertype:this.LoginData.EmployeeType,
      fromdate:'',
      todate:'',
      pagenumber:1,
      finance:this.financialYear,
      fmonth:'',
      divid:'',
      unitid:'',
    }
    this.getsaleFindata(param)
  }



  exportExcel(): void {

  const fileToExport = this.TabDatas.map((items:any) => {
  return {
  "Division": items?.Division,
  "Unit": items?.Unit,
  "OE": items?.OE,
  "Retail": items?.Retail,
  "Export": items?.Export,
  "Product Sales": items?.ProductSales,
  "Db Notes": items?.DbNotes,
  "Cr Notes": items?.CrNotes,
  "Net Product Sales": items?.NetProductSales,
  "Scrap Sales": items?.ScrapSales,
  "Total Sales": items?.TotalSales,
  "Cum Adj": items?.CumAdj,
  "Adj Sales": items?.AdjSales,
  "IPT sales": items?.IPTSales,
  "Budgeted Sales": items?.BudgetedSales,
  "Month": this.datePipe.transform(items?.Month, 'M/d/yyyy'),
  "Financial Year": items?.FinancialYear,
  "Created By & Date": items?.createdby+'-'+this.datePipe.transform(items?.createddatetime, 'yyyy-MM-dd'),
  "Modified By & Date": items?.modifiedby+'-'+this.datePipe.transform(items?.modifieddate, 'yyyy-MM-dd'),
  }
  });

  const date = new Date();
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, '0');
const day = String(date.getDate()).padStart(2, '0');
const hour = String(date.getHours()).padStart(2, '0');
const minute = String(date.getMinutes()).padStart(2, '0');

const formattedDateTime = `${day}_${month}_${year}__${hour}_${minute}_`;

  this.excelService.exportToExcel(
  fileToExport,
  'FlashSales_Final_'+formattedDateTime+''
  );
  }

  }



