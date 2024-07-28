import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-summary-admin',
  templateUrl: './summary-admin.component.html',
  styleUrls: ['./summary-admin.component.scss']
})
export class SummaryAdminComponent implements OnInit {

  LoginData: any = JSON.parse(sessionStorage.getItem('LoginData') || '{}');
  statelist:any
  SelState:any
  SummaryData: {
    HtscCode:string,
    Plant:string,
    C1_value_ECC:any,
    C2_value_ECC:any,
    C3_value_ECC:any,
    C4_value_ECC:any,
    C5_value_ECC:any,
    C_value_ECC:any,
    powerlimit:any
  }[] = [];

  Timings:any
  Totals:any

  currentMonth=this.Commonservice.currentMonth
  currentYear=this.Commonservice.currentYear

  LetExcel=
  {
    SummaryData:this.SummaryData,
    IsForeCast:false,
    Name:'Electrical Energy Consumption Summary'
  }


  constructor(
    public http: HttpClient,
    private Commonservice: CommonService,) { }

  ngOnInit(): void
  {
// this.getStates()
  }


  getsummary(eve:any)
  {

    this.Commonservice.enableLoader();
    const Urlq = this.Commonservice.Url + 'SummaryofEnergy'
    const para=
    {
      username:this.LoginData.employeeNo,
      usertype:this.LoginData.userid,
      state:eve.value,
      month:this.currentMonth,
      year:this.currentYear
    }

    this.http.post(Urlq, para).subscribe((response:any) => {
      const status='status' ; const Data='Data' ; const Timing='Timing'; const Total='Total'
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



