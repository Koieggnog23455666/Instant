import { EventEmitter, Injectable } from '@angular/core';
import { Login, SignUp } from '../interface';
import { Constant } from './constant/constant';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isUserLoggedIn= new BehaviorSubject<boolean>(false)
  loginError = new EventEmitter<boolean>(false)
  constructor(private http:HttpClient,private router:Router,private toaster:ToastrService) { }
  userSignUp(data: SignUp) {
    return this.http.post(Constant.API_ENDPOINT + Constant.METHOD.USER, data, { observe: 'response' }).subscribe((res) => {
        this.isUserLoggedIn.next(true)
        localStorage.setItem('users', JSON.stringify([res.body]))
        this.router.navigate(['/'])
    })
}
userLogin(data:Login){
  this.http.get(Constant.API_ENDPOINT + Constant.METHOD.USER + `?email=${data.email}&password=${data.password}`, { observe: 'response' }).subscribe((res: any) => {
            
    if (res && res.body && res.body.length) {
      this.toaster.success("User LogIn")
        localStorage.setItem('users', JSON.stringify(res.body))
        this.router.navigate(['/']);
    }
    else {
        this.loginError.emit(true)
    }
})
}
userAuthReload(){
  if(localStorage.getItem('users')){
    this.router.navigate(['/'])
  }
}
}
