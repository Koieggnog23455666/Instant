import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SellerService } from './services/seller.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  localStorage: Storage | undefined;
  constructor(private sellerSrv: SellerService,private router:Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem('seller')) {
      
      return true
    }
    return this.sellerSrv.isUserLoggedIn
  }
}
