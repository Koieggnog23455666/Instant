import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { SignUp } from '../interface';

@Component({
  selector: 'app-selling-auth',
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css',
})
export class SellingAuthComponent implements OnInit {

  constructor(private sellerSrv: SellerService, private router: Router) {}
  showLogin = false;
  authError: string = '';
  ngOnInit(): void {
    this.sellerSrv.reloaderSeller();
  }
  signup(data: SignUp): void {
    this.sellerSrv.userSignUp(data);
  }

  Login(data: any) {
    this.authError =''
    this.sellerSrv.userLogin(data);
    this.sellerSrv.loginError.subscribe((isError) => {
      if (isError) {
        this.authError = 'Email  and Password is not correct';
      }
    });
  }
  openLogin() {
    this.showLogin = !this.showLogin;
  }
  openSignUp(){
this.showLogin=false
  }
}
