import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  // admin autherization
  canActivate() {
    let role = localStorage.getItem('role');

    if(role == 'admin') {
      return true;
    }
    alert("You don't have admin rights");

    return false;
  }
  
}
