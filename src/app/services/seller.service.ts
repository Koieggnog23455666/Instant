import { HttpClient } from '@angular/common/http'

import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Constant } from './constant/constant';
import { Login, SignUp } from '../interface';
import { allowedNodeEnvironmentFlags } from 'process';
import { EventEmitter, Injectable } from '@angular/core'
import { ToastrService } from 'ngx-toastr';
@Injectable({
    providedIn: 'root'
})
export class SellerService {
    userLogin(data: Login) {
      throw new Error('Method not implemented.');
    }
    isUserLoggedIn = new BehaviorSubject<boolean>(false)
    localStorage: Storage | undefined;

    loginError = new EventEmitter<boolean>(false)
    constructor(private http: HttpClient, private router: Router,private toaster:ToastrService) { }
// getSeller(){
//     return this.http.get(Constant.API_ENDPOINT+Constant.METHOD.SELLER).subscribe((res)=>{
//         if(res){
//             console.log("seller sevice", res)
//         }
//     })
// }

    sellerSignUp(data: SignUp) {
        return this.http.post(Constant.API_ENDPOINT + Constant.METHOD.SELLER, data, { observe: 'response' }).subscribe((res) => {
            if(res){
                this.toaster.success("User LogIn")
            }
            this.isUserLoggedIn.next(true)
            localStorage.setItem('seller', JSON.stringify(res.body))
            this.router.navigate(['seller-home'])
        })
    }
        
    reloaderSeller() {
        // if (typeof this.localStorage !== 'undefined') {
            if (localStorage.getItem('seller')) {
                this.isUserLoggedIn.next(true)
                this.router.navigate(['seller-home'])
                
            // }
        }

    }
    sellerLogin(data: Login) {
        this.http.get(Constant.API_ENDPOINT + Constant.METHOD.SELLER + `?email=${data.email}&password=${data.password}`, { observe: 'response' }).subscribe((res: any) => {
            
            if (res && res.body && res.body.length) {
                this.toaster.success("Seller LogIn")
                localStorage.setItem('seller', JSON.stringify(res.body))
                this.router.navigate(['seller-home']);
            }
            else {
                this.loginError.emit(true)
            }
        })
    }
    userSignUp(data: SignUp) {
        return this.http.post(Constant.API_ENDPOINT + Constant.METHOD.SELLER, data, { observe: 'response' }).subscribe((res) => {
            if(res){
                this.toaster.success("User LogIn")
            }
            this.isUserLoggedIn.next(true)
            localStorage.setItem('seller', JSON.stringify(res.body))
            this.router.navigate(['seller-home'])
        })
    }
}

