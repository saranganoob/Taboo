import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-avg-fx-rate',
  templateUrl: './avg-fx-rate.component.html',
  styleUrls: ['./avg-fx-rate.component.scss']
})
export class AvgFxRateComponent implements OnInit {
  TabDatas:any
  form:any={}
  currentpage=1
  isUpdate=false
  EditData:any

  MonthList:any=[]
  Lmont:any
  FY:any
  LoginData: any = JSON.parse(sessionStorage.getItem('LoginData') || '{}');


    //today = new Date('wed Mar 01 2023 15:53:37 GMT+0530 (India Standard Time)');
    today = new Date()
   currentYear = this.today.getFullYear();
   financialYearStart = new Date(this.currentYear, 3, 1); // assuming financial year starts from April 1st
   financialYearEnd = new Date(this.currentYear + 1, 2, 31); // assuming financial year ends on March 31st of next year

   DisplayfinancialYear:any


  constructor(public http:HttpClient,
    private common:CommonService,
    ) { }

  ngOnInit(): void {


if (this.today >= this.financialYearStart && this.today <= this.financialYearEnd) {
  // console.log('Current Financial Year: ' + this.currentYear + '-' + (this.currentYear + 1));
  //April to Dec
  this.DisplayfinancialYear=(this.currentYear + '-' + (this.currentYear + 1).toString().slice(-2))

this.MonthList.push(
  {name:'Jan',isDisable:true},
  {name:'Feb',isDisable:true},
  {name:'Mar',isDisable:true},
  {name:'Apr',isDisable:false},
  {name:'May',isDisable:false},
  {name:'Jun',isDisable:false},
  {name:'Jul',isDisable:false},
  {name:'Aug',isDisable:false},
  {name:'Sep',isDisable:false},
  {name:'Oct',isDisable:false},
  {name:'Nov',isDisable:false},
  {name:'Dec',isDisable:false},
)

} else {

  //Jan to Mar
  this.DisplayfinancialYear=((this.currentYear - 1) + '-' + this.currentYear.toString().slice(-2))

  this.MonthList.push(
    {name:'Jan',isDisable:false},
    {name:'Feb',isDisable:false},
    {name:'Mar',isDisable:false},
    {name:'Apr',isDisable:true},
    {name:'May',isDisable:true},
    {name:'Jun',isDisable:true},
    {name:'Jul',isDisable:true},
    {name:'Aug',isDisable:true},
    {name:'Sep',isDisable:true},
    {name:'Oct',isDisable:true},
    {name:'Nov',isDisable:true},
    {name:'Dec',isDisable:true},
  )
}

this.form.month=this.DisplayfinancialYear

this.common.enableLoader();
const Url = this.common.Url + 'GetAvgFxRate'

    const param=
    {
      username:this.LoginData.employeeNo,
    usertype:this.LoginData.EmployeeType,
    action:'view',
    month:this.form.month,
    avgexrate:this.form.avgexrate,
    id:'1',
    monthx:this.form.month,
    }

this.http.post(Url, param).subscribe((response:any) => {
  const status='status' ; const Data='Data' ; const lastmonth='lastmonth'; const finYear='finYear'
  if(response[status])
  {
    this.TabDatas=response[Data]
    this.Lmont=response[lastmonth]
    this.FY=response[finYear]
    this.common.disableLoader();
  }
  else
  {
    this.common.disableLoader();
   this.common.openSnackBar('Something Went Wrong...Please try Again Later',3000);
  }
})



  }

  edit(Rowdata:any)
  {
    this.isUpdate=true
    this.EditData=Rowdata
    this.form.month=Rowdata.Month
    this.form.avgexrate=Rowdata.AvgExrate
  }



  Submit()
  {

    console.log(this.form.monthq)
    var checkData = this.filterData('FY'+this.DisplayfinancialYear);

    //    if(true)
      if(this.isUpdate? true : checkData.length==0)

        {
          this.common.enableLoader();
          const Url = this.common.Url + 'InsUpdAvgFxRate'

          const param=
          {
          username:this.LoginData.employeeNo,
          usertype:this.LoginData.EmployeeType,
          action:'insert',
          // action:this.isUpdate? 'edit' : 'insert',
          month:this.form.month,
          avgexrate:this.form.avgexrate,
          id:this.isUpdate? this.EditData.SNO : '',
          monthx:this.form.monthq,
          }


          this.http.post(Url, param).subscribe((response:any) => {
            const status='status' ; const Data='Data' ; const count='count'
            if(response[status])
            {
              this.common.disableLoader();
              this.common.openSnackBar('Data inserted Successfully',3000);
              this.ngOnInit()
            }
            else
            {
              this.common.disableLoader();
             this.common.openSnackBar('Something Went Wrong ',3000);
            }
          })
        }
        else
        {
          //this.common.openSnackBar('Year '+this.DisplayfinancialYear+' Has Alredy Entered ',2000);

          this.common.enableLoader();
          const Url = this.common.Url + 'InsUpdAvgFxRate'

          const param=
          {
          username:this.LoginData.employeeNo,
          usertype:this.LoginData.EmployeeType,
          action:'edit',
          // action:this.isUpdate? 'edit' : 'insert',
          month:this.form.month,
          avgexrate:this.form.avgexrate,
          id:this.isUpdate? this.EditData.SNO : '',
          monthx:this.form.monthq,
          }


          this.http.post(Url, param).subscribe((response:any) => {
            const status='status' ; const Data='Data' ; const count='count'
            if(response[status])
            {
              this.common.disableLoader();
              this.common.openSnackBar('Data Edited Successfully',3000);
              this.ngOnInit()
            }
            else
            {
              this.common.disableLoader();
             this.common.openSnackBar('Something Went Wrong ',3000);
            }
          })

        }


  }

  filterData(locationName:any) {
    return this.TabDatas.filter((object: { [x: string]: any; }) => {
      return object['Month'] == locationName;
    });
  }
  }


