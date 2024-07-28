import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { CommonService } from '../../services/common.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-bulkupload',
  templateUrl: './bulkupload.component.html',
  styleUrls: ['./bulkupload.component.scss']
})
export class BulkuploadComponent implements OnInit {

  form:any={}
  TabDatas:any
  currentpage=1
  isUpdate=false
  FinancialYearList:any
  MonthList=[
    {name:'Jan',val:1},
    {name:'Feb',val:2},
    {name:'Mar',val:3},
    {name:'Apr',val:4},
    {name:'May',val:5},
    {name:'Jun',val:6},
    {name:'Jul',val:7},
    {name:'Aug',val:8},
    {name:'Sep',val:9},
    {name:'Oct',val:10},
    {name:'Nov',val:11},
    {name:'Dec',val:12},
  ]
  CurrentMon = this.datePipe.transform(new Date(), 'MM')
  CurrentYear = new Date().getFullYear()
  prevYear = new Date().getFullYear() - 1
  NextYear = new Date().getFullYear() + 1

  LoginData: any = JSON.parse(sessionStorage.getItem('LoginData') || '{}');
  constructor(
              public http:HttpClient,
              private common:CommonService,
              private datePipe: DatePipe,
              ) { }

  ngOnInit(): void
  {
    if(this.CurrentMon=='04' ||this.CurrentMon=='05' ||this.CurrentMon=='06')
    {
      console.log(this.CurrentMon)
      let dummyFY=[]
      let fyset={val:'FY'+this.CurrentYear};
      let fyset2={val:'FY'+this.prevYear};
      dummyFY.push(fyset2,fyset)
      this.FinancialYearList=dummyFY
    }
    else
    {
      console.log(this.CurrentMon)
      console.log(this.CurrentYear)
      let dummyFY=[]
      let fyset={val:'FY'+this.CurrentYear};
      let fyset2={val:'FY'+this.NextYear};

      dummyFY.push(fyset2)
      this.FinancialYearList=dummyFY
    }
   this.gettableData()
   this.form.finyear='FY'+this.CurrentYear

   this.CurrentYear = new Date().getFullYear();
    this.form.finyear = `FY${this.CurrentYear}-${this.CurrentYear + 1}`;
    console.log(this.form.finyear);

  //  this.form.finyear='FY'+this.CurrentYear
  }

  gettableData(){
    this.common.enableLoader();
    const Url = this.common.Url + 'GetAvgBorrowing'

          const param=
          {
            username:this.LoginData.employeeNo
            ,usertype:this.LoginData.EmployeeType,
            pageno:this.currentpage
          }

    this.http.post(Url, param).subscribe((response:any) => {
      const status='status' ; const Data='Data' ; const count='count'
      if(response[status])
      {
        this.common.disableLoader();
        this.TabDatas=response[Data]
      }
      else
      {
        this.common.disableLoader();
       this.common.openSnackBar('Something Went Wrong',3000);
      }
    })
  }

  Submitz()
  {
    this.common.openSnackBar('yuppp',3000);

    var newData = this.filterData(this.form.finyear);
  }

  Submit()
  {
console.log(this.form)

     var newData = this.filterData(this.form.fyear);

    // var newData = this.filterData('FY'+this.CurrentYear);
        // console.log(newData);

        //if(true)
        if(this.isUpdate? true : newData.length==0)

        {


    this.common.enableLoader();
    const Url = this.common.Url + 'InsUpdAvgBorrw'

          const param=
          {
            username:this.LoginData.employeeNo
            ,usertype:this.LoginData.EmployeeType
            ,FinYear:this.form.fyear
            ,Borrowing:this.form.borrow
            ,Average_Borrowing:this.form.avgborrow
            ,Debt_Equity:this.form.debtequity
            ,Fin_Cost:this.form.Fin_Cost
            ,EquityInCrores:this.form.EquityInCrores
            ,FinanceCostRs:this.form.fincost
            ,acttype:this.isUpdate? 'edit' : 'insert'
            ,month:this.form.month
          }
          // console.log(param)

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
       this.common.openSnackBar('Something Went Wrong',3000);
      }
    })
  }
  else
  {
    // this.common.openSnackBar('FY'+this.CurrentYear+' Has Alredy Entered ',2000);


    this.common.enableLoader();
    const Url = this.common.Url + 'InsUpdAvgBorrw'

          const param=
          {
            username:this.LoginData.employeeNo
            ,usertype:this.LoginData.EmployeeType
            ,FinYear:this.form.fyear
            ,Borrowing:this.form.borrow
            ,Average_Borrowing:this.form.avgborrow
            ,Debt_Equity:this.form.debtequity
            ,Fin_Cost:this.form.Fin_Cost
            ,EquityInCrores:this.form.EquityInCrores
            ,FinanceCostRs:this.form.fincost
            ,acttype:'edit'
            // ,acttype:this.isUpdate? 'edit' : 'insert'
            ,month:this.form.month
          }
          // console.log(param)

    this.http.post(Url, param).subscribe((response:any) => {
      const status='status' ; const Data='Data' ; const count='count'
      if(response[status])
      {
        this.common.disableLoader();
        this.common.openSnackBar('Data Edtied Successfully',3000);
        this.ngOnInit()
      }
      else
      {
        this.common.disableLoader();
       this.common.openSnackBar('Something Went Wrong',3000);
      }
    })

  }
  }

  edit(Rowdata:any)
  {
// console.log(Rowdata)
this.isUpdate=true

            this.form.finyear=Rowdata.FinYear
            this.form.borrow=Rowdata.Borrowing
            this.form.avgborrow=Rowdata.Average_Borrowing
            this.form.debtequity=Rowdata.Debt_Equity
            this.form.Fin_Cost=Rowdata.Fin_Cost
            this.form.EquityInCrores=Rowdata.EquityInCrores
            this.form.fincost=Rowdata.Fin_Cost
            this.form.month=Rowdata.month

  }

  // ClearForm()
  // {

  //           this.form.borrow=null
  //           this.form.avgborrow=null
  //           this.form.debtequity=null
  //           this.form.Fin_Cost=null
  //           this.form.EquityInCrores=null
  //           this.form.fincost=null
  // }

  filterData(locationName:any) {

    return this.TabDatas.filter((object: { [x: string]: any; }) => {
      return object['FinYear'] == locationName;
    });
  }
}
