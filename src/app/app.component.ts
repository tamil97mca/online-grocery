import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'GroceryStore';


  ngOnInit(): void {

    if(navigator.onLine == false)
    {
      alert("Please turn on network connection");    
    }


  }
}
