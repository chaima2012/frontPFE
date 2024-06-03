import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';

import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    
  constructor(private router:Router,private loginService:LoginService,private r:ActivatedRoute) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    let x:any
    x=route
    
   
    
    return true;
  }

  



}