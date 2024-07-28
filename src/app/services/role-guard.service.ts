import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuardService implements CanActivate {

  constructor(private router: Router, private http: HttpClient)  { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
    if (this.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/auth/login']);
    }
    return false;
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem('token') ? true : false;
  }
}
