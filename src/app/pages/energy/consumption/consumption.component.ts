import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ExcelService } from 'src/app/services/excel.service';
import { HttpClient } from '@angular/common/http';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-consumption',
  templateUrl: './consumption.component.html',
  styleUrls: ['./consumption.component.scss']
})
export class ConsumptionComponent implements OnInit {

  LoginData: any = JSON.parse(sessionStorage.getItem('LoginData') || '{}');
  Timing:any=[]
  daysData: {
    htsc:number,
    date: string,
    day: string,
    C1_value:any,
    C2_value:any,
    C3_value:any,
    C4_value:any,
    C5_value:any,
    C_value:any,
    enabledisable:number,
    Remarks:string,
    EnableEdit:boolean,
    EnableText:boolean,
    recordid:any
  }[] = [];


  forecastData={
    NumVal:"",
    Sdate:"",
    Edate:"",
    Sundate:"",
    column:""
  }


  columns=[
    {Name:'C1',value:'c1'},
    {Name:'C2',value:'c2'},
    {Name:'C3',value:'c3'},
    {Name:'C4',value:'c4'},
    {Name:'C5',value:'c5'},
    {Name:'C',value:'c'},
  ]

  TotalDays:number=90
  Total:any
  today = new Date(); // Today's date


  currentYear=this.common.currentYear
  currentQuarter=this.common.currentQuarter
  startingDate=this.common.CstartingDate // Start date YYYY-MM-DD
  endingDate=this.common.endingDate // Start date YYYY-MM-DD

  constructor(public pipe:DatePipe,
              private excelService: ExcelService,
              private common:CommonService,
              public http:HttpClient)
  {
    this.generateDaysDataq();
   }

  ngOnInit(): void {

  }


  edit(val:any,index:number,edit:boolean)
  {

    if ( val.C1_value !== null && val.C1_value !== "" &&val.C2_value !== null && val.C2_value !== "" &&val.C3_value !== null && val.C3_value !== "" &&val.C4_value !== null && val.C4_value !== "" &&val.C5_value !== null && val.C5_value !== "" &&val.C_value !== null && val.C_value !== "" )
    {

      // val['recordid']=val.Id
      console.log(val)
      const url=this.common.Url +'saveConsumption'
      const params=
      {
        username:this.LoginData.userid,
        htsc:this.LoginData.location,
        forecastjson:JSON.stringify(val),
        type:'Energy'
      }
      this.common.enableLoader()
      this.http.post(url,params).subscribe((response:any)=>
      {
        const status='status' ; const Data='Data' ; const count='count'; const Message='Message'
        if(response[status])
        {
          this.common.disableLoader();
          this.common.openSnackBar(response[Message],3000);
          this.generateDaysDataq()
        }
        else
        {
          this.common.disableLoader();
         this.common.openSnackBar('Something Went Wrong ',3000);
        }

      },
      (error: any) => {
        this.common.disableLoader();
        this.common.openSnackBar('Server Response Error. Try Again', 4000);
      })

  }
  else
  {

      this.common.openSnackBar('Please enter all the fields',3000)
  }

  }

  scroll() {
    const element = document.getElementById('scrollDate');
    console.log(element)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  TextType(val:any,row:any,index:number,col:any)
  {
    row.C_value=Number(row.C1_value)+Number(row.C2_value)+Number(row.C3_value)+Number(row.C4_value)+Number(row.C5_value)
  }


  submit()
  {

    if (this.isAllFieldsFilledOrEmpty()) {
      // All fields are either filled or empty, proceed with submitting the data

      this.submitz()
    } else {
      // Display error message or handle invalid form submission
      this.common.openSnackBar('Please enter all the fields',3000)
    }
  }

  submitz()
  {

      const chunkSize = 20;
      const totalRecords = this.daysData.length;

for (let i = 0; i < totalRecords; i += chunkSize)
{
    const chunk = this.daysData.slice(i, i + chunkSize);
    const url=this.common.Url +'saveConsumption'
    // Create a chunk of data to send
    const chunkParams = {
        username: this.LoginData.userid,
        htsc:this.LoginData.location,
        forecastjson: JSON.stringify(chunk),
        type:'Energy'
    };

    this.common.enableLoader()

  this.http.post(url,chunkParams).subscribe((response:any)=>
      {
        const status='status' ; const Data='Data' ; const count='count' ; const Message='Message'
        if(response[status])
        {

          this.common.disableLoader();
          this.generateDaysDataq()

        }
        else
        {
          this.common.disableLoader();
         this.common.openSnackBar('Something Went Wrong ',3000);
        }

      },
      (error: any) => {
        this.common.disableLoader();
        this.common.openSnackBar('Server Response Error. Try Again', 4000);
      })



}
this.common.openSnackBar('Submitted Successfully',3000);


  }

  isAllFieldsFilledOrEmpty(): boolean {
    for (const day of this.daysData) {
      const cValues = [day.C1_value, day.C2_value, day.C3_value, day.C4_value, day.C5_value];
      const nonEmptyCValues = cValues.filter(value => value !== ''); // Filter non-empty C values

      if (nonEmptyCValues.length !== 0 && nonEmptyCValues.length !== cValues.length) {
        // If any day has some C fields filled and some empty, return false
        return false;
      }
    }
    // All days have either all C fields filled or all empty
    return true;
  }

  generateDaysDataq() {

    const url=this.common.Url +'GetConsumption'
    const params=
    {
      username:this.LoginData.userid,
      htsc:this.LoginData.location,
      fromdate:this.startingDate,
      todate:this.endingDate,
      type:'Energy'
    }

    this.common.enableLoader()
    this.http.post(url,params).subscribe((response:any)=>
    {
      const status='status' ; const Data='Data' ;const Total='Total'  ; const Timing='Timing'
      if(response[status])
      {

        this.daysData=response[Data]
        this.Total=response[Total][0]
        this.Timing=response[Timing][0]

        //format JSON

        this.daysData.forEach(item => {

          var C1_value_Total=+Number(item.C1_value)
          const date = new Date(item.date);
          var isSaved=false
           isSaved=item.enabledisable==1

          const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });

        const yesterday = new Date(this.today);
        yesterday.setDate(this.today.getDate() - 1);

        const dayBeforeYesterday = new Date(this.today);
        dayBeforeYesterday.setDate(this.today.getDate() - 2);
        const twodaysago = new Date(this.today);
        twodaysago.setDate(this.today.getDate() - 3);
            const isPastDay = date >= this.today;

            item.day = dayOfWeek;

if(date.toDateString() == yesterday.toDateString() || date.toDateString() == dayBeforeYesterday.toDateString()|| date.toDateString() == twodaysago.toDateString())
{
  item.EnableText=false
}

else if (date.toDateString() === this.today.toDateString())
{
  item.EnableText=true
}
else
{
  if(item.enabledisable==1)
  {
    item.EnableText=true
  }
  else if(date > this.today ){
    item.EnableText=true
  }
}

        });




        setTimeout(() => {
          this.scroll()
          console.log('document.getElementByI',document.getElementById('scrollDate'))
          this.common.disableLoader();
        }, 1000);

      }
      else
      {
        this.common.disableLoader();
       this.common.openSnackBar('Something Went Wrong ',3000);
      }

    },
    (error: any) => {
      this.common.disableLoader();
      this.common.openSnackBar('Server Response Error. Try Again', 4000);
    })

  }


  download()
  {

    let myArray: any[] = [];
    myArray.push(...this.daysData)


    const fileToExport = myArray.map((items:any) => {
    return {
    "HTSC": this.LoginData.location,
    "Date": this.pipe.transform(items.date,'dd-MMM-YYYY'),
    "Day": items?.day,
    "C1": items?.C1_value,
    "C2": items?.C2_value,
    "C3": items?.C3_value,
    "C4": items?.C4_value,
    "C5": items?.C5_value,
    "C": items?.C_value,
    "Remarks in case of any deviation from projection": items?.Remarks,
    }
    });


    this.excelService.exportToExcel(
    fileToExport,
    'Consumption_' +this.LoginData.location
    );
  }

}

