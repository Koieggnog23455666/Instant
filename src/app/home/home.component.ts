import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Cart, Product } from '../interface';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

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
  removeCart:boolean=false
  constructor(private product:ProductService,private router:ActivatedRoute,private route:Router){}
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
      add(id:string
      ){
        this.route.navigate(['/detail/'+id])
        const productId=this.router.snapshot.paramMap.get('productId')
        productId && this.product.getProduct(productId).subscribe((res)=>{
      this.productData=res
        })
      }
      addToCart(id:string){
        const productId=id
    productId && this.product.getProduct(productId).subscribe((res)=>{
  this.productData=res
    })
    console.log(this.productData)
        if(this.productData){
          console.log("hell",this.productData)
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
                alert("Product is added to cart")
                this.product.getCartList(userId)
                this.removeCart=true
              }
            })
            
          }
        }
      }
}
