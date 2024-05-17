import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Cart } from '../interface';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  cartDetail:Cart[]|undefined
  users = localStorage.getItem('users')
  userData = this.users && JSON.parse(this.users)[0]
constructor(private product:ProductService){
  
  this.product.getCartList(this.userData.id)
  this.product.currentCartDetail().subscribe((res)=>{
    this.cartDetail=res
    console.log(this.cartDetail)
  })
}

}
