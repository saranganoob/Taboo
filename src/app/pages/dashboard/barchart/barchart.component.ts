import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_Exporting from 'highcharts/modules/exporting';
import HC_More from 'highcharts/highcharts-more';
import { HttpClient } from '@angular/common/http';
import { CommonService } from 'src/app/services/common.service';

HC_Exporting(Highcharts);
HC_More(Highcharts);


@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.scss']
})
export class BarchartComponent implements OnInit {

  LoginData: any = JSON.parse(sessionStorage.getItem('LoginData') || '{}');

  chartOptions: Highcharts.Options = {
    chart: {
      styledMode: true,
    },
    exporting: {
      fallbackToExportServer: false,
    },
    global: {},
  };

  Shows=[
    {name:'Annually',value:'year'},
    {name:'Quartarly',value:'quaterly'},
  ]
  Shows2=[
    {name:'1st Quartar',value:'1'},
    {name:'2nd Quartar',value:'2'},
    {name:'3rd Quartar',value:'3'},
    {name:'4th Quartar',value:'4'},

  ]

  ChartData:any
  Type:string='year'
  Year:number=2024
  Quartar:number=4

  constructor(private http:HttpClient,
              private common:CommonService) { }



  ngOnInit(): void
  {
    this.getchart()
  }

  SetTypeQuat(value:any,isQuat:boolean)
  {
    if(isQuat)
    {
      this.Type=value
    }
    else
    {
      this.Quartar=value
    }
    this.getchart()
  }
  Setquar(quar:any)
  {
    console.log(quar)

    this.getchart()
  }

  getchart()
  {

    const Url=this.common.Url+'energycharts'
    const param=
    {
      username:this.LoginData.employeename,
      htsc:this.LoginData.location,
      empid:this.LoginData.employeeNo,
      type:this.Type,
      year:this.Year,
      quartar:this.Quartar
    }

      this.http.post(Url,param).subscribe((resdat:any)=>
      {
        const status='status' ; const Data='Data'
        if(resdat[status])
        {


          let months:any=[]
          let forecast:any=[]
          let cons:any=[]

          resdat[Data].forEach((element:any) => {

                    months.push(element.month)
                    forecast.push(element.forecast || 0)
                    cons.push(element.cunsumption || 0)

          });

          //charts
          const bar=Highcharts.chart('container', {
            chart: {
                type: 'column',
                reflow: true
            },
            title: {
                text: 'Forecast VS Consumption',
                align: 'center'
            },
            subtitle: {
                text:
                    'FY 2023-2024',
                align: 'center'
            },
            credits: {
              enabled: false
            },
            xAxis: {
                categories: months,
                crosshair: true,
                accessibility: {
                    description: 'Months'
                }
            },
            yAxis: {

                min: 0,
                title: {
                    text: 'Kilo Watt (KW)'
                }
            },
            tooltip: {
                valueSuffix: '(KW)'
            },
            plotOptions: {
              series: {
                dataLabels: {
                    enabled: true,
                    color: '#000',
                    style: {fontWeight: 'bolder'},
                    inside: true,
                    rotation: 270
                },
                pointPadding: 0.1,
                groupPadding: 0
            },
                column: {
                    pointPadding: 0.1,
                    borderWidth: 0
                }
            },
            series: [
                {
                    name: 'Forecast',
                    data: forecast
                },
                {
                    name: 'Consumption',
                    data: cons
                }
            ]



        }as any);
          //charts

        }
        else
        {

        }
      }
      )

    }

}
