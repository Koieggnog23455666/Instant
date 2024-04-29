import { Component, OnInit } from '@angular/core';
import { copyFileSync } from 'fs';
import { SellerService } from '../services/seller.service';
import { subscribe } from 'diagnostics_channel';
import { Router } from '@angular/router';
import { SignUp } from '../../../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css'
})
export class SellerAuthComponent implements OnInit {
constructor(private seller:SellerService,private router:Router){}
  ngOnInit(): void {}
  signUp(data:SignUp):void{
    console.log(data)
this.seller.userSignUp(data)
  }
}
