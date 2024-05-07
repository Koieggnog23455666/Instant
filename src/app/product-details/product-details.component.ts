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
constructor(private router:ActivatedRoute,private product:ProductService){}
ngOnInit(): void {
  const productId=this.router.snapshot.paramMap.get('productId')
  productId && this.product.getProduct(productId).subscribe((res)=>{
this.productData=res
  })

}
handleQuantity(val:string){
  if(this.productQuantity<20 && val==='plus'){
    this.productQuantity++
  }
  else if(this.productQuantity>1 && val==='min'){
    this.productQuantity--
  }
}
}
