import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from 'src/app/services/common.service';
import { NgForm ,FormControl,FormGroup} from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-state-timing',
  templateUrl: './state-timing.component.html',
  styleUrls: ['./state-timing.component.scss']
})
export class StateTimingComponent implements OnInit {
  statelist:any=[]
  Timinglist:any=[]
  Slectedstate:any

  // @ViewChild('myForm') form: NgForm;

  form:any={}
  isUpdate:boolean=false
  UpdateID=''

  LoginData: any = JSON.parse(sessionStorage.getItem('LoginData') || '{}');
  constructor(public http: HttpClient,
              public Commonservice:CommonService,
              public Pipe:DatePipe) {
this.getStates()
   }

  ngOnInit(): void {
  }

  getStates()
  {
    this.Commonservice.enableLoader()
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

          this.statelist=response[States] || []
          this.Timinglist=response[Data] || []
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

  Submit(form:NgForm)
  {


    this.Commonservice.enableLoader()
    const Url= this.Commonservice.Url + 'InsStateTimings'

    let Today=new Date()
    let Todayfin=this.Pipe.transform(Today,'YYYY-MM-dd')

    const formatData={
      Id: this.UpdateID ? this.UpdateID:'',
      State: this.form.state,
      c1timing: this.form.c1,
      c2timing:this.form.c2,
      c3timing:this.form.c3,
      c4timing:this.form.c4,
      c5timing:this.form.c5,
      createddate: Todayfin,
      createdby: this.LoginData.userid,
  };
      const params={
        username:this.LoginData.employeeNo,
        data:JSON.stringify(formatData),
        userid:this.LoginData.userid,
        id:this.UpdateID ? this.UpdateID:'',
        statename:this.form.state
      }



    this.http.post(Url, params).subscribe((response:any) => {
      const status='status' ; const Data='Data' ;const States='States'
      if(response[status])
      {

          this.getStates()
           this.form.state=" "
           this.form.c1=" "
          this.form.c2=" "
          this.form.c3=" "
          this.form.c4=" "
          this.form.c5=" "
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

  edit(rowdata:any)
  {
    console.log(rowdata)
    this.isUpdate=true
    this.UpdateID=rowdata.Id
    this.form.state=rowdata.State
      this.form.c1=rowdata.c1timing
      this.form.c2=rowdata.c2timing
      this.form.c3=rowdata.c3timing
      this.form.c4=rowdata.c4timing
      this.form.c5=rowdata.c5timing
  }


}
