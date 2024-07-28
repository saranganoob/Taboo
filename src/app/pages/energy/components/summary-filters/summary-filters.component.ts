import { Component, OnInit,Output,EventEmitter,Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from 'src/app/services/common.service';


@Component({
  selector: 'app-summary-filters',
  templateUrl: './summary-filters.component.html',
  styleUrls: ['./summary-filters.component.scss']
})
export class SummaryFiltersComponent implements OnInit {

  statelist:any
  SelState:any

  LoginData: any = JSON.parse(sessionStorage.getItem('LoginData') || '{}');


  @Output() SendState: EventEmitter<any> = new EventEmitter<any>();
  @Output() SendFilters: EventEmitter<any> = new EventEmitter<any>();

  FYList=[
    {year:'2024-2025'},
    {year:'2023-2024'},
    {year:'2022-2023'},
  ]

  QuartarList=[
    {quar:1},
    {quar:2},
    {quar:3},
    {quar:4},
  ]

  MonthList=[
    {MonName:'Jan',Id:1},
    {MonName:'Feb',Id:2},
    {MonName:'Mar',Id:3},
  ]


  FinYear=this.Commonservice.currentYear
  Month=this.Commonservice.currentMonth
  Quartar=this.Commonservice.currentQuarter

  constructor(
    public http: HttpClient,
    private Commonservice: CommonService,) { }




  ngOnInit(): void
  {
    this.getStates()
    const quat={value:this.Quartar}
    this.SetQuartar(quat)
  }

  SetState(eve:any) {
    this.SendState.emit(eve); // Emitting data to the parent
  }

  SetFY(eve:any)
  {
    let filterParams=
    {
      state:this.SelState,
      fy:eve.value,
      mon:this.Month
    }

    console.log(filterParams)
    // this.SendFilters.emit(eve.value)
    this.SendFilters.emit(filterParams)



  }

  SetQuartar(eve:any)
  {
    switch(eve.value)
    {
      case 1:
        {
          this.MonthList=[
            {MonName:'Apr',Id:4},
            {MonName:'May',Id:5},
            {MonName:'Jun',Id:6},
          ]
          break;
        }
      case 2:
        {
          this.MonthList=[
            {MonName:'Jul',Id:7},
            {MonName:'Aug',Id:8},
            {MonName:'Sep',Id:9},
          ]
          break;
        }
      case 3:
        {
          this.MonthList=[
            {MonName:'Oct',Id:10},
            {MonName:'Nov',Id:11},
            {MonName:'Dec',Id:12},
          ]
          break;
        }
      case 4:
        {
          this.MonthList=[
            {MonName:'Jan',Id:1},
            {MonName:'Feb',Id:2},
            {MonName:'Mar',Id:3},
          ]
          break;
        }
    }


  }

  SetMonth(eve:any)
  {
    console.log('Month',eve.value)
    // this.SendFilters.emit(eve.value)

    let filterParams=
    {
      state:this.SelState,
      fy:this.FinYear,
      mon:eve.value
    }

    console.log(filterParams)
    this.SendFilters.emit(filterParams)

  }

  Reset()
  {
    let SetQua={value:this.Commonservice.currentQuarter}
    this.SetQuartar(SetQua)
    this.FinYear=this.Commonservice.currentYear
  this.Month=this.Commonservice.currentMonth
  this.Quartar=this.Commonservice.currentQuarter

    let filterParams=
    {
      state:this.SelState,
      fy:this.Commonservice.currentYear,
      mon:this.Commonservice.currentMonth
    }

    console.log(filterParams)
    this.SendFilters.emit(filterParams)
  }

  getStates()
  {

    const Url= this.Commonservice.Url + 'EnergyStateTimingDisplay'

    const param= {username:this.LoginData.employeeNo,
      usertype:this.LoginData.EmployeeType,
      userid:this.LoginData.userid,
      actiontype:'all',
      searchword:''}

    this.http.post(Url, param).subscribe((response:any) => {
      const status='status' ; const Data='Data' ;const States='States'
      if(response[status])
      {

          // this.statelist=[
          //   {Name:'Tamil Nadu'},
          //   {Name:'Tamil Nadu'},
          //   {Name:'Tamil Nadu'},
          // ]
          this.statelist=response[States] || []
          if(this.statelist.length==1)
          {
            this.SelState=this.statelist[0].Value
            let Passval={value:this.statelist[0].Value}
            this.SetState(Passval)
          }
      }
      else
      {
      }

    },
    (error: any) => {
      this.Commonservice.openSnackBar('Server Response Error. Try Again', 4000);
    })
  }

}
