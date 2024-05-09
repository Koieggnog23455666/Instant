import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SellerService } from '../services/seller.service';
import { BehaviorSubject } from 'rxjs';
import { ProductService } from '../services/product.service';
import { Product } from '../interface';
import { faCartPlus, faHome, faListCheck, faPeopleArrows, faPerson, faPlus, faRightFromBracket, faRightToBracket, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
  })
export class HeaderComponent implements OnInit {
    menuType: string = 'default'
    sellerName:string=''
    UserName:string=''
    searchResult:undefined|Product[]
    searchIcon=faSearch
    homeIcon=faHome
    sellerIcon=faPerson
    loginIcon=faRightFromBracket
    logoutIcon=faRightToBracket
    cartIcon=faCartPlus
    listIcon=faListCheck
    addIcon=faPlus
    userIcon=faPerson
    
<<<<<<< HEAD
    constructor(private route: Router,private productSrv:ProductService,private seller:SellerService) { }
=======
    constructor(private route: Router,private productSrv:ProductService) { }
>>>>>>> 0687286f9bb971489f5e8b9802cb1f276e2d2969
    ngOnInit(): void {
      this.route.events.subscribe((val: any) => {
        if (val.url) {
          if(typeof localStorage!=='undefined'){
            if (localStorage.getItem('seller') && val.url.includes('seller')){
              this.menuType = 'seller'
              if(localStorage.getItem('seller')){
                let seller=localStorage.getItem('seller')
                let sellerData=seller && JSON.parse(seller)
                console.log(sellerData.username)
                this.sellerName=sellerData.username;
              }
            }
<<<<<<< HEAD
            else if(localStorage.getItem('users') && val.url.includes('/')){
              let users=localStorage.getItem('users')
              let userData= JSON.parse(users||'')
              console.log(userData)
=======
            else if(localStorage.getItem('users') ){
              let user=localStorage.getItem('users')
              let userData=user && JSON.parse(user)[0]
              
>>>>>>> 0687286f9bb971489f5e8b9802cb1f276e2d2969
              this.UserName=userData.username
              this.menuType='user'
            }
            else {
              this.menuType = 'default'
            }
          }
        }
      })
      this.seller.getSeller()
    }
    submit(val:string){
       // console.warn(val);
    this.route.navigate([`search/${val}`]);

    }
  
    logOut(){
      localStorage.removeItem('seller')
      this.route.navigate(['/'])
    }
    userLogOut(){
      localStorage.removeItem('users')
      this.route.navigate(['/'])
    }
    searchProduct(query:KeyboardEvent){
      if(query){
        const element=query.target as HTMLInputElement
        console.log(element.value)
        this.productSrv.searchProduct(element.value).subscribe((res)=>{
          if(res.length>5){
            res.length=length
          }
          this.searchResult=res
          console.log("Result",res)
        })
      }
      
    }
    hideSearch(){
      this.searchResult=undefined
    }
    redirectToDetail(id:string){
      this.route.navigate(['/detail/'+id])
    }
  }
