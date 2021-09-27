import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AdminGuard } from './admin.guard';
// import { AddProductComponent } from './add-product/add-product.component';
// import { AdminListComponent } from './admin-list/admin-list.component';
// import { AdminPanelComponent } from './admin-panel/admin-panel.component';
// import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
// import { LoginComponent } from './login/login.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { OrderNowComponent } from './order-now/order-now.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductcategoryComponent } from './productcategory/productcategory.component';
// import { PlaceOrdersComponent } from './place-orders/place-orders.component';
// import { ProductListComponent } from './product-list/product-list.component';
// import { ProductcategoryComponent } from './productcategory/productcategory.component';
// import { RegisterComponent } from './register/register.component';
// import { RemoveProductComponent } from './remove-product/remove-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
// import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  {
    path: "", redirectTo: 'home', pathMatch: 'full',
  },
  {
    path: "home", component: HomeComponent,
  },
  {
    path: "about", component: AboutComponent,
  },
 
  {
    path: "ordernow", component: OrderNowComponent,
  },
  


 
 
  {
    path:'auth',
    loadChildren: () => import('../app/auth/auth.module').then(m => m.AuthModule)
  }, 
  {
    path: "productcategory/:category", component: ProductcategoryComponent
},

  {
    path:'admin',
    loadChildren: () => import('../app/admin/admin.module').then(m => m.AdminModule)
  }, 


  {
    path: "adminPanel",  
    loadChildren: () => import('../app/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AdminGuard] 
  }, 
  {
    path: "myOrder", component: MyOrderComponent, canActivate: [AuthGuard]
  },
  {
    path: "**", component: PageNotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
