import { Component, OnInit } from '@angular/core';
import { Login, SignUp } from '../interface';
import { UserService } from '../services/user.service';

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
  constructor(private user:UserService){}
  signup(data:SignUp):void{
    this.user.userSignUp(data)
  }
  openLogin(){this.showLogin=true}
  Login(data:Login):void{
    this.authError=''
    this.user.userLogin(data)
    this.user.loginError.subscribe((error)=>{
      if(error){
        this.authError='Email or Password is incorrect'
      }
    })
  }
  openSignUp(){this.showLogin=false}
  
}
