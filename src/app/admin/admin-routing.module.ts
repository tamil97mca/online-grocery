import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminListComponent } from '../admin-list/admin-list.component';
import { AdminPanelComponent } from '../admin-panel/admin-panel.component';
import { ChartComponent } from '../chart/chart.component';
import { PlaceOrdersComponent } from '../place-orders/place-orders.component';
import { SalesChartComponent } from '../sales-chart/sales-chart.component';
import { UpdateProductComponent } from '../update-product/update-product.component';

const routes: Routes = [
  {
    path: '', component: AdminPanelComponent,
    children: [

        {
            path: 'product',
            loadChildren: () => import('../product/product.module').then(m => m.ProductModule)
        },
        {
            path: 'user',
            loadChildren: () => import('../user/user.module').then(m => m.UserModule)
        },
        {
            path: "", redirectTo: "adminList", pathMatch: "full"
        },
        {
            path: "adminList", component: AdminListComponent,
        },

        {
            path: "placeOrders", component: PlaceOrdersComponent
        },
        {
            path: "updateProduct", component: UpdateProductComponent,
        },
        {
            path: "flowChart", component: ChartComponent,
        },
        {
            path: "salesChart", component: SalesChartComponent,
        }
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
