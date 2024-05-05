import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interface';
import { Constant } from './constant/constant';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  addProduct(data:Product){
return this.http.post(Constant.API_ENDPOINT+Constant.METHOD.PRODUCT,data)
  }
  showProduct(){
return this.http.get<Product[]>(Constant.API_ENDPOINT+Constant.METHOD.PRODUCT)
  }
  deleteProduct(id:string){
return this.http.delete<Product[]>(Constant.API_ENDPOINT+Constant.METHOD.PRODUCTS+id)
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
    return this.http.get<Product[]>(Constant.API_ENDPOINT+Constant.METHOD.PRODUCTS+`?_limit=8`)
  }
}
