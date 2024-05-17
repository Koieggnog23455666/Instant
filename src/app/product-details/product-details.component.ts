import { Component, Inject, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';
import { ProductService } from '../services/product.service';
import { Cart, Product } from '../interface';
import { ToastrService } from 'ngx-toastr';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  productData:undefined|Product
  productQuantity:number=1
  removeCart:boolean=false
  cartData:Product|undefined
  cartItem:number=0
  
constructor(private router:ActivatedRoute,private product:ProductService,public toaster:ToastrService){}
ngOnInit(): void {
  
  const productId=this.router.snapshot.paramMap.get('productId')
  productId && this.product.getProduct(productId).subscribe((res)=>{
this.productData=res
  })
  let cartData=localStorage.getItem('localCart')
  if(productId && cartData){
   let items=JSON.parse(cartData)
   items=items.filter((item:Product)=>productId===item.id.toString())
   if(items.length){
    this.removeCart=true
   }
   else{
    this.removeCart=false
   }
  }
  
  let user=localStorage.getItem('users')
  let userId=user && JSON.parse(user)[0].id
  if(user){
    let userId=user && JSON.parse(user)[0].id
    this.product.getCartList(userId)
    this.product.cartData.subscribe((res)=>{
     let item =res.filter((item)=>productId?.toString()===item.productId?.toString())
    if(item.length){
      this.cartData=item[0]
      
      this.removeCart=true
    }
      
    })

  }
   cartData=localStorage.getItem('localCart')
  if(cartData){
    this.cartItem=JSON.parse(cartData).length
  }
  this.product.cartData.subscribe((item)=>{
    this.cartItem=item.length
  })
  this.product.getCartList(userId)
  
}
handleQuantity(val:string){
  if(this.productQuantity<20 && val==='plus'){
    this.productQuantity++
  }
  else if(this.productQuantity>1 && val==='min'){
    this.productQuantity--
  }
}
addToCart(){
  if(this.productData){
    this.productData.quantity=this.productQuantity
    if(!localStorage.getItem('users')){
      this.product.addToCart(this.productData)
      this.removeCart=true
    }
    else{
      let user=localStorage.getItem('users')
      let userId=user && JSON.parse(user)[0].id
      let cartData:Cart={
        ...this.productData,
        userId,
        productId:this.productData.id
      }
      console.log("",cartData)
      delete cartData.id
      this.product.addItemtoCart(cartData).subscribe((res)=>{
        if(res){
          this.toaster.success("Item is added")
          this.product.getCartList(userId)
          this.removeCart=true
        }
      })
      
    }
  }
 
}
removeFromCart(id:string){
  
  let user=localStorage.getItem('users')
  let userId=user && JSON.parse(user)[0].id
  if(!user){
    this.product.removeFromCart(id)
    
  }else{
this.cartData && this.product.removeItemFromCart(this.cartData.id).subscribe((res)=>{
  
  if(res){
    this.toaster.error("Item is removed")
    this.product.getCartList(userId)
  }
})
this.removeCart=false
  }

}
}
