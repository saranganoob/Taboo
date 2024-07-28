import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RouteGuardService implements CanActivate {

  constructor(private router: Router, private http: HttpClient) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url = state.url;
    return this.verifyLogin();
  }

  verifyLogin(): boolean {
    // alert(this.isLoggedIn());
    if (this.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/authentication']);
      return false;
    }
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem('token') ? true : false;
  }
}
