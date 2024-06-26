import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Cart, Product, order } from '../interface';
import { Constant } from './constant/constant';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cartData = new EventEmitter<Product[] | []>()
  constructor(private http: HttpClient) { }
  addProduct(data: Product) {
    return this.http.post(Constant.API_ENDPOINT + Constant.METHOD.PRODUCT, data)
  }
  showProduct() {
    return this.http.get<Product[]>(Constant.API_ENDPOINT + Constant.METHOD.PRODUCT)
  }
  deleteProduct(id: string) {
    return this.http.delete(Constant.API_ENDPOINT + Constant.METHOD.PRODUCTS + id)
  }
  deleteProductFromCart(id: string) {
    return this.http.delete(Constant.API_ENDPOINT + Constant.METHOD.CARTS + id)
  }
  getProduct(id: string) {
    return this.http.get<Product>(Constant.API_ENDPOINT + Constant.METHOD.PRODUCTS + id)
  }
  updateProduct(product: Product) {
    return this.http.put<Product>(Constant.API_ENDPOINT + Constant.METHOD.PRODUCTS + product.id, product)
  }
  populateProduct() {
    return this.http.get<Product[]>(Constant.API_ENDPOINT + Constant.METHOD.PRODUCTS + `?_limit=5`)
  }
  trendyProduct() {
    return this.http.get<Product[]>(Constant.API_ENDPOINT + Constant.METHOD.PRODUCTS)
  }
  searchProduct(query: string) {
    return this.http.get<Product[]>(Constant.API_ENDPOINT + Constant.METHOD.PRODUCT + `?name=${query}`)
  }
  addToCart(data: Product) {
    let cartData = []
    let localCart = localStorage.getItem('localCart')
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]))
    }
    else {
      cartData = JSON.parse(localCart)
      cartData.push(data)
      localStorage.setItem('localCart', JSON.stringify(cartData))
    }
    this.cartData.emit(cartData)
  }
  removeFromCart(productId: string) {
    let cartData = localStorage.getItem('localCart')

    if (cartData) {
      let removedData: Product[] = JSON.parse(cartData)
      removedData = removedData.filter((remove: Product) => productId != remove.id)
      localStorage.setItem('localCart', JSON.stringify(removedData))
      this.cartData.emit(removedData)
    }
  }
  addItemtoCart(cartData: Cart) {
    return this.http.post(Constant.API_ENDPOINT + Constant.METHOD.CART, cartData)
  }
  getCartList(userId: string) {
    return this.http.get<Product[]>('http://localhost:3000/cart?userId=' + userId, { observe: 'response' }).subscribe((res) => {
      if (res && res.body) {
        this.cartData.emit(res.body)
      }
    })
  }
  removeItemFromCart(userId: string) {
    return this.http.delete('http://localhost:3000/cart/' + userId)
  }
  currentCartDetail() {
    let users = localStorage.getItem('users')
    let userData = users && JSON.parse(users)[0]
    return this.http.get<Cart[]>('http://localhost:3000/cart?userId=' + userData.id)
  }
  order(data:order){
    return this.http.post('http://localhost:3000/order/' , data)
  }
}
