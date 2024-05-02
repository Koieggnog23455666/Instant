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
  imageUrl: string | undefined;
  selectedFile!: File; 
  
  constructor(private product: ProductService,private router:Router) { }
  ngOnInit(): void {
    this.product.showProduct().subscribe((res) => {
      this.productList = res
    })
  }
  submit(data: Product) {
    console.log(data)
    this.product.addProduct(data).subscribe((res) => {
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
    this.selectedFile = event.target.files[0];
  }

  convertFileToUrl() {
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => {
      this.imageUrl = reader.result as string;
    };
  }
 
}
