import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-viewsaleclass',
  templateUrl: './viewsaleclass.component.html',
  styleUrls: ['./viewsaleclass.component.scss']
})
export class ViewsaleclassComponent implements OnInit {
  today=new Date()
  DisplayLastMonthYear:any
  constructor(
    public http: HttpClient,
    private datePipe: DatePipe,
    private Commonservice: CommonService,) { }

  ngOnInit(): void {
    this.gettitles()
  }

  gettitles()
  {

    let firstDayOfThisMonth = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
    let  lastDayOfPrevMonth = new Date(firstDayOfThisMonth.getTime() - 1);
 this.DisplayLastMonthYear=this.datePipe.transform(lastDayOfPrevMonth, 'MMMM yyyy')
  }

}
