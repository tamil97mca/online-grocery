import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  userDataList!: any[];

  existEmail: any;
  existPhoneno: any;
  
  constructor(private fb: FormBuilder,
    private userService: UserService,
    private toastr : ToastrService) 
    { 
      this.registerForm = this.fb.group({
        username: new FormControl('', [Validators.required, Validators.minLength(3)]),
        phoneno: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
        email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
        password: new FormControl('', [Validators.required, Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{6,8}')]),
        remember: new FormControl(false, Validators.required)
      })
    }

  ngOnInit() {
  }


  register() {

    try {
      
      console.log("username", this.registerForm.value.username);
      console.log("phoneno", this.registerForm.value.phoneno)
      console.log("email", this.registerForm.value.email);
      console.log("password", this.registerForm.value.password);
  
  
      let userList = {
        "selector": {
          "email": this.registerForm.value.email,
          "role": "user"
        },
        "fields": ["_id", "_rev", "name", "mobileNo", "email", "password"]
      }
      this.userService.userList(userList).then((res: any) => {
        
        if (res.status === "failed" && res.records.length === 0)
        {
          this.toastr.error(res.message);
          return;
        }
        else
        {
          this.userDataList = res.records.docs;
        console.log("listofUsers", this.userDataList);
        console.log("listofUsers Length", this.userDataList.length);
  
        if (this.userDataList.length === 0) {
  
          var registerObj = {
            name: this.registerForm.value.username,
            mobileNo: this.registerForm.value.phoneno,
            email: this.registerForm.value.email,
            password: this.registerForm.value.password,
            role: "user",
            registerDate: new Date(),
            account: "Active"
  
          }
          console.log("registerObj", registerObj);
  
          // const registerDto = new RegisterDto(registerObj);
  
          this.userService.userRegister(registerObj).then((result: any) => {
           
            if(result.status == "failed" && result.records.length === 0) 
            {
              this.toastr.error(result.message);
              return;
            }
            else 
            {
              console.log("result", result);
              window.location.href = "/auth/login";            
              this.toastr.success("Registration Successfully");
            }
          }, () => {            
            this.toastr.error("Registration Error");
          })
  
        }
        else {          
          this.toastr.error("Email Id Already Exists");
        }
        }
  
      }, err => {
        console.log("Error", err);
      })
      
    } catch (err) {
      console.error("error",err)
    }

  }

}
