import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProductComponent } from '../add-product/add-product.component';
import { ProductListComponent } from '../product-list/product-list.component';
import { RemoveProductComponent } from '../remove-product/remove-product.component';

const routes: Routes = [
  {
    path: "productList", component: ProductListComponent
},

{
    path: "addProduct", component: AddProductComponent
},
{
    path: "removeProduct", component: RemoveProductComponent
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
