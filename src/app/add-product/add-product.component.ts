import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  addProductForm: FormGroup;
  productName : any;

  files : any;


  constructor(private http: HttpClient, private fb: FormBuilder,
    private productService: ProductsService,
    private toastr : ToastrService,
    private spinner: NgxSpinnerService) 
    { 
      this.addProductForm = this.fb.group({
        productName: new FormControl("", Validators.required),
        unit: new FormControl("", Validators.required),
        type: new FormControl("", Validators.required),
        category: new FormControl("", Validators.required),
        price: new FormControl("", Validators.required),
        stock : new FormControl("", Validators.required),
        imgUrl: new FormControl("", Validators.required)
  
      })
    }

  ngOnInit() {
    console.log("Form Value", this.addProductForm.value);
  }

  async addProduct() {
   
    this.spinner.show();

    try {
      
      console.log("addProduct", this.addProductForm.value);

      // cloudinary images code start

  //   const file_data = this.files;
  //   console.log(file_data)
  //   const formdata = new FormData();
  //   console.log(file_data)
  //   formdata.append("file", file_data);
  //   formdata.append("cloud_name", "grocery-ninja");
  //   formdata.append("upload_preset", "ninjacart");

  //   const url = 'https://api.cloudinary.com/v1_1/grocery-ninja/image/upload'
  //   await this.http.post(url, formdata).then((res: any) => {
  //     console.log("Images Set", res);
  //     let addProductObj = {
  //       "name": this.addProductForm.value.productName,
  //       "price": this.addProductForm.value.price,
  //       "stock": this.addProductForm.value.stock,
  //       "unit": this.addProductForm.value.unit,
  //       "type": this.addProductForm.value.type,
  //       "category": this.addProductForm.value.category,
  //       "imageUrl": res.secure_url
  //     }
  //     console.log("addProductObj", addProductObj);
  
  //     this.productService.addNewProducts(addProductObj).then((res: any) => {
  //       this.toastr.success("Product added successfully");
  //       // alert("Product added successfully");
  //       console.log("addNewProducts Result", res);        
  //       this.addProductForm.reset();        // form reset class method

  //         this.spinner.hide();
      
  //     }, err => {
  //       console.log("err Message", err);
  //     })

  // });

  // cloudinary images code end


      console.log("data-files", this.files);

      let addProductObj = {
        "name": this.addProductForm.value.productName,
        "price": this.addProductForm.value.price,
        "stock": this.addProductForm.value.stock,
        "unit": this.addProductForm.value.unit,
        "type": this.addProductForm.value.type,
        "category": this.addProductForm.value.category,
        // "imageUrl": this.addProductForm.value.imgUrl
      }
      console.log("addProductObj", addProductObj);
  
      this.productService.addNewProducts(addProductObj).then((res: any) => {

        console.log("addNewProducts Result", res.records);  
        console.log("id", res.records.id);
        console.log("rev", res.records.rev);

             // ibm cloudant images attachments code start here
        
             let img = {_id: res.records.id, _rev: res.records.rev, image: this.files}
        this.productService.uploadImage(img).then((res: any) => {

          console.log("put img", res);

          this.addProductForm.reset();        // form reset class method


        });



        //  ibm cloudant images attachments code end here


          this.spinner.hide();

          this.toastr.success("Product added successfully");      

      
      }, err => {
        console.log("err Message", err);
      })

    } catch (err) 
    {
      console.error("error", err);  
    }
  }


  onSelect(event) {
    console.log(event);
    this.files = event.target.files[0];
    console.log(this.files)
  }
  
}
