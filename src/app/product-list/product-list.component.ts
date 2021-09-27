import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductsService } from '../products.service';
import { UpdateProductComponent } from '../update-product/update-product.component';


export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  animal!: string;
  name!: string;
  product!: any;

  productList: any;

  selectedCategory: any;

  ascProductList: any;

  constructor(private productService : ProductsService, private spinner : NgxSpinnerService,
    public dialog: MatDialog) 
    { 
      this.getAllProducts();
    }

  ngOnInit() {
  }


  categories:any;
  searchResults:any;
  getAllProducts()
  {
    this.spinner.show();
    this.productService.getAttachmentProducts().then((res: any) => {

      console.log(res.records);
      let data = res.records.rows;
      this.productList = data;
      
      console.log(this.productList);
      this.groupByProducts();   
      
      this.spinner.hide();
    })
  }


  groupByProducts(){
    let attachment = this.productList.map((obj : any) => obj.doc);
    this.categories = _.uniq(attachment.map((obj:any)=>obj.category));
    this.ascProductList = _.orderBy(attachment, ['category'], ['asc']);
    console.log("asd", this.ascProductList);
  }


  // editProduct(list : any)
  // {
  //   localStorage.setItem("updateProduct",JSON.stringify(list));
  //   this.router.navigate(["/adminPanel/updateProduct"]);
  // }


  openDialog(index:number, product : any): void {
    console.log("Modify:", product);
    const dialogRef = this.dialog.open(UpdateProductComponent, {
      width: '70%', height: '80%', 
      data: {
        // name: this.name, animal: this.animal
        index: index,
        product : product
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' , result);   
      if(result && result.modified) {   
          console.log(this.ascProductList[result.index]);
          this.ascProductList[result.index] = result.data;
       //   this.groupByProducts();
         this.getAllProducts();
      }
    });
  }

  
}
