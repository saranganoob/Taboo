import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { CommonService } from 'src/app/services/common.service';
import { ExcelService } from 'src/app/services/excel.service';
import Swal from 'sweetalert2';
import { MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-updatesaleclass',
  templateUrl: './updatesaleclass.component.html',
  styleUrls: ['./updatesaleclass.component.scss']
})
export class UpdatesaleclassComponent implements OnInit {
  today = new Date()
  Financial_Yea:any
  currentYear = this.today.getFullYear();
  financialYearStart = new Date(this.currentYear, 3, 1); // assuming financial year starts from April 1st
  financialYearEnd = new Date(this.currentYear + 1, 2, 31); // assuming financial year ends on March 31st of next year
  lastDayOfPrevMonth:any
  DisplayLastMonthYear:any
  lastDayOfPrevMonthfin:any
  secondLastDayOfPrevMonth:any

  TodayOnlyDate:any
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
    this.getTitle()
  }

  getTitle()
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

    //     today = new Date()
let firstDayOfThisMonth = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
    let lastDayOfPrevMonth = new Date(firstDayOfThisMonth.getTime() - 1);
this.DisplayLastMonthYear=this.datePipe.transform(lastDayOfPrevMonth, 'MMMM yyyy')

this.DisplayLastMonthYear=this.datePipe.transform(lastDayOfPrevMonth, 'MMMM yyyy')
var secondLastDayOfPrevMonth = new Date(lastDayOfPrevMonth.getFullYear(), lastDayOfPrevMonth.getMonth(), lastDayOfPrevMonth.getDate() - 1);

this.secondLastDayOfPrevMonth=secondLastDayOfPrevMonth
this.lastDayOfPrevMonth=lastDayOfPrevMonth

this.lastDayOfPrevMonthfin=this.datePipe.transform(lastDayOfPrevMonth, 'MM/dd/yyyy')
  }

}
