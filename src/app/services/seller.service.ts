import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { SignUp } from '../../../data-type';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Constant } from './constant/constant';
@Injectable({
  providedIn: 'root'
})
export class SellerService {
isUserLoggedIn=new BehaviorSubject<boolean>(false)
  constructor(private http:HttpClient,private router:Router) { }
  userSignUp(data:SignUp){
return this.http.post(Constant.API_ENDPOINT+Constant.METHOD.SELLER,data,{observe:'response'}).subscribe((res)=>{
  this.isUserLoggedIn.next(true)
  localStorage.setItem('seller',JSON.stringify(res.body))
this.router.navigate(['seller-home'])
})

}
reloaderSeller(){
  if(localStorage.getItem('seller')){
    this.isUserLoggedIn.next(true)
    this.router.navigate(['seller-home'])
  }
}
}
