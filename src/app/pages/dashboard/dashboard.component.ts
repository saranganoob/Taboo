import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from 'src/app/services/common.service';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  LoginData: any = JSON.parse(sessionStorage.getItem('LoginData') || '{}');
  bardata:any
  DisplayLastMonthYear:any
  today=new Date()

  constructor(
    public http: HttpClient,
    private Commonservice: CommonService,
    private datePipe: DatePipe,
    ) { }

  ngOnInit(): void {




    if(this.LoginData.EmployeeType=='sales' && this.LoginData.subusertype==1)
    {
      this.getbardata()
    }

    let firstDayOfThisMonth = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
   let  lastDayOfPrevMonth = new Date(firstDayOfThisMonth.getTime() - 1);
this.DisplayLastMonthYear=this.datePipe.transform(lastDayOfPrevMonth, 'MMMM yyyy')


  }

  getbardata()
  {

    this.Commonservice.enableLoader();
const Url = this.Commonservice.Url + 'getbardata'
const para=
{
  username:this.LoginData.employeeNo,
  usertype:this.LoginData.userid,
  subusertype:this.LoginData.subusertype

}

this.http.post(Url, para).subscribe((response:any) => {
  const status='status' ; const Data='Data' ; const count='count' ; const Message='Message'
  if(response[status])
  {
     this.Commonservice.disableLoader();
    // this.bardata=response[Data][0]
    this.bardata=response[Data]
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


}
