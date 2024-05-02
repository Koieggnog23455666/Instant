import { Component, OnInit } from '@angular/core';
import { copyFileSync } from 'fs';
import { SellerService } from '../services/seller.service';
import { subscribe } from 'diagnostics_channel';
import { Router } from '@angular/router';
import { Login, SignUp } from '../interface';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css'
})
export class SellerAuthComponent implements OnInit {
  showLogin=false
  
  authError:string=''
constructor(private seller:SellerService,private router:Router){
}
  ngOnInit(): void {
    this.seller.reloaderSeller()
  }
  signUp(data:SignUp):void{
this.seller.userSignUp(data)
  }
  openLogin(){
    this.showLogin=true
  }
  openSignUp(){
    this.showLogin=false
  }
  login(data:Login):void{
    this.authError=''
    this.seller.userLogin(data)
    this.seller.loginError.subscribe((isError)=>{
      if(isError){
        this.authError="Email or Password is wrong"
      }
    })
  }
}
