import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminListComponent } from '../admin-list/admin-list.component';
import { AdminPanelComponent } from '../admin-panel/admin-panel.component';
import { SideNavBarComponent } from '../side-nav-bar/side-nav-bar.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PlaceOrdersComponent } from '../place-orders/place-orders.component';
import { ChartComponent } from '../chart/chart.component';
import { ChartsModule } from 'ng2-charts';
import { UpdateProductComponent } from '../update-product/update-product.component';
import { MatDialogModule } from '@angular/material';
import { SalesChartComponent } from '../sales-chart/sales-chart.component';

@NgModule({
  declarations: [
    AdminPanelComponent,
    AdminListComponent,
    SideNavBarComponent,
    PlaceOrdersComponent,
    ChartComponent,
    UpdateProductComponent,
    SalesChartComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,   
    ChartsModule,
    MatDialogModule
 
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [UpdateProductComponent],


})
export class AdminModule { }
