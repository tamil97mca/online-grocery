import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  adminloginForm: FormGroup;
  role: any;
  email: any;
  
  constructor( private fb: FormBuilder,
    private adminservice: AdminService,
    private router: Router,
    private toastr : ToastrService) 
    { 
      this.adminloginForm = this.fb.group({
        email: new FormControl('', [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{6,8}'),
        ]),
        remember: new FormControl(false, Validators.required),
      });
    }

  ngOnInit() {
    console.log('Form Value', this.adminloginForm.value);
  }

  login() {
    try {
      console.log('AdminRegisterForm :', this.adminloginForm.value);

      let adminLoginObj = {
        selector: {
          email: this.adminloginForm.value.email,
          password: this.adminloginForm.value.password,
          role: 'admin',
        },
        fields: ['_id', '_rev', 'name', 'email', 'password', 'role'],
      };
      this.adminservice.listOfAdmin(adminLoginObj).then((res: any) => {
        console.log('res', res.records.docs);
        let data = res.docs;
        if (data.length === 0) {
          this.toastr.error('Invalid Email or Password');
          // alert("Invalid Email or Password");
        } else {
          let adminObj = data[0];
          localStorage.setItem('LOGGED_IN_USER', JSON.stringify(adminObj));
          window.location.href = '/adminPanel';
          this.toastr.success('Login Successfully');
          // alert("Login Successfully");
        }
      });
    } catch (err) {
      console.error('error', err);
    }
  }

  navigate(url: string) {
    this.router.navigateByUrl(url);
  }

}
