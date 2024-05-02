import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../interface';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css'
})
export class SellerHomeComponent implements OnInit {
  productList:undefined|Product[]
constructor(private product: ProductService ){}
  ngOnInit(): void {
    this.product.showProduct().subscribe((res)=>{
      this.productList=res
          })
  }
}
