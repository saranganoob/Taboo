import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient} from '@angular/common/http';
import { CommonService } from '../../services/common.service';


@Component({
  selector: 'app-ebita',
  templateUrl: './ebita.component.html',
  styleUrls: ['./ebita.component.scss']
})
export class EbitaComponent implements OnInit {
form:any={}
isUpdate=false
TabDatas:any
today = new Date()
DisplayLastMonthYear:any
  constructor(
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void
  {

    var firstDayOfThisMonth = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
  var lastDayOfPrevMonth = new Date(firstDayOfThisMonth.getTime() - 1);
  this.DisplayLastMonthYear=this.datePipe.transform(lastDayOfPrevMonth, 'MMMM yyyy')

    const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();

// Determine the start year of the financial year
let fyStartYear: number;
if (month >= 3) {
  fyStartYear = year;
} else {
  fyStartYear = year - 1;
}

// Convert the start year to FY23 format
const fyStartYearStr = `FY${(fyStartYear % 100).toString().padStart(2, '0')}`;

// Display the financial year
// console.log(fyStartYearStr);
this.form.month=fyStartYearStr
  }
Submit()
  {}

  edit(Rowdata:any)
  {}
}
