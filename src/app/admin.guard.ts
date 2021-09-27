import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router : Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      

      let adminStr = localStorage.getItem("LOGGED_IN_USER");
      let admin = adminStr != null ? JSON.parse(adminStr) : [];

      if(admin.email != null && admin.role == "admin")
      {
        return true;
      }
      else
      {
        alert("you are not authorized to access this page only for admin");
        this.router.navigate(["/admin"]);
        return false;
      }
  }
  
}
