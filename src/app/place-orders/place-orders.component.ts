import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { OrderService } from '../order.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-place-orders',
  templateUrl: './place-orders.component.html',
  styleUrls: ['./place-orders.component.css']
})
export class PlaceOrdersComponent implements OnInit {

  placeOrderList: any;
  recentOrderList: any;

  statusFilterForm: any;
  filter: any;


  constructor(private orderService: OrderService, private fb: FormBuilder) 
  { 
    this.statusFilterForm = this.fb.group({
      status: new FormControl('ALL', Validators.required),
    });
  }

  ngOnInit() {
    this.getOrderList();
  }


  searchOrderResults: any;

  getOrderList() {
    this.orderService.OrderList().then((res: any) => {
      let row = res.records.docs;
      console.log("1111",row);
      // let docs = row.map((obj: any) => obj.doc);
      this.placeOrderList = row;
      console.log('placeOrderList', this.placeOrderList);
      this.recentOrderList = _.orderBy(this.placeOrderList, ['date'], ['desc']);
      console.log('descending List :', this.recentOrderList);

      this.searchOrderResults = this.recentOrderList
      console.log('searchOrderList', this.searchOrderResults);
    });
  }

  changeDelivered(order: any) {
    console.log('order :', order);
    order.status = 'DELIVERED';
    order.comments = 'Thank you for shopping...';
    order.deliveredDate = new Date().toJSON();

    this.orderService.updateStatus(order).then((res) => {
      console.log('Delivered Status Changed Successfully', res);
      this.getOrderList();
    });
  }

  changeShipped(place)
  {
    console.log('Change Shipped', place.status);

    place.status = 'SHIPPED';
    place.comments = 'Shipped...';
    place.deliveredDate = new Date().toJSON();

    this.orderService.updateStatus(place).then((res) => {
      console.log('Delivered Status Changed Successfully', res);
      this.getOrderList();
    });
  }

  getStyle(status: string) {
    let clazz = '';
    if (status == 'DELIVERED') {
      clazz = 'mediumseagreen';
    } else if (status == 'CANCELLED') {
      clazz = '#d9534f';
    } else if (status == 'ORDERED') {
      clazz = '#f0ad4e';
    }
    else if (status == 'SHIPPED') {
      clazz = 'gray';
    }
    // console.log(status +"-" + clazz);
    return clazz;
  }

  changeCancelled(order: any) {
    let cancellationReason = prompt('Enter reason');
    console.log('cancel Reason', cancellationReason);
    if (
      cancellationReason != null &&
      cancellationReason != '' &&
      cancellationReason.trim() != '' &&
      cancellationReason.length > 3
    ) {
      order.status = 'CANCELLED';
      order.comments = cancellationReason;
      order.cancelledDate = new Date().toJSON();

      this.orderService.updateStatus(order).then((res) => {
        console.log('Cancelled Status Changed Successfully', res);
        this.getOrderList();
      });
    }
  }

  statusFilter() {
    this.filter = this.statusFilterForm.value.status;

    this.searchOrderResults =
      this.filter == 'ALL'
        ? this.recentOrderList
        : this.recentOrderList.filter((obj: any) => obj.status == this.filter);

    console.log('status Filter :', this.filter);
  }


}
