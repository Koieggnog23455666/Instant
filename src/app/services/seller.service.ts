import { HttpClient } from '@angular/common/http'

import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Constant } from './constant/constant';
import { Login, SignUp } from '../interface';
import { allowedNodeEnvironmentFlags } from 'process';
import { EventEmitter, Injectable } from '@angular/core'
@Injectable({
    providedIn: 'root'
})
export class SellerService {
    isUserLoggedIn = new BehaviorSubject<boolean>(false)
    localStorage: Storage | undefined;

    loginError = new EventEmitter<boolean>(false)
    constructor(private http: HttpClient, private router: Router) { }
    reloaderSeller() {
        if (typeof this.localStorage !== 'undefined') {
            if (localStorage.getItem('seller')) {
                this.isUserLoggedIn.next(true)
                this.router.navigate(['seller-home'])
            }
        }

    }

    userSignUp(data: SignUp) {
        return this.http.post(Constant.API_ENDPOINT + Constant.METHOD.SELLER, data, { observe: 'response' }).subscribe((res) => {
            this.isUserLoggedIn.next(true)
            localStorage.setItem('seller', JSON.stringify(res.body))
            this.router.navigate(['seller-home'])
        })
    }
    userLogin(data: Login) {
        this.http.get(Constant.API_ENDPOINT + Constant.METHOD.SELLER + `?email=${data.email}&password=${data.password}`, { observe: 'response' }).subscribe((res: any) => {
            console.log(res.body)
            if (res && res.body && res.body.length) {
                console.log('Login Successfully')
                localStorage.setItem('seller', JSON.stringify(res.body))
                this.router.navigate(['seller-home']);
            }
            else {
                this.loginError.emit(true)
            }
        })
    }
}

