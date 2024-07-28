import { Component,ViewChild,ElementRef,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-salesdata',
  templateUrl: './salesdata.component.html',
  styleUrls: ['./salesdata.component.scss']
})
export class SalesdataComponent implements OnInit {
  @ViewChild('fileInput')
  fileInput!: ElementRef;
  LoginData: any = JSON.parse(sessionStorage.getItem('LoginData') || '{}');
  showSpinner=false
  BulkDetails:any
  TabDetails:any // Error Val
  TabDatas:any //Correct and Inserted Values
  Sampleimg=true
  ShowError=false
  ShowErrorTable=false
  ShowInsertedValTable=false

  constructor(
    private router: Router,
    public http: HttpClient,
    private datePipe: DatePipe,
    private Commonservice: CommonService,) { }

  ngOnInit(): void {
  }

  fileChangeZ(element:any) {
    this.showSpinner=true
    let Uploaded_file_list = element.target.files;

    let formData = new FormData();

      formData.append('employeeNo', this.LoginData.employeeNo);
      formData.append('EmployeeType', this.LoginData.EmployeeType);
      formData.append('xlsx', Uploaded_file_list[0],Uploaded_file_list[0].name);

    const Url = this.Commonservice.Url + 'upload'
    this.http.post(Url, formData).subscribe((response:any) => {
      const status = 'status' ; const Data = 'Data' ; const ExcelHasError='ExcelHasError' ; const message='message'

      if(response[status])
      {
        this.showSpinner=false
       if(response[ExcelHasError])
       {
        this.Sampleimg=false
        this.ShowError=true
        this.ShowInsertedValTable=false
        this.ShowErrorTable=true
        this.TabDetails=response[Data]
        this.fileInput.nativeElement.value = '';
       }
       else
       {
        this.ShowError=false
        this.ShowInsertedValTable=true
        this.ShowErrorTable=false
        this.fileInput.nativeElement.value = '';
        this.TabDatas=response[Data]
        this.Commonservice.openSnackBar(response[message],3000)
       }
      }
      else
      {
        this.showSpinner=false
        this.fileInput.nativeElement.value = '';
        this.Commonservice.openSnackBar(response[message],5000)
      }

    })
  }

  close(){
    this.ShowError=false
    this.Sampleimg=true
    this. ShowErrorTable=false
  }

//   fileChange(element:any) {
//     const Uploaded_file_list = element.target.files;

//     let formData = new FormData();
//       formData.append('xlsx', Uploaded_file_list[0],Uploaded_file_list[0].name);
//     const Url = this.Commonservice.Url + 'upload'
//     this.http.post(Url, formData).subscribe((response:any) => {
//       const status = 'status' ; const Data = 'Data'
//       if(response[status])
//       {
//         let rows=[]
//         this.BulkDetails=response[Data]
//         this.showTab=true
//         const myJsonValues = Object.values(this.BulkDetails).slice(3);
//         // console.log(myJsonValues)
//         this.TabDetails=myJsonValues


// for (const value of Object.values(this.BulkDetails[2]))
// {
//   rows.push(value)
// }
// // console.log('rowsArray',rows)

// let ActuatRow=[
//   "Division",
//   "Unit",
//   "OE",
//   "Retail",
//   "Export",
//   "Product Sales",
//   "Cr Notes",
//   "Net Product Sales",
//   "Scrap Sales",
//   "Total Sales",
//   "Cum Adj",
//   "Adj Sales",
//   "Month",
//   "Financial Year"
// ]

//           if(JSON.stringify(rows) === JSON.stringify(ActuatRow)) //Rows are Equal and same
//           {
//             console.log('Row Headers are Equal and same')
//             console.table(this.TabDetails)
//             for (let index = 0; index < this.TabDetails.length; index++)
//             {
//               if(typeof this.TabDetails[index].Division !== 'string')
//               {
//                 // console.log(this.TabDetails[index].Division)
//               }

//               if(typeof this.TabDetails[index].Unit !== 'string')
//               {
//                 // console.log(this.TabDetails[index].Unit)
//               }

//               // console.log('Division :',this.TabDetails[index].Division)


//             const existingDate = new Date(this.TabDetails[index].Month);

//             const nextDay = new Date(existingDate);
//             nextDay.setDate(existingDate.getDate() + 1);

//               let dateFinal=nextDay.toISOString()
//               let conVDate=this.datePipe.transform(dateFinal, 'MM/dd/yyyy')
//               console.log('conVDate',conVDate)

//             }
//           }
//           else
//           {
//             console.log('Some row value is missing')
//           }

//       }
//       else
//       {
//         this.Commonservice.openSnackBar('something Went Wrong',3000)
//       }
//   })
//   }


  save(){

  }

}

