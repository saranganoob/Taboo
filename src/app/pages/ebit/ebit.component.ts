import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CommonService } from 'src/app/services/common.service';
@Component({
  selector: 'app-ebit',
  templateUrl: './ebit.component.html',
  styleUrls: ['./ebit.component.scss']
})
export class EbitComponent implements OnInit {
  form:any={}
  Val:any=[]

  DisplayLastMonthYear:any
LoginData: any = JSON.parse(sessionStorage.getItem('LoginData') || '{}');
  today = new Date()
   currentYear = this.today.getFullYear();
   financialYearStart = new Date(this.currentYear, 3, 1); // assuming financial year starts from April 1st
   financialYearEnd = new Date(this.currentYear + 1, 2, 31); // assuming financial year ends on March 31st of next year
   currentFinYear:any

  constructor(
    public http: HttpClient,
    private datePipe: DatePipe,
    private Commonservice: CommonService,
  ) { }

  ngOnInit(): void
  {
  var firstDayOfThisMonth = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
  var lastDayOfPrevMonth = new Date(firstDayOfThisMonth.getTime() - 1);
  this.DisplayLastMonthYear=this.datePipe.transform(lastDayOfPrevMonth, 'MMMM yyyy')

    if (this.today >= this.financialYearStart && this.today <= this.financialYearEnd)
    {
      this.currentFinYear=(this.currentYear + '-' + (this.currentYear + 1).toString().slice(-2))
    }
    else
    {
      this.currentFinYear=((this.currentYear - 1) + '-' + this.currentYear.toString().slice(-2));
    }
  }
  Submit()
  {

let Final=
[
{
  Particular: 'Operating results',
  Item: 'EBITDA' ,
  Fin_Value: this.form.ebifinval,
  Financial_Year: this.currentFinYear
},
{
  Particular: 'Operating results',
  Item: 'EBIT',
  Fin_Value: this.form.ebidfinval,
  Financial_Year: this.currentFinYear
 },
 {
  Particular: 'Operating results',
  Item: 'Profit before tax',
  Fin_Value: this.form.pbtfinval,
  Financial_Year: this.currentFinYear
 },
 {
  Particular: 'Operating results',
  Item: 'Tax',
  Fin_Value: this.form.taxfinval,
  Financial_Year: this.currentFinYear
 },
 {
  Particular: 'Operating results',
  Item: 'Profit after tax',
  Fin_Value: this.form.protainval,
  Financial_Year: this.currentFinYear
 },
 {
  Particular: 'Operating results',
  Item: 'Effective Tax Rate',
  Fin_Value: this.form.eftfinval,
  Financial_Year: this.currentFinYear
 },
 {
  Particular: 'Performance parameters',
  Item: 'EBITDA to revenue from operations',
  Fin_Value: this.form.ebirenoperfinval,
  Financial_Year: this.currentFinYear
 },
 {
  Particular: 'Performance parameters',
  Item: 'PBT to revenue from operations',
  Fin_Value: this.form.pbtrevope,
  Financial_Year: this.currentFinYear
 },
 {
  Particular: 'Performance parameters',
  Item: 'EBIT / average capital employed',
  Fin_Value: this.form.ebitaveempl,
  Financial_Year: this.currentFinYear
 },
 {
  Particular: 'Performance parameters',
  Item: 'EPS-Rs.',
  Fin_Value: this.form.epsrs,
  Financial_Year: this.currentFinYear
 },
 {
  Particular: 'Performance parameters',
  Item: 'Dividend per share-Rs',
  Fin_Value: this.form.divpershare,
  Financial_Year: this.currentFinYear
 },
 {
  Particular: 'Performance parameters',
  Item: 'Dividend payout ratio',
  Fin_Value: this.form.divpayrati,
  Financial_Year: this.currentFinYear
 },
 {
  Particular: 'Performance parameters',
  Item: 'Book value per share-Rs @',
  Fin_Value: this.form.bookvalpershar,
  Financial_Year: this.currentFinYear
 },
 {
  Particular: 'Performance parameters',
  Item: 'Market value per share-Rs',
  Fin_Value: this.form.marketvalsha,
  Financial_Year: this.currentFinYear
 },

]
// console.log(Final)

// this.Commonservice.enableLoader();
        const Url = this.Commonservice.Url + 'InsertEbit'
        const para=
        {
          username:this.LoginData.employeeNo,
          userid:this.LoginData.userid,
          data:Final,
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


}
