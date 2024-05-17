import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Cart, Checkout, order } from '../interface';
import { faUnderline } from '@fortawesome/free-solid-svg-icons';
import { log } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{
constructor(private product:ProductService,private route:Router){}
 users = localStorage.getItem('users')
 userData = this.users && JSON.parse(this.users)[0]
 totalPrice:number|undefined
ngOnInit(): void {

  this.product.getCartList(this.userData.id)
  this.product.currentCartDetail()

  this.product.currentCartDetail().subscribe((res)=>{
    
    
    let price=0
    res.forEach((item)=>{
      
      if(item.quantity){

        price=price+(+item.price * (+item.quantity))
      }
      })
  this.totalPrice=price+(price/10)+100-(price/10)
  })
}
submit(data:Checkout){
 let users = localStorage.getItem('users')
 let userId = users && JSON.parse(users)[0].id
 if(this.totalPrice){
  let ordered:order={
...data,
totalPrice:this.totalPrice,
userId,
  }
  this.product.order(ordered).subscribe((res)=>{
    if(res){
      alert("Order placed")
      this.route.navigate(['/my-order'])
    }
  })
 }
}
}
