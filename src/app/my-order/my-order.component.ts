import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { ProductsService } from '../products.service';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {

  email: any;
  userEmail: any;

  placeOrderList: any;
  descPlaceOrderList: any;

  constructor(private orderService: OrderService,
    private productService : ProductsService,
    private toastr : ToastrService) 
    { 
      this.email = localStorage.getItem('LOGGED_IN_USER');
      this.userEmail = this.email != null ? JSON.parse(this.email) : [];
      console.log('email', this.userEmail.email);
    }

  ngOnInit() {
    this.getAllProduct();
  }



  getAllProduct() {
    
    try {

      this.orderService.getMyOrders(this.userEmail.email).then(
        (res: any) => {

          if (res.status === "failed" && res.records.length === 0)
          {
            this.toastr.error(res.message);
            return;
          }
          else
          {
            
            console.log('res', res.docs);
            this.placeOrderList = res.records.docs;
            console.log('data', this.placeOrderList);
            this.descPlaceOrderList = _.orderBy(
              this.placeOrderList,
              ['date'],
              ['desc']
            );
            console.log('desc', this.descPlaceOrderList);

          }
        },
        (err) => {
          console.log('err', err);
        }
      );

    }
    catch (err)
    {
      console.error('err', err);
    }
  }

  changeCancelled(order: any) {    

   try
   {

    let userOrderCancelled = prompt('Enter Reason');    
    if (
      userOrderCancelled != null &&
      userOrderCancelled != '' &&
      userOrderCancelled.trim() != '' &&
      userOrderCancelled.length > 3
    ) {
      order.status = 'CANCELLED';
      order.comments = userOrderCancelled;
      order.cancelledDate = new Date().toJSON();

      // console.log("##%$#%#@", order.items);
      // const myorderDto = new MyorderDto(order);
      // const item = new Items(order.items);
      // console.log(myorderDto, item);


      this.orderService.updateStatus(order).then((res) => {
        this.increaseStock(order);
        console.log('Cancelled Status Changed Successfully', res);
        this.toastr.success("Order Cancelled successfully");
        // alert("Order Cancelled successfully");
        // document.location.reload();
        this.getAllProduct();
      });
    }

   }
   catch (err)
   {
     console.error("error", err);
   }
  }

  increaseStock(order : any)
  {

   try {
     
    console.log("order###", order.items);

    for(let item of order.items)
    {
      console.log(item);

      this.productService.getProduct(item.id).then((res: any)=>{

        let product:any = res.records;
        product.stock += item.unit ;
        this.productService.updateProuductsStock(product).then(res=>{
          console.log(item +" stock updated");
        })

      })

    }

   } catch (err) {
     console.error("error", err);
     
   }
    
  }

  getStyle(status: any) {
    let badge;
    console.log('status', status);
    if (status == 'CANCELLED') {
      badge = '#d9534f';
    } else if (status == 'DELIVERED') {
      badge = 'mediumseagreen';
    } else if (status == 'ORDERED') {
      badge = '#f0ad4e';
    }
    else if (status == 'SHIPPED') {
      badge = 'gray';
    }
    return badge;
  }



}
