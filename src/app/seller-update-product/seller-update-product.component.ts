import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css'
})
export class SellerUpdateProductComponent implements OnInit{
  productData:Product|undefined
  updatedMessage:string=''
  constructor(private route:ActivatedRoute,private product:ProductService,private router:Router){}
ngOnInit(): void {
  let productId=this.route.snapshot.paramMap.get('id')
productId && this.product.getProduct(productId).subscribe((productData)=>{
 this.productData =productData
})
}
  submit(data:Product){
    if(this.productData){
      data.id=this.productData.id
    }
    this.product.updateProduct(data).subscribe((res)=>{
      if(res){
        this.updatedMessage="Product Updated"
      }
    })
    setTimeout(() => {
      this.updatedMessage=''
this.router.navigate(['/seller-home'])
    }, 3000);
  }
  onFileSelected(e:Event){}

}
