import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartCount = new BehaviorSubject<any>(this.getCartItems());


  constructor() { }

  getCartItems() {

    let cartItemsStr = localStorage.getItem("CART_ITEMS");
    return cartItemsStr != null ? JSON.parse(cartItemsStr) : [];
  }

  addItemToCart(itemObj: any) {    
    let cartItems:any = this.getCartItems();
    let index = cartItems.findIndex((obj:any)=>obj.id == itemObj.id);
    if(index == -1){
    cartItems.push(itemObj);
    }
    else {
      cartItems[index].unit +=1;
      cartItems[index].totalPrice = cartItems[index].unit * cartItems[index].price;  
    }
    localStorage.setItem("CART_ITEMS", JSON.stringify(cartItems));
    
    this.cartCount.next(this.getCartItems());


  }



  emptyCart() {
    localStorage.removeItem("CART_ITEMS");
    this.cartCount.next(this.getCartItems());
  }

  removeItem(index : any)
  {
    let cartItems = this.getCartItems();
    
      cartItems.splice(index, 1);
    
    localStorage.setItem("CART_ITEMS", JSON.stringify(cartItems));

    this.cartCount.next(this.getCartItems());
  }

  
}
