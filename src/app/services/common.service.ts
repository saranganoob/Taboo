import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private snackBar: MatSnackBar,private http: HttpClient) {
    this.SetDate()
   }
  name = 'Sarangan';
  currentYear: string='';
  currentMonth: number=0;
  currentQuarter: number=0;
  startingDate='' // Start date YYYY-MM-DD
  FstartingDate='' // Start date YYYY-MM-DD
  CstartingDate='' // Start date YYYY-MM-DD
  endingDate='' // Start date YYYY-MM-DD
  Loading = new Subject<boolean>();
DUrl = 'http://localhost:7799/'; //Dev Local

//   Url = 'http://localhost:7799/';
// Url='https://sflnalamdev.sfl.co.in:7700/' //Dev 105 server

  // Url='https://tabdevappn.sfl.co.in:7700/' //Dev 2.100 server

//Url='https://sflnalam.sfl.co.in:7700/' //live 106 server

 Url='https://sfldashboards.sfl.co.in:7700/' //live 94 server



  openSnackBar(message: string, time: number): void {
    this.snackBar.open(message, 'Close', {
      duration: time,
    });
  }

  OpenSwal(pix:any,title:any,timer:number)
  {
    swal.fire({
      icon: pix,
      title: title,
      timer: timer,
      timerProgressBar: true,
    })
  }

  enableLoader(): void {
    this.Loading.next(false);
  }

  disableLoader(): void {
    this.Loading.next(true);
  }


  getLoaderStatus(): Observable<any> {
    return this.Loading.asObservable();
  }


  SetDate()
  {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth()+1;
    this.currentMonth=currentDate.getMonth()+1;
    //Jan - Mar
   if(currentMonth<=3)
   {
    this.currentQuarter=4

        if(currentMonth==3&&currentDate.getDate()>=25) //if mar 25+ display April
        {
          this.currentYear = currentDate.getFullYear()-1 + '-' + currentDate.getFullYear() ;
          this.startingDate=currentDate.getFullYear() + '-' +'01' + '-' +'01'
          this.CstartingDate=currentDate.getFullYear() + '-' +'01' + '-' +'01'
          this.endingDate=currentDate.getFullYear() + '-' +'04' + '-' +'30'
        }
        else if(currentMonth==1&&currentDate.getDate()<4) //if jan 1 -5 display dec 25+
        {
          this.currentYear = currentDate.getFullYear()-1 + '-' + currentDate.getFullYear() ;
          this.startingDate=currentDate.getFullYear() + '-' +'01' + '-' +'01'
          this.CstartingDate=currentDate.getFullYear()-1 + '-' +'12' + '-' +'27'
          this.endingDate=currentDate.getFullYear() + '-' +'03' + '-' +'31'
        }
        else
        {
          this.currentYear = currentDate.getFullYear()-1 + '-' + currentDate.getFullYear() ;
          this.startingDate=currentDate.getFullYear() + '-' +'01' + '-' +'01'
          this.CstartingDate=currentDate.getFullYear() + '-' +'01' + '-' +'01'
          this.endingDate=currentDate.getFullYear() + '-' +'03' + '-' +'31'
        }
   }
   //Apr-jun
   else if(currentMonth>3 && currentMonth<=6)
   {
    this.currentQuarter=1

    if(currentMonth==6&&currentDate.getDate()>=25) //if jun 25+ display july
    {
      this.currentYear = currentDate.getFullYear()  + '-' + (currentDate.getFullYear()+1) ;
      this.startingDate=currentDate.getFullYear() + '-' +'04' + '-' +'01'
      this.CstartingDate=currentDate.getFullYear() + '-' +'04' + '-' +'01'
      this.endingDate=currentDate.getFullYear() + '-' +'07' + '-' +'31'

    }
    else if(currentMonth==4&&currentDate.getDate()<4) //if April 1 -5 display mar 25+
    {
      this.currentYear = currentDate.getFullYear()  + '-' + (currentDate.getFullYear()+1) ;
      this.startingDate=currentDate.getFullYear() + '-' +'04' + '-' +'01'
      this.CstartingDate=currentDate.getFullYear() + '-' +'03' + '-' +'27'
      this.endingDate=currentDate.getFullYear() + '-' +'06' + '-' +'30'
    }
    else
    {
      this.currentYear = currentDate.getFullYear()  + '-' + (currentDate.getFullYear()+1) ;
      this.startingDate=currentDate.getFullYear() + '-' +'04' + '-' +'01'
      this.CstartingDate=currentDate.getFullYear() + '-' +'04' + '-' +'01'
      this.endingDate=currentDate.getFullYear() + '-' +'06' + '-' +'30'
    }


   }
   //jul-sep
   else if(currentMonth>6 && currentMonth<=9)
   {
     this.currentQuarter=2
     if(currentMonth==9&&currentDate.getDate()>=25) //if sep 25+
     {
      this.currentYear = currentDate.getFullYear() + '-' + (currentDate.getFullYear()+1) ;
      this.startingDate=currentDate.getFullYear() + '-' +'07' + '-' +'01'
      this.CstartingDate=currentDate.getFullYear() + '-' +'07' + '-' +'01'
      this.endingDate=currentDate.getFullYear() + '-' +'10' + '-' +'31'
     }
     else if(currentMonth==7&&currentDate.getDate()<4) //if jul 1 -5 display jun 25+
     {
      this.currentYear = currentDate.getFullYear() + '-' + (currentDate.getFullYear()+1) ;
      this.startingDate=currentDate.getFullYear() + '-' +'07' + '-' +'01'
      this.CstartingDate=currentDate.getFullYear() + '-' +'06' + '-' +'27'
      this.endingDate=currentDate.getFullYear() + '-' +'09' + '-' +'30'
     }
     else
     {
      this.currentYear = currentDate.getFullYear() + '-' + (currentDate.getFullYear()+1) ;
      this.startingDate=currentDate.getFullYear() + '-' +'07' + '-' +'01'
      this.CstartingDate=currentDate.getFullYear() + '-' +'07' + '-' +'01'
      this.endingDate=currentDate.getFullYear() + '-' +'09' + '-' +'30'
     }

   }
   //oct-dec
   else if(currentMonth>9 && currentMonth<=12)
   {
    this.currentQuarter=3
    if(currentMonth==12&&currentDate.getDate()>=25) //if dec 25+
    {
      this.currentYear = currentDate.getFullYear() + '-' + (currentDate.getFullYear()+1) ;
      this.startingDate=currentDate.getFullYear() + '-' +'10' + '-' +'01'
      this.CstartingDate=currentDate.getFullYear() + '-' +'10' + '-' +'01'
      this.endingDate=currentDate.getFullYear()+1 + '-' +'01' + '-' +'31'
    }
    else if(currentMonth==10&&currentDate.getDate()<4) //if jul 1 -5 display jun 25+
    {
      this.currentYear = currentDate.getFullYear() + '-' + (currentDate.getFullYear()+1) ;
      this.startingDate=currentDate.getFullYear() + '-' +'10' + '-' +'01'
      this.CstartingDate=currentDate.getFullYear() + '-' +'09' + '-' +'27'
      this.endingDate=currentDate.getFullYear() + '-' +'12' + '-' +'31'
    }
    else
    {
      this.currentYear = currentDate.getFullYear() + '-' + (currentDate.getFullYear()+1) ;
      this.startingDate=currentDate.getFullYear() + '-' +'10' + '-' +'01'
      this.CstartingDate=currentDate.getFullYear() + '-' +'10' + '-' +'01'
      this.endingDate=currentDate.getFullYear() + '-' +'12' + '-' +'31'
    }
   }


  }


 }
