import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { HttpClient } from '@angular/common/http';
import { CommonService } from 'src/app/services/common.service';
import { ExcelService } from 'src/app/services/excel.service';

@Component({
  selector: 'app-dasboardview',
  templateUrl: './dasboardview.component.html',
  styleUrls: ['./dasboardview.component.scss']
})
export class DasboardviewComponent implements OnInit {
  //@ViewChild('tableRef', { static: false }) tableRef: ElementRef;

  today = new Date()
  LoginData: any = JSON.parse(sessionStorage.getItem('LoginData') || '{}');
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
     Cmnt:any
     Salesclass:any
     Sales:any=[{}]
     units:any
     Dsvi:any




  constructor(
    private datePipe: DatePipe,
    private Commonservice: CommonService,
    public http: HttpClient,
    public Rout: Router,
    private excelService: ExcelService,
    ) { }

  ngOnInit(): void {
    this.gettitles()
    this.getDashView()
    this.settitlesunits()
    this.getsalesclassification()
  }

  settitlesunits()
  {
    switch(this.LoginData.division) {
      case 'MFD': {
         this.units=
         [
          {name:'CE(Forge)'},
          {name:'IPU'},
          {name:'KPM PM'},
          {name:'PM/ PM II'},
          {name:'Tappet'},
         ]
         break;
      }
      case 'FD': {
        this.units=
        [
         {name:'Padi Hex'},
         {name:'Padi HNF SSU'},
         {name:'Padi Total'},
         {name:'Krishnapuram'},
         {name:'Pondy Unit 1'},
         {name:'WEF'},
        ]
         break;
      }

      case 'Autolec':
        {
          this.units=
        [
         {name:'Bearing'},
         {name:'Cummins'},
         {name:'Depot'},
         {name:'Plant II'},
         {name:'Plant IV'},
        ]
         break;
        }
      case 'PTC':
        {
          this.units=
        [
         {name:'2500'},
         {name:'2600'},
         {name:'2700'},
         {name:'3700'},
        ]
         break;
        }
      case 'UKD':
        {
          this.units=
        [
         {name:'Fasteners'},
         {name:'PM'},
         {name:'Pumps'},
        ]
         break;
        }
      case 'RCA':
        {
          this.units=
        [
         {name:'RCA'},
        ]
         break;
        }
      case 'ASD':
        {
          this.units=
        [
         {name:'ASD'},
        ]
         break;
        }
      case 'HWF':
        {
          this.units=
        [
         {name:'HWF'},
        ]
         break;
        }
      default: {
         //statements;
         break;
      }
   }
  }


  getDashView()
  {
    this.Commonservice.enableLoader();
    const Url = this.Commonservice.Url + 'GetFSDashboardData'
    const param=
    {
      employeeNo:this.LoginData.employeeNo,
      DivisionId:this.LoginData.DivisionId,
      division:this.LoginData.division,
      subusertype:this.LoginData.subusertype,
      finyear:this.Financial_Yea
    }

    this.http.post(Url, param).subscribe((response:any) => {
      const status='status' ; const Message='Message' ; const Data='Data'
      if(response[status])
      {
        this.Commonservice.disableLoader();
        this.Dsvi=response[Data]
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
    var lastDayOfPrevMonth = new Date(firstDayOfThisMonth.getTime() - 1);

    this.DisplayLastMonthYear=this.datePipe.transform(lastDayOfPrevMonth, 'MMMM yyyy')
    var secondLastDayOfPrevMonth = new Date(lastDayOfPrevMonth.getFullYear(), lastDayOfPrevMonth.getMonth(), lastDayOfPrevMonth.getDate() - 1);

    this.secondLastDayOfPrevMonth=secondLastDayOfPrevMonth
    this.lastDayOfPrevMonth=lastDayOfPrevMonth

    this.lastDayOfPrevMonthfin=this.datePipe.transform(lastDayOfPrevMonth, 'MM/dd/yyyy')
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
      const status='status' ; const Data='Data' ; const count='count'; const comments='comments';
      if(response[status])
      {
        this.Commonservice.disableLoader();
        this.Salesclass=response[Data]
        this.Cmnt=response[comments]
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

  DownloadXL()
  {


    this.Commonservice.enableLoader();
    const Url = this.Commonservice.DUrl + 'makepdf'

    const param=
    {
      username:this.LoginData.employeeNo,
      EmployeeType:this.LoginData.EmployeeType,
      userid:this.LoginData.userid,
      Divid:this.LoginData.DivisionId,
    }

    this.http.post(Url, param).subscribe((response:any) => {
      const status='status' ; const Data='Data' ; const count='count'; const comments='comments';
      // if(response[status])
      // {
      //   this.Commonservice.disableLoader();
      //   this.Salesclass=response[Data]
      //   this.Cmnt=response[comments]
      //   this.Salesclass.forEach((element:any) =>
      //   {

      //   element.disable=
      //   element.indata=JSON.parse(element.data)

      //   });
      // }
      // else
      // {
      //   this.Commonservice.disableLoader();
      //  this.Commonservice.openSnackBar('Something Went Wrong',3000);
      // }

    },
    (error: any) => {
      this.Commonservice.disableLoader();
      this.Commonservice.openSnackBar('Server Response Error. Try Again', 4000);
    })

  }

  makeExcel()
  {



  }

  makePdfPost() {

    const Url = this.Commonservice.Url + 'generate-pdf-post'
    //const Url = this.Commonservice.DUrl + 'generate-pdf-post'

   this.Commonservice.enableLoader();

const imgsrc="./assets/Images/logo1.png"

const TableRow = this.Dsvi
const TableCol = this.units

const tableRows = TableRow.map((rca:any) => `
      <tr>
        <td>${rca.titles}</td>
        <td>${rca.RCA}</td>
        <td>${rca.RCA}</td>
      </tr>
    `).join('');

const tableCols = TableCol.map((cols:any) => `
      <tr>
        <td>${cols.name}</td>
      </tr>
    `).join('');


const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>HTML to PDF</title>
      </head>

      <style>

      h1{
        font-family: 'Arial';
          font-size: 24px;
          line-height: 27px;
          color: #000000;
          font-weight: bold;
          font-style: normal;
          text-decoration: none;
      }

table {
            border-collapse: collapse;
            width: 100%;
          }
          th, td {
            border: 1px solid #000;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }

      </style>

      <body>

        <h1>Flash Sales Report &nbsp; &nbsp; Financial Year : ${this.Financial_Yea} &nbsp; &nbsp;   ${this.DisplayLastMonthYear}</h1>


        <table style="width: 100%;border:1px solid #000;border-collapse: collapse;">

            <tr>
            <th style="text-align: center;border:1px solid #000;background-color: #f0f0f0;border-collapse: collapse;padding: 0.5rem 0.5rem;" rowspan=3></th>
            <th style="text-align: center;border:1px solid #000;background-color: #f0f0f0;border-collapse: collapse;padding: 0.5rem 0.5rem;" colspan=${this.units.length}>Division Name :${this.LoginData.division}</th>
            <th style="text-align: center;border:1px solid #000;background-color: #f0f0f0;border-collapse: collapse;padding: 0.5rem 0.5rem;" rowspan=3>Grand Total</th>
            </tr>

            <tr style="text-align: center;border:1px solid #000;background-color: #f0f0f0;border-collapse: collapse;padding: 0.5rem 0.5rem;">${tableCols}</tr>

            <tbody>${tableRows}</tbody>

        </table>

      </body>
      </html>
    `;




this.http.post(Url, { htmlContent }, {
responseType: 'blob',
}).subscribe(
(response: Blob) => {

  const blobURL = URL.createObjectURL(response);


  const link = document.createElement('a');
  link.href = blobURL;
  link.download = 'DashboardView.pdf';


  link.click();


  URL.revokeObjectURL(blobURL);
  this.Commonservice.disableLoader();
},
(error) => {
  console.log('Error downloading PDF:', error);
  this.Commonservice.disableLoader();
}
);
}

makePdfnew()
{
  this.Commonservice.enableLoader();
  const trypdf=document.getElementById('mytab') as HTMLElement
  html2canvas(trypdf,{}).then(canvas=>{
      const imgData=canvas.toDataURL('imgage/png');
      const pageWidth=210
      const pageHeight=297
      const pdf=new jsPDF("p","mm","a4")
      pdf.addImage(imgData,'PNG',0,0,pageWidth,pageHeight)
      this.Commonservice.disableLoader();
      pdf.save('DashboardView.pdf')
      this.Commonservice.disableLoader();
    })




}


}


