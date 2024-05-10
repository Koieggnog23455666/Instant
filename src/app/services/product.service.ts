import { HttpClient } from '@angular/common/http';
import { Injectable,EventEmitter } from '@angular/core';
import { Product } from '../interface';
import { Constant } from './constant/constant';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
cartData=new EventEmitter<Product[]|[]>()
  constructor(private http:HttpClient) { }
  addProduct(data:Product){
return this.http.post(Constant.API_ENDPOINT+Constant.METHOD.PRODUCT,data)
  }
  showProduct(){
return this.http.get<Product[]>(Constant.API_ENDPOINT+Constant.METHOD.PRODUCT)
  }
  deleteProduct(id:string){
return this.http.delete(Constant.API_ENDPOINT+Constant.METHOD.PRODUCTS+id)
  }
  getProduct(id:string){
    return this.http.get<Product>(Constant.API_ENDPOINT+Constant.METHOD.PRODUCTS+id)
  }
  updateProduct(product:Product){
    return this.http.put<Product>(Constant.API_ENDPOINT+Constant.METHOD.PRODUCTS+product.id,product)
  }
  populateProduct(){
    return this.http.get<Product[]>(Constant.API_ENDPOINT+Constant.METHOD.PRODUCTS+`?_limit=5`)
  }
  trendyProduct(){
    return this.http.get<Product[]>(Constant.API_ENDPOINT+Constant.METHOD.PRODUCTS)
  }
  searchProduct(query:string){
    return this.http.get<Product[]>(Constant.API_ENDPOINT+Constant.METHOD.PRODUCT+`?name=${query}`)
  }
  addToCart(data:Product){
    let cartData=[]
    let localCart=localStorage.getItem('localCart')
    if(!localCart){
      localStorage.setItem('localCart',JSON.stringify([data]))
    }
    else{
      cartData=JSON.parse(localCart)
      cartData.push(data)
      localStorage.setItem('localCart',JSON.stringify(cartData))
    }
    this.cartData.emit(cartData)
  }
  removeFromCart(productId:string){
    let cartData=localStorage.getItem('localCart')
    console.log(typeof productId)
    if(cartData){
      let removedData:Product[]=JSON.parse(cartData)
      removedData=removedData.filter((remove:Product)=>productId!=remove.id)
      localStorage.setItem('localCart',JSON.stringify(removedData))
      this.cartData.emit(removedData)
    }
  }
}
