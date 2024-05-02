import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../interface';
import { subscribe } from 'diagnostics_channel';

@Component({
  selector: 'app-seller-add-products',
  templateUrl: './seller-add-products.component.html',
  styleUrl: './seller-add-products.component.css'
})
export class SellerAddProductsComponent implements OnInit {
productList:Product[] | undefined
  addedProduct:string|undefined
  constructor(private product: ProductService){}
  ngOnInit(): void {
    this.product.showProduct().subscribe((res)=>{
this.productList=res
    })
  }
  submit(data:Product){
    console.log(data)
    this.product.addProduct(data).subscribe((res)=>{
console.log(res)
if(res){
  this.addedProduct = "Product Added Successfully"
}setTimeout(() => {
  this.addedProduct=undefined
}, 3000);
    })
  }

}
