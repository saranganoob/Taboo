import { Component,ViewChild,ElementRef,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from 'src/app/services/common.service';


@Component({
  selector: 'app-dividant-distribution',
  templateUrl: './dividant-distribution.component.html',
  styleUrls: ['./dividant-distribution.component.scss']
})
export class DividantDistributionComponent implements OnInit {


  constructor(
  public http: HttpClient,
    private Commonservice: CommonService,) { }

  ngOnInit(): void {
  }


}
