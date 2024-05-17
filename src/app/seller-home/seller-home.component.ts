import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../interface';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { MatDialog,MatDialogConfig  } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../seller-home/delete-dialog/delete-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css'
})
export class SellerHomeComponent implements OnInit {
  productList:undefined|Product[]
  productMessage:string=''
  icon=faTrash
  editIcon=faEdit
  
constructor(private product: ProductService,private dialogRef:MatDialog,private toaster:ToastrService ){}
  ngOnInit(): void {
    this.listing()
  }
  deleteProduct(data:Product){
    const dialogRef = this.dialogRef.open(DeleteDialogComponent, {
      width: '350px',
      height: '450px',
      enterAnimationDuration:'100ms',
      exitAnimationDuration : '100ms',
      
      data: { id: data.id, name: data.name, image: data.image }
    });
    dialogRef.afterClosed().subscribe((result:any) =>{
if(result){
    this.product.deleteProduct(data.id).subscribe((res)=>{
      if(res){
        this.toaster.info("Product is deleted")
        this.listing()
      }
    })
    setTimeout(() => {
      this.productMessage = '';
    }, 3000);

}
    })
  
   }
   listing(){
    this.product.showProduct().subscribe((res)=>{
      this.productList=res
          })
   }
   openDialog(){

    // this.mode=='Add'
      this.dialogRef.open(DeleteDialogComponent,{
        
        data:{basket:"Hello World"},
        
        width:'100px',
        height:'100px',
        
        
      })
    
    
    }
}
