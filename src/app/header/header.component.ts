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
    
    constructor(private route: Router,private productSrv:ProductService) { }
    ngOnInit(): void {
      this.route.events.subscribe((val: any) => {
        if (val.url) {
          console.log("val url",val.url)

          if(typeof localStorage!=='undefined'){
            if (localStorage.getItem('seller') && val.url.includes('seller')) {
              if(localStorage.getItem('seller')){
                let seller=localStorage.getItem('seller')
                let sellerData=seller && JSON.parse(seller)[0];
                this.sellerName=sellerData.username;
                
                this.menuType = 'seller'
              }
            }
            else if(localStorage.getItem('users') && val.url.includes('/')){
              let users=localStorage.getItem('users')
              let userData=users && JSON.parse(users)[0]
              console.log(userData)
              this.UserName=userData.username
              
              console.log("user data",this.UserName)
              this.menuType='user'
            }
            else {
              this.menuType = 'default'
            }
          }
        }
      })
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
