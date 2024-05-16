import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Cart, Product } from '../interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  popularProduct:undefined|Product[]
  trendyProduct:undefined|Product[]
  productData:undefined|Product
  productQuantity:number=1
  constructor(private product:ProductService,private router:ActivatedRoute){}
  ngOnInit(): void {
    const productId=this.router.snapshot.paramMap.get('productId')
    productId && this.product.getProduct(productId).subscribe((res)=>{
  this.productData=res
    })
    this.product.populateProduct().subscribe((res)=>{
      
      this.popularProduct=res
    })
    this.product.trendyProduct().subscribe((data)=>{
      this.trendyProduct=data
    })
    this.addItemToRemoteCart()
  }
  addItemToRemoteCart(){
    let cart=localStorage.getItem('localCart')
    let user= localStorage.getItem('users')
    console.log("user",user)
    let userId=user && JSON.parse(user)[0].id
    console.log("userID",userId)
    if(cart){
      let cartDataList:Product[]=JSON.parse(cart)
    
      cartDataList.forEach((product:Product,index) => {
        let cartData:Cart={
          ...product,
          userId,
          productId:product.id
        }
        delete cartData.id
        setTimeout(() => {
          this.product.addItemtoCart(cartData).subscribe((res)=>{
            if(res){
              console.log("Items are saved to db")
    
            }
          })
          if(cartDataList.length===index+1){
            localStorage.removeItem('localCart')
                }
        }, 500);
       
      });
    }
    setTimeout(() => {
      this.product.getCartList(userId)
      
    }, 2000);
      }
}
