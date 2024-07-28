import { Component,ViewChild,ElementRef,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss']
})
export class LoanComponent implements OnInit {

  @ViewChild('fileInput')
  fileInput!: ElementRef;
  LoginData: any = JSON.parse(sessionStorage.getItem('LoginData') || '{}');
  TabDetails:any // Error Val
  ShowError=false
  showSpinner=false
  Sampleimg=true
  ShowErrorTable=false
  constructor(
  public http: HttpClient,
    private Commonservice: CommonService,) { }

  ngOnInit(): void {
  }

  close(){
    this.ShowError=false
    this.Sampleimg=true
    this. ShowErrorTable=false
  }

  fileChangeZ(element:any)
  {
    this.showSpinner=true
    let uploadedFiles = element.target.files;

    let formData = new FormData();
    formData.append('employeeNo', this.LoginData.employeeNo);
    formData.append('subusertype', this.LoginData.userid);
    formData.append('excel', uploadedFiles[0],uploadedFiles[0].name);

      const Url = this.Commonservice.Url + 'loanxlupload'
    this.http.post(Url, formData).subscribe((response:any) => {
      const status='status';const Data = 'Data' ; const ExcelHasError='ExcelHasError' ; const message='message'
      if(response[status])
      {
        this.showSpinner=false
        this.fileInput.nativeElement.value = '';
        // this.Commonservice.openSnackBar(response[message],3000)
        if(response[ExcelHasError])
       {
        this.Sampleimg=false
        this.showSpinner=false
        this.ShowError=true
        this.ShowErrorTable=true
        this.TabDetails=response[Data]
        this.fileInput.nativeElement.value = '';
       }
       else
       {
        this.ShowError=false
        this.ShowErrorTable=false
        this.fileInput.nativeElement.value = '';
        this.Commonservice.OpenSwal('success',response[message],3000)

        }

      }
      else
      {
        this.showSpinner=false
        this.ShowError=false
        this.fileInput.nativeElement.value = '';
        this.Commonservice.OpenSwal('error',response[message],5000)
      }
    })
  }
}

