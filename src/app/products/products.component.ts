import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Productdto } from 'src/class-folder/productdto';
import * as _ from 'lodash';
import { CartService } from '../cart.service';
import { ProductsService } from '../products.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  product: any;
  unit: any;
  price: any;

  @Input()
  noOfProducts: number = 0;

  products: any;
  categories!: any;

  itemslist: any;

  totalPrice: any;
  
  constructor(private router: Router,
    private cartService: CartService,
    private http: HttpClient,
    private toastr: ToastrService,
    private productService: ProductsService,
    private spinner : NgxSpinnerService) 
    {
      this.getProduct();
    }

  ngOnInit() 
  {
    this.itemslist = this.cartService.getCartItems();
  }

  getProduct() {

    // stock quantity greater than 0 method pending 

    try {

      this.spinner.show();
      // this.productService.getAvailableProducts().subscribe((res: any) => { 
        this.productService.getAttachmentProducts().then((res: any) => {      
     
        let data: Productdto[] = res.records.rows;
        console.log("check1", data);     
          
        let docs = data.map((obj : any) => obj.doc);
        this.categories = _.groupBy(docs, 'category');
        console.log("check2", this.categories);
  
          this.spinner.hide();
  
      })

    }
    catch (err) {
      console.log("error", err);
    }
  }

  getProductItems(category: any) {
    let categoryItems = this.categories[category];
    if (this.noOfProducts == 0) {
      return categoryItems;
    }
    else {
      return this.categories[category].filter( (obj:any) => obj.stock != 0).slice(0, this.noOfProducts);
    }
  }

  addCart(id: string, rev: string, productName: string, qty: number, type: string, price: number, stock : number, category : string, imgUrl : string, stocktype : string) {

    this.toastr.success("Product Added");
    this.totalPrice = qty * price;
    var itemObj = { "id": id, "rev": rev, "productName": productName, "unit": qty, "price": price, "totalPrice": this.totalPrice, "stock": stock, "category": category, "imgUrl": imgUrl, "type": stocktype };
    console.log(itemObj);

    this.cartService.addItemToCart(itemObj);

    this.itemslist = this.cartService.getCartItems();

  }

  view(viewCategory: any) {
    this.router.navigateByUrl("productcategory/" + viewCategory);
  }

  isItemAdded(productName: string) {

    return this.itemslist.find((obj: any) => obj.productName == productName) != null;
  }

}
