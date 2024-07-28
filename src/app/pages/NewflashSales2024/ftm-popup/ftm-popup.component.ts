import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { forkJoin } from 'rxjs';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ftm-popup',
  templateUrl: './ftm-popup.component.html',
  styleUrls: ['./ftm-popup.component.scss']
})
export class FTMPopupComponent implements OnInit {
  LoginData: any = JSON.parse(sessionStorage.getItem('LoginData') || '{}');
  // FTMForm!: FormGroup;
  // YTMForm!: FormGroup;
  SelUnitName:string=''
  Unitlist: any[] = [];
  Segmentlist: any[] = [
    {Name:'OE'},
    {Name:'Retail'},
    {Name:'Export'},
    {Name:'IPT sales'},
    {Name:'Scrap Sales'}
  ];

  ReasonCommon: any[] = [];
  ReasonCommonj: any[] = [];



  Date= new Date()
  Lastmonth:any

  submitted = false;

  Month:any

  CurrentFinYear:any

  FTMForm!: FormGroup;
  YTMForm!: FormGroup;

  FTM: any=[];
  YTM: any=[];

  constructor(public dialogRef: MatDialogRef<FTMPopupComponent>,
    public http: HttpClient,
    private fb: FormBuilder,
    public pipe:DatePipe,
    private Commonservice: CommonService,) { }




  ngOnInit(): void {

    this.FTMForm = this.fb.group({
      ftm: this.fb.array([])
      // ftm: this.fb.array([this.createFTMUnit()])
    });
    this.YTMForm = this.fb.group({
      ytm: this.fb.array([])
    });

    this.getUnits()
    this.AllotHeaders()


        const yesterday = new Date(this.Date);
        yesterday.setMonth(this.Date.getMonth() - 1);
        this.Lastmonth=yesterday
  }

  createFTMUnit() {
    return this.fb.group({
      segment: ['', Validators.required],
      reason: ['', Validators.required],
      values: ['', Validators.required]
    });
  }
  createYTMUnit() {
    return this.fb.group({
      segment: ['', Validators.required],
      reason: ['', Validators.required],
      values: ['', Validators.required]
    });
  }



  get ftm(): FormArray {
    return this.FTMForm.get('ftm') as FormArray;
  }
  get ytm(): FormArray {
    return this.YTMForm.get('ytm') as FormArray;
  }

  createUnitftm() {
    return this.fb.group({
      segment: [''],
      reason: [''],
      values:['']
    });
  }


  addUnitftm() {
    this.ftm.push(this.createUnitftm())
  }

  createUnitytm() {
    return this.fb.group({
      segment: [''],
      reason: [''],
      values:['']
    });
  }


  addUnitytm() {
    this.ytm.push(this.createUnitytm())
  }

  submit()
  {
    console.log(this.ftm.invalid)
  }

  insertFTM()
  {
    const Url= this.Commonservice.Url + 'InsFTM'
    const Url2= this.Commonservice.Url + 'InsYTM'

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth()+1;

    let ftmfin = this.ftm.value.filter((item:any) => item.reason.trim() !== '');
    let ytmfin = this.ytm.value.filter((item:any) => item.reason.trim() !== '');

    let ftmsum=0
    for (let index = 0; index < ftmfin.length; index++)
    {
      ftmsum=Number(ftmfin[index].values)+ftmsum
    }


    let ytmsum=0
    for (let index = 0; index < ytmfin.length; index++)
    {
      ytmsum=Number(ytmfin[index].values)+ytmsum
    }


    const params=
    {
    username:this.LoginData.employeeNo,
    userid:this.LoginData.userid,
    DivName:this.LoginData.division,
    data:JSON.stringify(ftmfin),
    Unit:this.SelUnitName,
    month:currentMonth,
    Finyear:this.CurrentFinYear
    }

    const params2=
    {
    username:this.LoginData.employeeNo,
    userid:this.LoginData.userid,
    DivName:this.LoginData.division,
    data:JSON.stringify(ytmfin),
    Unit:this.SelUnitName,
    month:currentMonth,
    Finyear:this.CurrentFinYear
    }


    const postRequest1 = this.http.post<any>(Url, params);
    const postRequest2 = this.http.post<any>(Url2, params2);

    if(this.ftm.invalid || this.ytm.invalid)
    {
      this.Commonservice.openSnackBar('Kindly Enter all the Feilds', 3000);
      return
    }
    else
    {

      if(params.Unit)
    {

      const today = new Date();
      const isFirstDayOfMonth = today.getDate() === 1;

      const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      const isLastDayOfMonth = today.getDate() === lastDayOfMonth.getDate();

      const SwalHtml='Do you want to submit <b> FTM , YTM </b> values for this month <br> <br> FTM = '+ftmsum+' YTM = '+ytmsum+''

      Swal.fire({
        title: "Are you sure ?",
        html:SwalHtml,
        showDenyButton: false,
        icon:'question',
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed)
        {

          // this.Commonservice.enableLoader()
      // forkJoin([postRequest1, postRequest2]).subscribe(
      //   ([response1, response2]) => {

      //     console.log('Response 1:', response1);
      //     console.log('Response 2:', response2);

      //     if(response1.status && response2.status)
      //     {
      //       this.Commonservice.openSnackBar('Submitted Successfully', 3000);
      //       this.close()
      //       this.Commonservice.disableLoader();
      //     }
      //     else
      //     {
      //       this.Commonservice.disableLoader();
      //     }

      //   },
      //   error => {
      //     console.error('Error:', error);
      //   }
      // );

        } else if (result.isDenied) {



        }
      });




      // if (isFirstDayOfMonth) {
      //   console.log('Today is the first day of the month.',isFirstDayOfMonth);
      // } else if (isLastDayOfMonth) {
      //   console.log('Today is the last day of the month.',isLastDayOfMonth);
      // } else {
      //   console.log('Today is neither the first nor the last day of the month.',isFirstDayOfMonth,isLastDayOfMonth);
      // }
    }
    else
    {
      this.Commonservice.openSnackBar('Kindly select Unit', 3000);
    }

    }
  }


  close()
  {
    this.dialogRef.close()
  }

  GetFtmYtm(eev:any)
  {
    this.Commonservice.enableLoader()
    const Url= this.Commonservice.Url + 'GetFTMYTM'

    const params={username:this.LoginData.employeeNo,
                userid:this.LoginData.userid,
                DivName:this.LoginData.division,
                Unit:eev.value,
                Finyear:this.CurrentFinYear}

    this.http.post(Url, params).subscribe((response:any) => {
      const status='status' ; const ftm='ftm' ;const ytm='ytm' ;
      if(response[status])
      {
          this.FTM=response[ftm] || []
          this.YTM=response[ytm] || []
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

  getUnits()
    {
      this.Commonservice.enableLoader()
      const Url= this.Commonservice.Url + 'GettingUnits'
      const params={
        username:this.LoginData.employeeNo,
        userid:this.LoginData.userid,
        usertype:this.LoginData.EmployeeType,
        subusertype:this.LoginData.subusertype,
        DivisionId:this.LoginData.DivisionId,
      }

      this.http.post(Url, params).subscribe((response:any) => {
        const status='status' ; const Data='Data' ;
        if(response[status])
        {

            this.Unitlist=response[Data]
            response[Data].length===1 ? this.SelUnitName=response[Data][0].UnitName :  this.SelUnitName=''

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


    setReason(segment: string, index: number)
    {

      this.ftm.value[index].reason=''
      console.log(this.ftm.value)


      let ExportReason=[
        {reason:'Reversal of Sales - Invoice but let export date not received'},
        {reason:'Accounting of sales - Invoiced but let export date received in the subsequent month'},
        {reason:'Price Increase'},
        {reason:'Price decrease'},
        {reason:'DN to be raised on customers '},
        {reason:'CN to be issued on customers'},
        {reason:'Accounting of sales - Invoiced, yet to be scanned'},
        {reason:'Accounting of Sales - Ex-works customer'},
      ]

      let OEReason=[
        {reason:'Price Increase'},
        {reason:'Price decrease'},
        {reason:'DN to be raised on customers '},
        {reason:'CN to be issued on customers'},
        {reason:'Accounting of sales - Invoiced, yet to be scanned'},
        {reason:'Accounting of Sales - Ex-works customer'},
      ]
      let RetailReason=[
        {reason:'Price Increase'},
        {reason:'Price decrease'},
        {reason:'DN to be raised on customers '},
        {reason:'CN to be issued on customers'},
        {reason:'Accounting of sales - Invoiced, yet to be scanned'},
        {reason:'Accounting of Sales - Ex-works customer'},
        {reason:'Reversal of Sales due to Non receipt of LR copy'},
        {reason:'Accounting of sales reversal due to Non receipt of LR copy'},

      ]

      let IPTReason=[
        {reason:'Price Increase'},
        {reason:'Price decrease'},
        {reason:'DN to be raised on customers '},
        {reason:'CN to be issued on customers'},
        {reason:'Accounting of sales - Invoiced, yet to be scanned'},
        {reason:'Accounting of Sales - Ex-works customer'},
      ]

      let Scrapreason=[
        {reason:'bulk product scrap'}
      ]

      switch (segment) {
        case 'OE':
          this.ReasonCommon[index] = OEReason;
          break;
        case 'Retail':
          this.ReasonCommon[index] = RetailReason;
          break;
        case 'Export':
          this.ReasonCommon[index] = ExportReason;
          break;
        case 'IPT sales':
          this.ReasonCommon[index] = IPTReason;
          break;
        case 'Scrap Sales':
          this.ReasonCommon[index] = Scrapreason;
          break;
        default:
          this.ReasonCommon[index] = [];
          break;
      }


    }
    setReasonj(segment: string, indexj: number)
    {

      this.ytm.value[indexj].reason=''
      console.log(this.ytm.value)

      let ExportReason=[
        {reason:'Reversal of Sales - Invoice but let export date not received'},
        {reason:'Accounting of sales - Invoiced but let export date received in the subsequent month'},
        {reason:'Price Increase'},
        {reason:'Price decrease'},
        {reason:'DN to be raised on customers '},
        {reason:'CN to be issued on customers'},
        {reason:'Accounting of sales - Invoiced, yet to be scanned'},
        {reason:'Accounting of Sales - Ex-works customer'},
      ]

      let OEReason=[
        {reason:'Price Increase'},
        {reason:'Price decrease'},
        {reason:'DN to be raised on customers '},
        {reason:'CN to be issued on customers'},
        {reason:'Accounting of sales - Invoiced, yet to be scanned'},
        {reason:'Accounting of Sales - Ex-works customer'},
      ]
      let RetailReason=[
        {reason:'Price Increase'},
        {reason:'Price decrease'},
        {reason:'DN to be raised on customers '},
        {reason:'CN to be issued on customers'},
        {reason:'Accounting of sales - Invoiced, yet to be scanned'},
        {reason:'Accounting of Sales - Ex-works customer'},
        {reason:'Reversal of Sales due to Non receipt of LR copy'},
        {reason:'Accounting of sales reversal due to Non receipt of LR copy'},

      ]

      let IPTReason=[
        {reason:'Price Increase'},
        {reason:'Price decrease'},
        {reason:'DN to be raised on customers '},
        {reason:'CN to be issued on customers'},
        {reason:'Accounting of sales - Invoiced, yet to be scanned'},
        {reason:'Accounting of Sales - Ex-works customer'},
      ]

      let Scrapreason=[
        {reason:'bulk product scrap'}
      ]

      switch (segment) {
        case 'OE':
          console.log(segment)
          this.ReasonCommonj[indexj] = OEReason;
          break;
        case 'Retail':
          console.log(segment)
          this.ReasonCommonj[indexj] = RetailReason;
          break;
        case 'Export':
          console.log(segment)
          this.ReasonCommonj[indexj] = ExportReason;
          break;
        case 'IPT sales':
          console.log(segment)
          this.ReasonCommonj[indexj] = IPTReason;
          break;
        case 'Scrap Sales':
          console.log(segment)
          this.ReasonCommonj[indexj] = Scrapreason;
          break;
        default:
          this.ReasonCommonj[indexj] = [];
          break;
      }


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
