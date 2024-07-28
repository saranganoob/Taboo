import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ExcelService } from 'src/app/services/excel.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-dg-consumption-admin',
  templateUrl: './dg-consumption-admin.component.html',
  styleUrls: ['./dg-consumption-admin.component.scss']
})
export class DgConsumptionAdminComponent implements OnInit {

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

    Total:any

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

    currentYear=this.common.currentYear
  currentQuarter=this.common.currentQuarter
  startingDate=this.common.CstartingDate // Start date YYYY-MM-DD
  endingDate=this.common.endingDate // Start date YYYY-MM-DD
    TotalDays:number=90
    today = new Date(); // Today's date

    HTSCList:any=[]
  HTSC_Code:number=0
  // HTSC_Code:number=this.LoginData.location

  Sdate:any
  Edate:any
  FiltereddaysData:any


    constructor(public pipe:DatePipe,
              private excelService: ExcelService,
                private common:CommonService,
                public http:HttpClient)
    {
      // this.generateDaysDataq();
      this.getHTSC();
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
          type:'DGData'
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

    submit()
    {
      console.table(this.daysData)


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
          type:'DGData'
      };

    this.http.post(url,chunkParams).subscribe((response:any)=>
        {
          const status='status' ; const Data='Data' ; const count='count' ; const Message='Message'
          if(response[status])
          {
            this.common.disableLoader();
            this.common.openSnackBar(response[Message],3000);

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
  this.generateDaysDataq()


    }

    TextType(val:any,row:any,index:number,col:any)
  {
    row.C_value=Number(row.C1_value)+Number(row.C2_value)+Number(row.C3_value)+Number(row.C4_value)+Number(row.C5_value)
  }

    generateDaysDataq() {

      const url=this.common.Url +'GetConsumption'
      const params=
      {
        username:this.LoginData.userid,
        htsc:this.HTSC_Code,
        fromdate:this.startingDate,
        todate:this.endingDate,
        type:'DGData'
      }

      this.common.enableLoader()
      this.http.post(url,params).subscribe((response:any)=>
      {
        const status='status' ; const Data='Data' ; const Timing='Timing' ; const Total='Total'
        if(response[status])
        {

          this.daysData=response[Data]
          this.Timing=response[Timing][0]
          this.Total=response[Total][0]
          //format JSON

          this.daysData.forEach(item => {
            const date = new Date(item.date);
            var isSaved=false
             isSaved=item.enabledisable==1

            const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });

          const yesterday = new Date(this.today);
          yesterday.setDate(this.today.getDate() - 1);

          const dayBeforeYesterday = new Date(this.today);
          dayBeforeYesterday.setDate(this.today.getDate() - 2);


              const isPastDay = date >= this.today;



  if(date.toDateString() === this.today.toDateString() || date.toDateString() == yesterday.toDateString() || date.toDateString() == dayBeforeYesterday.toDateString()  )
  {
    item.EnableText=false
  }
  else
  {
    if(item.enabledisable==1)
    {
      item.EnableText=false
    }
    else if(date > this.today ){
      item.EnableText=true
    }
  }
            item.day = dayOfWeek;
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

    filter()
    {
      let TempdaysData=this.daysData
      const fromDate = new Date(this.Sdate); // Starting date
      const toDate = new Date(this.Edate);   // Ending date
      toDate.setHours(23, 59, 59, 999);
      // Filter the data array based on the date range
      const filteredData = TempdaysData.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= fromDate && itemDate <= toDate;
      });
      this.FiltereddaysData=filteredData
      this.download(true)

    }

    download(IsFiltered:boolean)
    {
      let myArray: any[] = [];
      myArray.push(...IsFiltered ? this.FiltereddaysData : this.daysData)
      const fileToExport = myArray.map((items:any) => {
      return {
      "HTSC": this.HTSC_Code,
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
      'Electrical Energy Forecast_' +this.HTSC_Code
      );
    }


  getHTSC()
  {
    const url=this.common.Url +'GetHtscplants'

    const params=
    {
      username:this.LoginData.userid,
      userid:this.LoginData.employeeNo,
      type:'admin' //static
    }

    this.common.enableLoader()

    this.http.post(url,params).subscribe((response:any)=>
    {
      const status='status' ; const Data='Data'
      if(response[status])
      {
        this.HTSCList=response[Data]
        this.common.disableLoader();
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

  SetHTSC(event:any)
  {
    this.HTSC_Code=event.value
    this.generateDaysDataq ()
  }

  }
