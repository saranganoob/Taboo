import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  ShowData: any
  hide = true;
  hide1 = true;
  submitted = false;
  settingsForm: any = FormGroup;
  LoginData: any = JSON.parse(sessionStorage.getItem('LoginData') || '{}');
  currentPassword:any
  newpassword:any
  confirmPassword:any


  constructor(private commonservice: CommonService,
     private formBuilder: FormBuilder,
    private http: HttpClient) { }

  ngOnInit(): void
  {
    this.settingsForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newpassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {

  });
  }

  get f() { return this.settingsForm.controls; }

  ChangePassword()
  {
    this.submitted = true;

    // stop here if form is invalid
    if (this.settingsForm.invalid) {
      return;
    }

    else
    {

      if(this.settingsForm.value.newpassword!=this.settingsForm.value.confirmPassword)
    {
      this.commonservice.OpenSwal('warning','Passwords do not match.!',2000)
      return
    }
    else
    {
      console.log(this.settingsForm.value.currentPassword,this.settingsForm.value.newpassword)


      const param=
      {
        username:this.LoginData.employeeNo,
        userid:this.LoginData.userid,
        type:'change',
        present:this.settingsForm.value.currentPassword,
        newone:this.settingsForm.value.newpassword
      }
      const url=this.commonservice.Url + 'ChangeSettings';

      this.http.post(url, param).subscribe((resdata: any) => {
        const status='status' ; const Data='Data'; const Message='Message'
        if(resdata[status])
        {
          this.commonservice.OpenSwal('success',resdata[Message],2000)
        }
        else
        {
          this.commonservice.OpenSwal('error',resdata[Message],2000)
        }

      },
      (error: any) => {
        this.commonservice.disableLoader();
        this.commonservice.openSnackBar('Server Response Error. Try Again', 4000);
      })

    }

    }
  }

}
