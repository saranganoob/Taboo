import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { FormBuilder} from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-view-ftm-ytm-admin',
  templateUrl: './view-ftm-ytm-admin.component.html',
  styleUrls: ['./view-ftm-ytm-admin.component.scss']
})
export class ViewFtmYtmAdminComponent implements OnInit {

  LoginData: any = JSON.parse(sessionStorage.getItem('LoginData') || '{}');

  SelUnitName:string=''
  SelDivName:any
  Unitlist: any[] = [];
  Segmentlist: any[] = [
    {Name:'OE'},
    {Name:'Retail'},
    {Name:'Export'},
    {Name:'IPT sales '},
    {Name:'Scrap Sales'}
  ];

  FTM_Tot:number=0
  YTM_Tot:number=0

  FTM: any=[];
  YTM: any=[];
  divlist:any

  CurrentFinYear:any
  Date= new Date()
  Lastmonth:any

  constructor(public dialogRef: MatDialogRef<ViewFtmYtmAdminComponent>,
    public http: HttpClient,
    private fb: FormBuilder,
    private Commonservice: CommonService,) { }

  ngOnInit(): void {
    // this.getUnits()
    this.getdivision()
    this.AllotHeaders()

    const yesterday = new Date(this.Date);
        yesterday.setMonth(this.Date.getMonth() - 1);
        this.Lastmonth=yesterday
  }


  getdivision()
  {
    this.Commonservice.enableLoader();
    const Urlq = this.Commonservice.Url + 'getdivdata'
    const para=
    {
      username:this.LoginData.employeeNo,
      usertype:this.LoginData.userid,
    }

    this.http.post(Urlq, para).subscribe((response:any) => {
      const status='status' ; const Data='Data' ; const count='count' ; const Message='Message'
      if(response[status])
      {
         this.Commonservice.disableLoader();
         this.divlist=response[Data]
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

  getUnits(eve:any)
    {

      this.FTM= []
      this.YTM= []

      console.log(eve)
      this.Commonservice.enableLoader()
      const Url= this.Commonservice.Url + 'GettingUnits'
      const params={
        username:this.LoginData.employeeNo,
        userid:this.LoginData.userid,
        usertype:this.LoginData.EmployeeType,
        subusertype:this.LoginData.subusertype,
        DivisionId:eve.Id,
        // DivisionId:this.LoginData.DivisionId,
      }

      this.http.post(Url, params).subscribe((response:any) => {
        const status='status' ; const Data='Data' ;
        if(response[status])
        {

            this.Unitlist=response[Data] || []

            if(this.Unitlist.length===1)
            {
              this.SelUnitName=response[Data][0].UnitName
              const unitname={value:response[Data][0].UnitName}
              this.GetFtmYtm(unitname)
            }

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

    close()
  {
    this.dialogRef.close()
  }


    GetFtmYtm(eev:any)
  {
    this.Commonservice.enableLoader()
    const Url= this.Commonservice.Url + 'GetFTMYTM'

    let Divname=this.SelDivName

    const params={username:this.LoginData.employeeNo,
                userid:this.LoginData.userid,
                DivName:Divname.DivisionName,
                // DivName:this.LoginData.division,
                Unit:eev.value,
                Finyear:this.CurrentFinYear}

    this.http.post(Url, params).subscribe((response:any) => {
      const status='status' ; const ftm='ftm' ;const ytm='ytm' ;
      if(response[status])
      {

          console.log(response)
          this.FTM=response[ftm] || []
          this.YTM=response[ytm] || []

          let ftmSum:number=0
          let ytmSum:number=0


          this.FTM.forEach((element:any) => {
            ftmSum=Number(element.values)+ftmSum
          });


          this.FTM_Tot=ftmSum


          this.YTM.forEach((element:any) => {
            ytmSum=Number(element.values)+ytmSum
          });


          this.YTM_Tot=ytmSum

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

  AllotHeaders()
  {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth()+1;
   if(currentMonth<=3)
   {
     this.CurrentFinYear = currentDate.getFullYear()-1 + '-' + currentDate.getFullYear().toString().slice(-2) ;
   }
   else
   {
     this.CurrentFinYear = currentDate.getFullYear()  + '-' + (currentDate.getFullYear()+1).toString().slice(-2) ;
   }


  }

}
