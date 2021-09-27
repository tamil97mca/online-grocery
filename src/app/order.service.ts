import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  collectionName = "grocerystoreapp_order"
  // basicAuth = "Basic " + btoa(environment.dbUsername + ":" + environment.dbPassword);


  constructor(private http: HttpClient,
    private restService : RestService) { }


  placeOrder(orderData: any) {
    // return this.http.post(environment.url + this.collectionName, orderData)
      return this.restService.save(this.collectionName, orderData);
  }

  OrderList() {

    let query = {
      selector: {
       totalBillAmount : {
        "$gt": 0
       }
      },
    };

    // return this.http.get(environment.url + this.collectionName + "/_all_docs?include_docs=true");
      // return this.restService.findAll(this.collectionName);
            return this.restService.findByCriteria(this.collectionName, query);
  }

  getMyOrders(email: string) {

    let query = {
      selector: {
        createdBy: email,
      },
    };

    // return this.http.post(environment.url + this.collectionName + "/_find", query);
      return this.restService.findByCriteria(this.collectionName, query);
  }

  updateStatus(order: any) {
    // return this.http.put(environment.url + this.collectionName + "/" + order._id + "?rev=" + order._rev, order);
      return this.restService.updateOne(this.collectionName, order._id, order);
  }

  deliveredList()
  {

    let deliveredObj = {

        selector:{
            "status":"DELIVERED"
        },
        sort: [{ deliveredDate: 'desc' }],
    
    }
    // return this.http.post(environment.url + this.collectionName + "/_find", deliveredObj);
    return this.restService.findByCriteria(this.collectionName, deliveredObj);
  }
}
