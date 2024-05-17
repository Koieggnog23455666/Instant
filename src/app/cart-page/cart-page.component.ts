import { Component, OnInit } from '@angular/core';
import {  faTrash } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../services/product.service';
import { Cart, CartSummary, Product } from '../interface';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent implements OnInit {
deleteIcon=faTrash
cartItem:number=0
cartGetDetail:Cart[]|undefined
cartSummary:CartSummary={
  
  price:0,
  discount:0,
  tax:0,
  delivery:0,
  total:0
}
constructor(private product:ProductService,private router:Router,private toaster:ToastrService){}
ngOnInit(): void {
  this.product.cartData.subscribe((item)=>{
    if(item){
      this.cartItem=item.length
      
    }
    
  })
  
  let user=localStorage.getItem('users')
  let userId=user && JSON.parse(user)[0].id
  
  
  this.product.getCartList(userId)
    this.listing()
 
}
deleteProduct(cartId?:string){
  let users = localStorage.getItem('users')
  let userData = users && JSON.parse(users)[0]
  if(cartId){
    this.product.deleteProductFromCart(cartId).subscribe((res)=>{
      if(res){
        this.toaster.info("Item is deleted")
        this.listing()
        this.product.getCartList(userData.id)
        this.product.currentCartDetail()
      }
    })
  }
 
}
listing(){
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
checkout(){
  this.router.navigate(['/checkoutPage'])
}
}
