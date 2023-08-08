import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserroleGuard implements CanActivate {
  canActivate() {
    let role = localStorage.getItem('role');

    if(role == 'user') {
      return true;
    }
    alert("You are not a faculty");

    return false;
  }
  
}
