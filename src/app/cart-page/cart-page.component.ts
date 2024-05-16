import { Component, OnInit } from '@angular/core';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../services/product.service';
import { Cart, CartSummary } from '../interface';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent implements OnInit {
deleteIcon=faDeleteLeft
cartGetDetail:Cart[]|undefined
cartSummary:CartSummary={
  price:0,
  discount:0,
  tax:0,
  delivery:0,
  total:0
}
constructor(private product:ProductService){}
ngOnInit(): void {
  let users = localStorage.getItem('users')
    let userData = users && JSON.parse(users)[0]
  this.product.getCartList(userData.id)
  this.product.currentCartDetail().subscribe((res)=>{
    this.cartGetDetail=res
    let price=0
    res.forEach((item)=>{
      
      if(item.quantity){

        price=price+(+item.price * (+item.quantity))
      }
    })
  
    this.cartSummary.price=price
    this.cartSummary.delivery=100
    this.cartSummary.discount=price/10
    this.cartSummary.tax=price/15
    this.cartSummary.total=price+(price/10)+100-(price/10)

  })
}
}
