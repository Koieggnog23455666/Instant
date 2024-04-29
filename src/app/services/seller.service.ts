import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { SignUp } from '../../../data-type';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SellerService {
isUserLoggedIn=new BehaviorSubject<boolean>(false)
  constructor(private http:HttpClient,private router:Router) { }
  userSignUp(data:SignUp){
return this.http.post('http://localhost:3000/seller',data,{observe:'response'}).subscribe((res)=>{
  this.isUserLoggedIn.next(true)
  localStorage.setItem('seller',JSON.stringify(res.body))
this.router.navigate(['seller-home'])
})

}
}
