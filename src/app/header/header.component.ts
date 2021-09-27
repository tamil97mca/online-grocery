import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/class-folder/user';
import { CartService } from '../cart.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user!:Observable<User>;

  cartObj : Observable<any>;

  userEmail : any;
  
  constructor(private router : Router,
    private userService : UserService,
    private cartService : CartService) 
    { 
      this.user = userService.loginSubject;
      this.cartObj = cartService.cartCount;
    }

  ngOnInit() {
    console.log("active route", this.router.url);
    console.log("location", window.location.pathname.substr(1));
  }

  logOut()
  {
    this.userService.loginSubject.next(null);
    localStorage.removeItem("LOGGED_IN_USER");
    // window.location.href = "/auth/login";
    window.location.href = "/home";
  }

  adminLogOut()
  {
    localStorage.removeItem("LOGGED_IN_ADMIN");
    // window.location.href = "/auth/admin";
    window.location.href = "/home";    
  }
  
}
