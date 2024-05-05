import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  popularProduct:undefined|Product[]
  trendyProduct:undefined|Product[]
  constructor(private product:ProductService){}
  ngOnInit(): void {
    this.product.populateProduct().subscribe((res)=>{
      console.log("Products are populated");
      this.popularProduct=res
    })
    this.product.trendyProduct().subscribe((data)=>{
      this.trendyProduct=data
    })
  }
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
}
