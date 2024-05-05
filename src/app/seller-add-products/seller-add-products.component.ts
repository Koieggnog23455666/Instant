import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../interface';
import { subscribe } from 'diagnostics_channel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-add-products',
  templateUrl: './seller-add-products.component.html',
  styleUrl: './seller-add-products.component.css'
})
export class SellerAddProductsComponent implements OnInit {
  productList: Product[] | undefined
  addedProduct: string | undefined
  imageUrl: string =''
  selectedFile!: File; 
  constructor(private product: ProductService,private router:Router) { }
  ngOnInit(): void {
    this.product.showProduct().subscribe((res) => {
      this.productList = res
    })
  }
  submit(data: Product) {
    console.log("Data",{...data,image:this.imageUrl})
    this.product.addProduct({...data,image:this.imageUrl}).subscribe((res) => {
      console.log(res)
      if (res) {
        this.addedProduct = "Product Added Successfully"
      } setTimeout(() => {
        this.addedProduct = undefined
        this.router.navigate(['/seller-home'])
      }, 3000);
    })
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if(file){
      const reader:FileReader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl = reader.result as string
        // console.log("ImageUrl",this.imageUrl)
      };
    }
    }
   

  
 
}
