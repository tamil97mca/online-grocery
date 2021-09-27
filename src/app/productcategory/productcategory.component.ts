import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Productdto } from 'src/class-folder/productdto';
import { CartService } from '../cart.service';
import { ProductsService } from '../products.service';
import * as _ from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-productcategory',
  templateUrl: './productcategory.component.html',
  styleUrls: ['./productcategory.component.css']
})
export class ProductcategoryComponent implements OnInit {

  products: any;
  categories: any;

  view: any;
  viewCategory: any;
  items: any;

  selectedCategory: any;

  totalPrice: any;
  itemslist: any = [];
  
  constructor(private route: ActivatedRoute,
    private productService: ProductsService,
    private cartService: CartService,
    private toastr : ToastrService,
    private spinner : NgxSpinnerService) 
    { 
      this.viewCategory = this.route.snapshot.params["category"];
      console.log("view", this.viewCategory);
      this.getProduct();
    }

  ngOnInit() {
    this.itemslist = this.cartService.getCartItems();
  }



  getProduct() {

    this.spinner.show();

    try {
      
      // this.productService.getAvailableProducts().then((res: any) => {
        this.productService.getAttachmentProducts().then((res: any) => {      
          console.log(res);
       if(res.status === "failed" && res.records.length === 0)
       {
         this.toastr.error(res.message);
         return;
       }
       else
       {
        let data: Productdto[] = res.records.rows;
  
        // this.products = data.map((obj: any) => obj.doc);
        // console.log("pro", this.products);
        let docs = data.map((obj : any) => obj.doc);

        this.categories = _.groupBy(docs, 'category');
        console.log("categories", this.categories[this.viewCategory]);
        this.items = this.categories[this.viewCategory];
        console.log("items", this.items);
  
        this.spinner.hide();
       }

      })

    } catch (err) {
      
      console.error("error", err);
    }
  }

  addCart(id: string, rev: string, productName: string, qty: number, type: string, price: number, stock : number, category : string, imgUrl : string, stocktype : string) {
    console.log("id", id);
    console.log("product :", productName);
    console.log("unit :", qty);
    console.log("type :", type)
    console.log("price :", price);


    this.toastr.success("Product Added");
    // alert("Product Added");
    this.totalPrice = qty * price;
    var itemObj = { "id": id, "rev": rev, "productName": productName, "unit": qty, "price": price, "totalPrice": this.totalPrice, "stock": stock, "category": category, "imgUrl": imgUrl, "type": stocktype };
    console.log(itemObj);


    this.cartService.addItemToCart(itemObj);
    this.itemslist = this.cartService.getCartItems();
  }

  isItemAdded(productName: string) {

    return this.itemslist.find((obj: any) => obj.productName == productName) != null;
  }

  
}
