import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SellerService } from '../services/seller.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default'
  sellerName:string=''
  
  constructor(private route: Router,private sellerSrv:SellerService) { }
  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
      
          if (localStorage.getItem('seller') && val.url.includes('seller')) {
            this.menuType = 'seller'
            if(localStorage.getItem('seller')){
              let seller=localStorage.getItem('seller')
              let sellerData=seller && JSON.parse(seller)[0];
              this.sellerName=sellerData.username;
            }
          }
          else {
            this.menuType = 'default'
          }
        
      }
    })
  }

  logOut(){
    localStorage.removeItem('seller')
    this.route.navigate(['/'])
  }
  
}
