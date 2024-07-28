import * as jQuery from 'jquery'
import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router,ActivatedRoute ,NavigationEnd} from '@angular/router';
import { Subject } from 'rxjs';
import { HostListener } from "@angular/core";
import { RoleService } from '../../services/role.service';
import { CommonService  } from '../../services/common.service';
declare var $: any;

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.scss']
})
export class HeadersComponent implements OnInit {

  menuitems=this.roleservice.userRole.Sales
  sidebar = true;
  public innerWidth: any;
  username: any;
  LoginData: any = JSON.parse(sessionStorage.getItem('LoginData') || '{}');
  title:string=""


  userInactive: Subject<any> = new Subject();
  userActivity:any
  session_time=1800000

  looplogout=true

  constructor(
    private router: Router,
    public http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private Commonservice: CommonService,
    public roleservice: RoleService) { }

  ngOnInit(): void {




    switch(this.LoginData.EmployeeType)
    {
      case 'sales':
      {
        if(this.LoginData.subusertype==1)
        {
          this.menuitems=this.roleservice.userRole.SalesCorp
        }
        else
        {
          this.menuitems=this.roleservice.userRole.Sales
        }
        break;
      }
      case 'treasurer':
        {
          this.menuitems=this.roleservice.userRole.treasurer
          break;
        }
      case 'finance':
      {
        this.menuitems=this.roleservice.userRole.finance
        break;
      }
      case 'energy':
      {
        if(this.LoginData.subusertype==1)
        {
          this.menuitems=this.roleservice.userRole.energyadmin
        }
        else
        {
          this.menuitems=this.roleservice.userRole.energy
        }
        break;
      }
      default:
        {
          this.menuitems=[]
          break;
        }
    }


    jQuery(($) => {
      $('ul.submenu').parent('li').addClass('hassubmenu');
      $('ul li a').click(function () {
        if ($(this).parent('li').hasClass('current') === false) {
          $(this).parent('li').addClass('current').siblings().removeClass('current');
        } else {
          $(this).parent('li').removeClass('current');
        }
      });
    });

    this.setTimeout();

    this.userInactive.subscribe(() =>
    {
     this.logout()
    this.Commonservice.openSnackBar('Logged out due to inactivity', 5000);
    }
    );


  }

  @HostListener('window:mousemove') refreshUserState() {

    clearTimeout(this.userActivity);
    this.setTimeout();


  }

  setTimeout() {
    this.userActivity = setTimeout(() => this.userInactive.next(undefined), this.session_time);

  }

  toggle(){
    this.sidebar = !this.sidebar;
    return this.sidebar
}


@HostListener('window:resize', ['$event'])
getScreenSize(event?: any) {
  this.innerWidth = window.innerWidth;
    if(this.innerWidth<=720)
    {
      this.sidebar = true
    }
    else
    {
      this.sidebar = false
    }
}


  // Disable keyboard
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    clearTimeout(this.userActivity);
    this.setTimeout();
}


  logout(){
    this.looplogout=false
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['/authentication/login']);
  }

  SetTitle(tit:any)
  {
    this.title=tit.name
  }

}


