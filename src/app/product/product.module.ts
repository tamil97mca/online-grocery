import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';
import { AddProductComponent } from '../add-product/add-product.component';
import { ProductListComponent } from '../product-list/product-list.component';
import { ProductsComponent } from '../products/products.component';
import { RemoveProductComponent } from '../remove-product/remove-product.component';
import { ProductcategoryComponent } from '../productcategory/productcategory.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchPipe } from '../search.pipe';
import { UpdateProductComponent } from '../update-product/update-product.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductsComponent,
    ProductcategoryComponent,  
    SearchPipe,      
    AddProductComponent,
    RemoveProductComponent,
    
    // ItemAddedToCartDirective
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,    
    NgxSpinnerModule,
    MatDialogModule,
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  exports:[
    ProductsComponent,
    ProductcategoryComponent
  ]
})
export class ProductModule { }
