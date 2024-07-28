import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-solar-summary-forecast',
  templateUrl: './solar-summary-forecast.component.html',
  styleUrls: ['./solar-summary-forecast.component.scss']
})
export class SolarSummaryForecastComponent implements OnInit {

    LoginData: any = JSON.parse(sessionStorage.getItem('LoginData') || '{}');

    statelist:any
    SelState:any

    SummaryData: {
      HtscCode:string,
      powerlimit:any,
      Plant:string,
      C1_value_EFC:any,
      C2_value_EFC:any,
      C3_value_EFC:any,
      C4_value_EFC:any,
      C5_value_EFC:any,
      C_value_EFC:any
    }[] = [];

    Timings:any
    Totals:any

    LetExcel=
  {
    SummaryData:this.SummaryData,
    IsForeCast:true,
    Name:'Solar Energy Forecast Summary'
  }

  currentMonth=this.Commonservice.currentMonth
  currentYear=this.Commonservice.currentYear

    constructor(public http: HttpClient,
      private Commonservice: CommonService,) { }

    ngOnInit(): void
    {

    }


    getsummary(eve:any)
    {

      this.Commonservice.enableLoader();
      const Urlq = this.Commonservice.Url + 'SummaryofSolar'
      const para=
      {
        username:this.LoginData.employeeNo,
        usertype:this.LoginData.userid,
        state:eve.value,
        month:this.currentMonth,
      year:this.currentYear
      }

      this.http.post(Urlq, para).subscribe((response:any) => {
        const status='status' ; const Data='Data' ; const Timing='Timing' ;const Total='Total'
        if(response[status])
        {
           this.SummaryData=response[Data] || []
           this.Timings=response[Timing][0] || []
           this.Totals=response[Total][0] || []
           this.LetExcel.SummaryData=response[Data] || []
           this.Commonservice.disableLoader();
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

    SetState(data: any) {
      this.getsummary(data)
    }

    Setfilters(para:any)
    {
      console.log('para',para)
      let state={value:para.state}
      this.currentMonth=para.mon
      this.currentYear=para.fy
      this.getsummary(state)
    }


  }
