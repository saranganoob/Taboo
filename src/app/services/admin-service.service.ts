import { Injectable } from '@angular/core';
import { CanActivate, Router ,CanActivateChild} from '@angular/router';
import { RoleGuardService } from './role-guard.service';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(private authService: RoleGuardService, private router: Router) {}
  LoginData: any = JSON.parse(sessionStorage.getItem('LoginData') || '{}');

  canActivate(): boolean {

      // Here, you can also check for user roles
      if (this.LoginData.subusertype==1) { // Check if user is admin
        return true; // Allow admin access to all routes including '/consumptionadm'
      } else {
        return false;
      }
  }

}
