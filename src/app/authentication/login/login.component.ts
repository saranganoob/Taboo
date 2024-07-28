import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  loginForm: any = FormGroup;
  submitted = false;
  userID: any
  ResStauts=false
  constructor(
    private commonservice: CommonService,
    private router: Router,
    private formBuilder: FormBuilder,
    public http: HttpClient,
    ) { }

  ngOnInit(): void {

    sessionStorage.clear()
    localStorage.clear()

    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, ]],
      password: [null, [Validators.required,Validators.maxLength(20),Validators.minLength(6)]],
    });


}

  get f() { return this.loginForm.controls; }

  Login(): void {

    this.submitted = true;
    sessionStorage.setItem('token', 'true');
    if (this.loginForm.invalid) {
      return;
    } else {
      this.commonservice.enableLoader();
      const Loginurl=this.commonservice.Url + 'loginsam';

      // const DateFormat = this.loginForm.value.password.substring(0, 2) + '-' + this.loginForm.value.password.substring(2, 4) + '-' + this.loginForm.value.password.substring(4, 8);
      const logininput = {
        datain: btoa(JSON.stringify({

          username: this.loginForm.value.username,
          Password: this.loginForm.value.password,
          userrole: 'employee'
        }))
      };

      this.http.post(Loginurl, logininput).subscribe((resdata: any) => {
        const status='status' ; const Data='Data'; const message='message'
        if(resdata[status])
        {
          this.ResStauts=false
          this.commonservice.disableLoader();



          let currentDate = new Date();
          const formattedDate = currentDate.toISOString();
          localStorage.setItem('LoginDate', formattedDate);

          sessionStorage.setItem('LoginData', JSON.stringify(resdata[Data][0]));
          this.router.navigate(['/pages/dashboard']);
        }
        else
        {
          this.ResStauts=true
          this.commonservice.disableLoader();
          this.commonservice.openSnackBar(resdata[message], 3000);
        }

       },
      (error: any) => {
        this.commonservice.disableLoader();
        this.commonservice.openSnackBar('Server Response Error. Try Again', 4000);
      })
    }
  }


}
