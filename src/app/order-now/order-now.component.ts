import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../cart.service';
import { OrderService } from '../order.service';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-order-now',
  templateUrl: './order-now.component.html',
  styleUrls: ['./order-now.component.css']
})
export class OrderNowComponent implements OnInit {

  cartItems: any;

  user: any;

  constructor(private route: ActivatedRoute,
    private service: CartService,
    private orderService: OrderService,
    private router: Router,
    private productService : ProductsService,
    private toastr : ToastrService) 
    { 
    this.cartItems = this.service.getCartItems();
    console.log('cart', this.cartItems);
    let userEmail = localStorage.getItem('LOGGED_IN_USER');
    this.user = userEmail != null ? JSON.parse(userEmail) : [];
    console.log('user.email', this.user.email);

    this.calculateTotalAmount();
    }

  ngOnInit() {
  }

  calculateTotalAmount() {
    this.totalBillAmount = 0;
    for (let item of this.cartItems) {
      this.totalBillAmount += item.unit * item.price;
    }
  }

  products: any = [];

  totalBillAmount = 0;

  updatePrice(index: number, stock: number) {
    
    
    console.log('change ', index);
    let cartItem = this.cartItems[index];
    if(cartItem.unit > stock){      
      this.toastr.error("Insufficient stocks");
      // alert("Insufficient stocks");
      this.calculateTotalAmount(); 
    }
    else{
      cartItem.totalPrice = cartItem.unit * cartItem.price;
      this.cartItems[index] = cartItem;
      this.calculateTotalAmount();
    }
  }


  confirmOrder() {
   
    try
    {

      if (this.user.email == null || this.user.email == '' || this.user.email == undefined){      
        this.toastr.error('Please Login or Register');
        // alert("Please Login or Register")
        this.router.navigate(['/auth/login']);
      
    }
    else{

        
        let orderData = {
          items: this.cartItems,
          createdBy: this.user.email,
          status: 'ORDERED',
          date: new Date().toJSON(),
          totalBillAmount: this.totalBillAmount,
        };
        console.log('e', orderData);
  
        this.orderService.placeOrder(orderData).then((res) => {
          this.toastr.success('Order Added Successfully');
          // alert("order Added Successfully");
          this.service.emptyCart();
          this.decreaseStock(this.cartItems);
          this.router.navigate(['/myOrder']);
        }, err => {
          alert("Order Place Error came");
        });
    }

    }
    catch (err) {
      console.error("error", err);
    }
  }

  decreaseStock(cartItems:any){

    try{

      for(let item of cartItems){
      
        this.productService.getProduct(item.id).then((res : any)=>{
          console.log(res.records);
          let product:any = res.records;
          product.stock -= item.unit ;
          this.productService.updateProuductsStock(product).then(res=>{
            console.log(res);
          })
  
        })
        
      }
    }
    catch (error)
    {
      console.error("error", error);
    }
    
  }

  emptyCart() {
    localStorage.removeItem('CART_ITEMS');
    this.cartItems = [];
    this.service.cartCount.next(this.service.getCartItems());
    this.calculateTotalAmount();
  }

  removeItem(index: any) {
    this.service.removeItem(index);
    this.cartItems = this.service.getCartItems();
    this.service.cartCount.next(this.service.getCartItems());
  }

  orderMore() {
    this.router.navigate(['/home']);
  }
}
