import { ExcelService } from 'src/app/services/excel.service';
import { DatePipe } from '@angular/common';
import { CommonService } from 'src/app/services/common.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-solar-forecast',
  templateUrl: './solar-forecast.component.html',
  styleUrls: ['./solar-forecast.component.scss']
})
export class SolarForecastComponent implements OnInit {

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
    ]

    Sunday=[
      {Name:'Include Sundays',value:'inc'},
      {Name:'Exclude Sundays',value:'exc'},
      {Name:'Only Sundays',value:'onl'},
    ]

    currentYear=this.common.currentYear
  currentQuarter=this.common.currentQuarter
  startingDate=this.common.startingDate // Start date YYYY-MM-DD
  endingDate=this.common.endingDate // Start date YYYY-MM-DD
    // startingDate='2024-01-01' // Start date YYYY-MM-DD
    // endingDate='2024-03-31' // Start date YYYY-MM-DD
    TotalDays:number=90
    today = new Date(); // Today's date
    tommorow = new Date(this.today.getDate()+1); // Tommorow's date
    LoginData: any = JSON.parse(sessionStorage.getItem('LoginData') || '{}');

    datadeate:any
    Total:any

    constructor(public pipe:DatePipe,
                private excelService: ExcelService,
                private common:CommonService,
                public http:HttpClient)
    {
      this.generateDaysData();
     }



     scroll() {
      const element = document.getElementById('scrollDate');
      console.log(element)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }



    ngOnInit(): void
    {



    }

    ApplyParticular()
    {

      if(this.forecastData.Sdate && this.forecastData.Edate) //Both Date
      {

        const sdate = this.forecastData.Sdate;
        const edate = this.forecastData.Edate;

        const startDate = new Date(sdate);
        const endDate = new Date(edate);
        endDate.setHours(23, 59, 59, 999);
        const recurringRecords = this.daysData.filter(row => {
            const currentDate = new Date(row.date);
            return currentDate >= startDate && currentDate <= endDate;
        });


        recurringRecords.forEach((daysData:any) => {

          const currentDate = new Date(daysData.date);

          let cond=''

          switch (this.forecastData.Sundate)
          {
            case 'inc':
                {
                  cond='true'
                  break;
                }
            case 'exc':
                {
                  cond='currentDate.getDay() !== 0'
                  break
                }
            case 'onl':
                {
                  cond='currentDate.getDay() === 0'
                  break
                }
          }


  if(eval(cond))
  {
    switch(this.forecastData.column)
    {
      case 'c1':
        {
          daysData.C1_value=this.forecastData.NumVal
          daysData.C_value=Number(daysData.C1_value)+Number(daysData.C2_value)+Number(daysData.C3_value)+Number(daysData.C4_value)+Number(daysData.C5_value)
          break;
        }
      case 'c2':
        {
          daysData.C2_value=this.forecastData.NumVal
          daysData.C_value=Number(daysData.C1_value)+Number(daysData.C2_value)+Number(daysData.C3_value)+Number(daysData.C4_value)+Number(daysData.C5_value)
          break;
        }
      case 'c3':
        {
          daysData.C3_value=this.forecastData.NumVal
          daysData.C_value=Number(daysData.C1_value)+Number(daysData.C2_value)+Number(daysData.C3_value)+Number(daysData.C4_value)+Number(daysData.C5_value)
          break;
        }
      case 'c4':
        {
          daysData.C4_value=this.forecastData.NumVal
          daysData.C_value=Number(daysData.C1_value)+Number(daysData.C2_value)+Number(daysData.C3_value)+Number(daysData.C4_value)+Number(daysData.C5_value)
          break;
        }
      case 'c5':
        {
          daysData.C5_value=this.forecastData.NumVal
          daysData.C_value=Number(daysData.C1_value)+Number(daysData.C2_value)+Number(daysData.C3_value)+Number(daysData.C4_value)+Number(daysData.C5_value)
          break;
        }
      case 'c':
        {
          daysData.C_value=this.forecastData.NumVal
          break;
        }
      default:
        {
          break
        }
    }
  }

    this.common.openSnackBar('Applied Successfully',3000);

        });
      }
      else  //Single Date
      {

        // const dateToSearch = this.pipe.transform(this.Sdate,'dd-MMM-YYYY');
        const dateToSearch = this.pipe.transform(this.forecastData.Sdate,'YYYY-MM-dd'); //2024-01-03
    const foundRow = this.daysData.find(row => row.date === dateToSearch);

    console.log('foundRow',foundRow)


    if (foundRow) {

      switch(this.forecastData.column)
      {
        case 'c1':
          {
            foundRow.C1_value=this.forecastData.NumVal
            foundRow.C_value=Number(foundRow.C1_value)+Number(foundRow.C2_value)+Number(foundRow.C3_value)+Number(foundRow.C4_value)+Number(foundRow.C5_value)
            break;
          }
        case 'c2':
          {
            foundRow.C2_value=this.forecastData.NumVal
            foundRow.C_value=Number(foundRow.C1_value)+Number(foundRow.C2_value)+Number(foundRow.C3_value)+Number(foundRow.C4_value)+Number(foundRow.C5_value)
            break;
          }
        case 'c3':
          {
            foundRow.C3_value=this.forecastData.NumVal
            foundRow.C_value=Number(foundRow.C1_value)+Number(foundRow.C2_value)+Number(foundRow.C3_value)+Number(foundRow.C4_value)+Number(foundRow.C5_value)
            break;
          }
        case 'c4':
          {
            foundRow.C4_value=this.forecastData.NumVal
            foundRow.C_value=Number(foundRow.C1_value)+Number(foundRow.C2_value)+Number(foundRow.C3_value)+Number(foundRow.C4_value)+Number(foundRow.C5_value)
            break;
          }
        case 'c5':
          {
            foundRow.C5_value=this.forecastData.NumVal
            foundRow.C_value=Number(foundRow.C1_value)+Number(foundRow.C2_value)+Number(foundRow.C3_value)+Number(foundRow.C4_value)+Number(foundRow.C5_value)
            break;
          }
        case 'c':
          {
            foundRow.C_value=this.forecastData.NumVal
            break;
          }
        default:
          {
            break
          }
      }

      this.common.openSnackBar('Applied Successfully',3000);
    } else {
    }
      }
    }

    TextType(val:any,row:any,index:number,col:any)
    {
      row.C_value=Number(row.C1_value)+Number(row.C2_value)+Number(row.C3_value)+Number(row.C4_value)+Number(row.C5_value)



      if(row.day=="Monday")
      {


        switch(col)
        {
          case 'c1':
            {
              this.daysData[index+1].C1_value=val
              this.daysData[index+2].C1_value=val
              this.daysData[index+3].C1_value=val
              this.daysData[index+4].C1_value=val
              this.daysData[index+5].C1_value=val

              this.daysData[index+1].C_value=Number(this.daysData[index+1].C1_value)+Number(this.daysData[index+1].C2_value)+Number(this.daysData[index+1].C3_value)+Number(this.daysData[index+1].C4_value)+Number(this.daysData[index+1].C5_value)
              this.daysData[index+2].C_value=Number(this.daysData[index+2].C1_value)+Number(this.daysData[index+2].C2_value)+Number(this.daysData[index+2].C3_value)+Number(this.daysData[index+2].C4_value)+Number(this.daysData[index+2].C5_value)
              this.daysData[index+3].C_value=Number(this.daysData[index+3].C1_value)+Number(this.daysData[index+3].C2_value)+Number(this.daysData[index+3].C3_value)+Number(this.daysData[index+3].C4_value)+Number(this.daysData[index+3].C5_value)
              this.daysData[index+4].C_value=Number(this.daysData[index+4].C1_value)+Number(this.daysData[index+4].C2_value)+Number(this.daysData[index+4].C3_value)+Number(this.daysData[index+4].C4_value)+Number(this.daysData[index+4].C5_value)
              this.daysData[index+5].C_value=Number(this.daysData[index+5].C1_value)+Number(this.daysData[index+5].C2_value)+Number(this.daysData[index+5].C3_value)+Number(this.daysData[index+5].C4_value)+Number(this.daysData[index+5].C5_value)

              break;
            }
          case 'c2':
            {
              this.daysData[index+1].C2_value=val
              this.daysData[index+2].C2_value=val
              this.daysData[index+3].C2_value=val
              this.daysData[index+4].C2_value=val
              this.daysData[index+5].C2_value=val

              this.daysData[index+1].C_value=Number(this.daysData[index+1].C1_value)+Number(this.daysData[index+1].C2_value)+Number(this.daysData[index+1].C3_value)+Number(this.daysData[index+1].C4_value)+Number(this.daysData[index+1].C5_value)
              this.daysData[index+2].C_value=Number(this.daysData[index+2].C1_value)+Number(this.daysData[index+2].C2_value)+Number(this.daysData[index+2].C3_value)+Number(this.daysData[index+2].C4_value)+Number(this.daysData[index+2].C5_value)
              this.daysData[index+3].C_value=Number(this.daysData[index+3].C1_value)+Number(this.daysData[index+3].C2_value)+Number(this.daysData[index+3].C3_value)+Number(this.daysData[index+3].C4_value)+Number(this.daysData[index+3].C5_value)
              this.daysData[index+4].C_value=Number(this.daysData[index+4].C1_value)+Number(this.daysData[index+4].C2_value)+Number(this.daysData[index+4].C3_value)+Number(this.daysData[index+4].C4_value)+Number(this.daysData[index+4].C5_value)
              this.daysData[index+5].C_value=Number(this.daysData[index+5].C1_value)+Number(this.daysData[index+5].C2_value)+Number(this.daysData[index+5].C3_value)+Number(this.daysData[index+5].C4_value)+Number(this.daysData[index+5].C5_value)

              break;
            }
          case 'c3':
            {
              this.daysData[index+1].C3_value=val
              this.daysData[index+2].C3_value=val
              this.daysData[index+3].C3_value=val
              this.daysData[index+4].C3_value=val
              this.daysData[index+5].C3_value=val

              this.daysData[index+1].C_value=Number(this.daysData[index+1].C1_value)+Number(this.daysData[index+1].C2_value)+Number(this.daysData[index+1].C3_value)+Number(this.daysData[index+1].C4_value)+Number(this.daysData[index+1].C5_value)
              this.daysData[index+2].C_value=Number(this.daysData[index+2].C1_value)+Number(this.daysData[index+2].C2_value)+Number(this.daysData[index+2].C3_value)+Number(this.daysData[index+2].C4_value)+Number(this.daysData[index+2].C5_value)
              this.daysData[index+3].C_value=Number(this.daysData[index+3].C1_value)+Number(this.daysData[index+3].C2_value)+Number(this.daysData[index+3].C3_value)+Number(this.daysData[index+3].C4_value)+Number(this.daysData[index+3].C5_value)
              this.daysData[index+4].C_value=Number(this.daysData[index+4].C1_value)+Number(this.daysData[index+4].C2_value)+Number(this.daysData[index+4].C3_value)+Number(this.daysData[index+4].C4_value)+Number(this.daysData[index+4].C5_value)
              this.daysData[index+5].C_value=Number(this.daysData[index+5].C1_value)+Number(this.daysData[index+5].C2_value)+Number(this.daysData[index+5].C3_value)+Number(this.daysData[index+5].C4_value)+Number(this.daysData[index+5].C5_value)

              break;
            }
          case 'c4':
            {
              this.daysData[index+1].C4_value=val
              this.daysData[index+2].C4_value=val
              this.daysData[index+3].C4_value=val
              this.daysData[index+4].C4_value=val
              this.daysData[index+5].C4_value=val

              this.daysData[index+1].C_value=Number(this.daysData[index+1].C1_value)+Number(this.daysData[index+1].C2_value)+Number(this.daysData[index+1].C3_value)+Number(this.daysData[index+1].C4_value)+Number(this.daysData[index+1].C5_value)
              this.daysData[index+2].C_value=Number(this.daysData[index+2].C1_value)+Number(this.daysData[index+2].C2_value)+Number(this.daysData[index+2].C3_value)+Number(this.daysData[index+2].C4_value)+Number(this.daysData[index+2].C5_value)
              this.daysData[index+3].C_value=Number(this.daysData[index+3].C1_value)+Number(this.daysData[index+3].C2_value)+Number(this.daysData[index+3].C3_value)+Number(this.daysData[index+3].C4_value)+Number(this.daysData[index+3].C5_value)
              this.daysData[index+4].C_value=Number(this.daysData[index+4].C1_value)+Number(this.daysData[index+4].C2_value)+Number(this.daysData[index+4].C3_value)+Number(this.daysData[index+4].C4_value)+Number(this.daysData[index+4].C5_value)
              this.daysData[index+5].C_value=Number(this.daysData[index+5].C1_value)+Number(this.daysData[index+5].C2_value)+Number(this.daysData[index+5].C3_value)+Number(this.daysData[index+5].C4_value)+Number(this.daysData[index+5].C5_value)

              break;
            }
          case 'c5':
            {
              this.daysData[index+1].C5_value=val
              this.daysData[index+2].C5_value=val
              this.daysData[index+3].C5_value=val
              this.daysData[index+4].C5_value=val
              this.daysData[index+5].C5_value=val

              this.daysData[index+1].C_value=Number(this.daysData[index+1].C1_value)+Number(this.daysData[index+1].C2_value)+Number(this.daysData[index+1].C3_value)+Number(this.daysData[index+1].C4_value)+Number(this.daysData[index+1].C5_value)
              this.daysData[index+2].C_value=Number(this.daysData[index+2].C1_value)+Number(this.daysData[index+2].C2_value)+Number(this.daysData[index+2].C3_value)+Number(this.daysData[index+2].C4_value)+Number(this.daysData[index+2].C5_value)
              this.daysData[index+3].C_value=Number(this.daysData[index+3].C1_value)+Number(this.daysData[index+3].C2_value)+Number(this.daysData[index+3].C3_value)+Number(this.daysData[index+3].C4_value)+Number(this.daysData[index+3].C5_value)
              this.daysData[index+4].C_value=Number(this.daysData[index+4].C1_value)+Number(this.daysData[index+4].C2_value)+Number(this.daysData[index+4].C3_value)+Number(this.daysData[index+4].C4_value)+Number(this.daysData[index+4].C5_value)
              this.daysData[index+5].C_value=Number(this.daysData[index+5].C1_value)+Number(this.daysData[index+5].C2_value)+Number(this.daysData[index+5].C3_value)+Number(this.daysData[index+5].C4_value)+Number(this.daysData[index+5].C5_value)

              break;
            }
          case 'c':
            {
              this.daysData[index+1].C_value=val
              this.daysData[index+2].C_value=val
              this.daysData[index+3].C_value=val
              this.daysData[index+4].C_value=val
              this.daysData[index+5].C_value=val
              break;
            }
          default:
            {
              break
            }
        }

      }
    }


    generateDaysData() {

      const url=this.common.Url +'GetEnergyforecast'
      const params=
      {
        username:this.LoginData.userid,
        htsc:this.LoginData.location,
        fromdate:this.startingDate,
        todate:this.endingDate,
        type:'Solar'
      }

      this.common.enableLoader()
      this.http.post(url,params).subscribe((response:any)=>
      {
        const status='status' ; const Data='Data' ; const Total='Total' ; const Timing='Timing'
        if(response[status])
        {

          this.daysData=response[Data]
          this.Timing=response[Timing][0]
          this.Total=response[Total][0]
          //format JSON

          this.daysData.forEach(item => {
            const date = new Date(item.date);
            const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });

              const isPastDay = date <= this.today;
          const isToday = date.toDateString() === this.today.toDateString(); // Check if the current date is today

            item.EnableEdit=isPastDay
            item.EnableText=false
            item.EnableText=isPastDay
            // item.EnableText=isPastDay && !isToday
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

    edit(val:any,index:number,edit:boolean)
    {

      if(edit)
      {

        this.daysData[index].EnableText = !this.daysData[index].EnableText;
      }
      else
      {


        if ( val.C1_value !== null && val.C1_value !== "" &&val.C2_value !== null && val.C2_value !== "" &&val.C3_value !== null && val.C3_value !== "" &&val.C4_value !== null && val.C4_value !== "" &&val.C5_value !== null && val.C5_value !== "" &&val.C_value !== null && val.C_value !== "" )
        {

          // val['recordid']=val.Id
          console.log(val)
          const url=this.common.Url +'Energyforcast'
          const params=
          {
            username:this.LoginData.userid,
            htsc:this.LoginData.location,
            forecastjson:JSON.stringify(val),
            type:'Solar'
          }
          this.common.enableLoader()
          this.http.post(url,params).subscribe((response:any)=>
          {
            const status='status' ; const Data='Data' ; const count='count'; const Message='Message'
            if(response[status])
            {
              this.common.disableLoader();
              this.common.openSnackBar(response[Message],3000);
              this.generateDaysData()
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



        // this.daysData[index].EnableText = !this.daysData[index].EnableText;
      }

      // this.daysData[index].EnableText = !this.daysData[index].EnableText;
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
      'Forecast_' +this.LoginData.location
      );
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
      const url=this.common.Url +'Energyforcast'
      // Create a chunk of data to send
      const chunkParams = {
          username: this.LoginData.userid,
          htsc:this.LoginData.location,
          forecastjson: JSON.stringify(chunk),
          type:'Solar'
      };

    this.http.post(url,chunkParams).subscribe((response:any)=>
        {
          const status='status' ; const Data='Data' ; const count='count' ; const Message='Message'
          if(response[status])
          {
            this.common.disableLoader();
            this.common.openSnackBar(response[Message],3000);
            this.generateDaysData()
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


    }



  }