import { Component, OnInit } from '@angular/core';
import { Cart, Login, Product, SignUp } from '../interface';
import { UserService } from '../services/user.service';
import { producerAccessed } from '@angular/core/primitives/signals';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent implements OnInit {
  showLogin:boolean=false
  authError: string = '';
  ngOnInit(): void {
    this.user.userAuthReload()
    
  }
  constructor(private user:UserService,private product:ProductService
  ){}
  signup(data:SignUp):void{
    this.user.userSignUp(data)
  }
  openLogin(){this.showLogin=true}
  Login(data:Login){
    this.authError=''
    this.user.userLogin(data)
    this.user.loginError.subscribe((error)=>{
      if(error){
        this.authError='Email or Password is incorrect'
      }
      else{
        console.log("hello")

      }
    })
  }
  openSignUp(){this.showLogin=false}
  
  
}
