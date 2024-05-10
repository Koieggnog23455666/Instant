import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';
import { ProductService } from '../services/product.service';
import { Product } from '../interface';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  productData:undefined|Product
  productQuantity:number=1
  removeCart:boolean=false
constructor(private router:ActivatedRoute,private product:ProductService){}
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
    this.product.addToCart(this.productData)
    this.removeCart=true
  }
}
removeFromCart(id:string){
  this.product.removeFromCart(id)
  this.removeCart=false
}
}
