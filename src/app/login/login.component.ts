import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginDTO } from 'src/class-folder/login-dto';
import { User } from 'src/class-folder/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  email: any;
  password: any;
  remember: any;
  role : any;

  constructor(private fb: FormBuilder,
    private userService : UserService,
    private toastr : ToastrService) 
    { 
      this.loginForm = this.fb.group({
        email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
        password: new FormControl('', [Validators.required, Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{6,8}')]),
        role: new FormControl('', Validators.required)
      })
    }

  ngOnInit() {
    console.log("Form Value", this.loginForm.value);
  }



  login() {

    try {
      
      console.log("login res", this.loginForm.value);

    this.email = this.loginForm.value.email;
    this.password = this.loginForm.value.password;
    this.remember = this.loginForm.value.role;

    if (this.loginForm.value.email === null || this.loginForm.value.email.trim() === "") {
      alert("Email Address is Invalid");
    }
    else if (this.loginForm.value.password === null || this.loginForm.value.password.trim() === "") {
      alert("Password is Invalid");
    }
    else {
      
      if (this.loginForm.value.email === null || this.loginForm.value.email.trim() == "") {
        alert("Email is mandatory");
      }
      else if (this.loginForm.value.password === null || this.loginForm.value.password.trim() === "") {
        alert("Password is mandatory");
      }
      else if (this.loginForm.value.password >= 6 || this.loginForm.value.password <= 8) {
        alert("Password minimum 6 to 8 characters");
      }
      else {

        
        const loginDTO = new LoginDTO(this.loginForm.value.email, this.loginForm.value.password, this.loginForm.value.role);
  
        this.userService.userLogin(loginDTO).then((res : any) => {
          
          console.log(res);
          if (res.status === "failed" && res.records.length === 0)
          {
            this.toastr.error(res.message);
            return;            
          }
          else
          {
            let userData = res.records.docs;
            console.log("rrr", res);
            console.log("userData", userData);
            if(userData.length === 0)
            {
              this.toastr.error("Invalid Email or Password");
            }
            else if(userData[0].account === 'Deactive')
            {
              this.toastr.warning("Your Account was blocked");
            }
            else
            {
              let user:User = userData[0];                                   
              localStorage.setItem("LOGGED_IN_USER", JSON.stringify(user));
              this.userService.loginSubject.next(user);
              
              this.toastr.success("Login Successfully");
              window.location.href = "/home";
            }
          }
        }, () => {
          this.toastr.error("Invalid Email or Password");
        })
      }
    }

    } catch (err) {
      
      console.error("error", err);
    }
  }


  
}
