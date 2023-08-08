import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RequirementserviceService } from './requirementservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  isToken!:boolean;

  constructor(private service: RequirementserviceService, private router:Router){}
  canActivate() {
    let role = localStorage.getItem('role');
    if(this.service.loggedIn() && role == 'admin') {
      this.router.navigate['/dashboard'];
      return true;
    } else if(this.service.loggedIn() && role == 'user') {
      this.router.navigate['/facultydashboard'];
      return true;
    }
    else {
      this.router.navigate['/login'];
      return false;
    }
  }
  
}
