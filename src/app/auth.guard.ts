import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SellerService } from './services/seller.service';
import { promises } from 'dns';

@Injectable({
  providedIn: 'root',
})
export class authGuard implements CanActivate {
  constructor(private sellerSrv: SellerService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree>| Promise<boolean | UrlTree>| boolean| UrlTree {
   if(typeof localStorage !=='undefined'){
    if (localStorage.getItem('seller')) {
      return true;
    }
  }
  return this.sellerSrv.isUserLoggedIn;
  }
}