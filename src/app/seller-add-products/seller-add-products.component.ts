import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../interface';
import { subscribe } from 'diagnostics_channel';
import { Router } from '@angular/router';
import { faImage, faPercent } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-seller-add-products',
  templateUrl: './seller-add-products.component.html',
  styleUrl: './seller-add-products.component.css'
})
export class SellerAddProductsComponent implements OnInit {
  productList: Product[] | undefined
  addedProduct: string | undefined
  imageUrl: string|undefined
  getImage:undefined|string
  selectedFile!: File
  galleryIcon=faImage
  
  constructor(private product: ProductService,private router:Router,private toaster:ToastrService) { }
  ngOnInit(): void {
    this.product.showProduct().subscribe((res) => {
      this.productList = res
    })
  }
  submit(data: Product) {
    
    this.product.addProduct({...data,image:this.imageUrl?this.imageUrl:""}).subscribe((res) => {
      setTimeout(() => {
        this.toaster.success("Product is added")
        this.router.navigate(['seller-home'])
      }, 2000);
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
