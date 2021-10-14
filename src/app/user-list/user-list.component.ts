import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  userDataList: any;

  constructor(private userService: UserService) 
  { 
    this.userList();
  }

  ngOnInit() {
  }


  userList() {

    try {

      let userList = {
        "selector": {
          "role": "user"
        },
        "fields": ["_id", "_rev", "name", "mobileNo", "email", "password", "registerDate", "account"]
      }
  
  
      this.userService.userList(userList).then((res: any) => {
        this.userDataList = _.orderBy(res.records.docs, ['registerDate'], ['desc']);
        console.log("datalist", this.userDataList);

      }, err => {
        alert("Something went wrong");
      })

    }
    catch (err) {
      console.error("error", err);
    }
  }


  changeUserStatusDeactive(users : any)
  {

    try {

      console.table(users.account);    
      users.account = "Deactive";
      users.role = "user";
  
      this.userService.userAccountStatus(users).then((result : any) => {
        console.log("status change result", result);    
        this.userList();  
      }, err => {
        alert("Account Status Change Error")
      })
  
    }
    catch(err) {
      console.error("error", err);
    }
    }

    

    changeUserStatusActive(users : any)
  {

    try {

      console.table(users.account);    
      users.account = "active";
      users.role = "user";
  
      this.userService.userAccountStatus(users).then((result : any) => {
        console.log("status change result", result);    
        this.userList();  
      }, err => {
        alert("Account Status Change Error")
      })
  
    }
    catch(err) {
      console.error("error", err);
    }
    }

}
