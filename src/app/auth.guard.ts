import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate,  Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SellerService } from './services/seller.service';
@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {
  localStorage: Storage | undefined;
  constructor(private sellerSrv: SellerService,private router:Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot): |Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(typeof localStorage !=='undefined'){
        if (localStorage.getItem('seller')) {
          return true;
        }
       }
    return this.sellerSrv.isUserLoggedIn
  }
}
