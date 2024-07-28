import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonService } from './services/common.service';
import { RouteGuardService } from './services/route-guard.service';
import { RoleGuardService } from './services/role-guard.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HashLocationStrategy,LocationStrategy } from '@angular/common';

// import { NgxUiLoaderModule,SPINNER } from "ngx-ui-loader";


import * as $ from 'jquery';





@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    MatSnackBarModule,


  ],
  providers: [CommonService, RouteGuardService, RoleGuardService,{provide:LocationStrategy,useClass:HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
