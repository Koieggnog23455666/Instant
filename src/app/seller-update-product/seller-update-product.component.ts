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
  imageUrl:string=""
  getImage:string=""

  constructor(private route:ActivatedRoute,private product:ProductService,private router:Router){}
  
ngOnInit(): void {
  let productId=this.route.snapshot.paramMap.get('id')
productId && this.product.getProduct(productId).subscribe((productData)=>{
 this.productData =productData
 this.getImage=productData.image
 
})
}
  submit(data:Product){
    if(this.productData){
      data.id=this.productData.id
    }
    const image = this.imageUrl ? this.imageUrl : this.getImage;
    this.product.updateProduct({...data,image:image}).subscribe((res)=>{
      if(res){
        this.updatedMessage="Product Updated"
      }
    })
    setTimeout(() => {
      this.updatedMessage=''
this.router.navigate(['seller-home'])
    }, 3000);
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if(file){
      const reader:FileReader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl = reader.result as string
        console.log("ImageUrl",this.imageUrl)
          
      };
    }
    // this.convertBase64()
    }
   
}
