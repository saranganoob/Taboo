import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'AngularMsSql';
  loaderStatus = true;
  getAppStatus: any;

  constructor(public commonservice: CommonService,
    private cd: ChangeDetectorRef){

    this.getAppStatus = this.commonservice.getLoaderStatus().subscribe((res) => {
      setTimeout(() => {
        this.loaderStatus = res;
        // this.cd.detectChanges();
      }, 0);

    });

  }

  ngOnInit() {
    // this.ngxService.start();
    // setTimeout(() => {
    //   this.ngxService.stop();
    // }, 2000);



  }

}
