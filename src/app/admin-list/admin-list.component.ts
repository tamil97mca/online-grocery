import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {

  adminDataList: any;

  constructor(private adminService: AdminService,
    private userService: UserService) 
  { 
    this.adminList();
  }

  ngOnInit() {
  }

  adminList() {


    try {

      let userList = {
        "selector": {
          "role": "admin"
        },
        "fields": ["_id", "_rev", "name", "mobileNo", "email", "password", "registerDate", "account"]
      }
  
  
      this.userService.userList(userList).then((res: any) => {
        this.adminDataList = res.records.docs;
        console.log("datalist", this.adminDataList);
      }, err => {
        alert("Something went wrong");
      })

    }
    catch (err) {
      console.error("error", err);
    }


    // try {

    //   let adminList = {
    //     "selector": {
    //       "role": "admin"
    //     },
    //     "fields": ["_id", "_rev", "name", "mobileNo", "email", "password"]
    //   }
  
  
    //   this.adminService.listOfAdmin(adminList).then((res: any) => {
    //     this.adminDataList = res.docs;
    //     console.log("Admindatalist", this.adminDataList);
    //   }, err => {
    //     alert("Something went wrong");
    //   })

    // }
    // catch (err) {
    //   console.error("error", err);
    // }
  }

  

}
