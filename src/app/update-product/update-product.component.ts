import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
// import { ToastrService } from 'ngx-toastr';
import { ProductsService } from '../products.service';

export interface DialogData {
  index: number;
  product: any;
}

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  updateProductForm: FormGroup;

  selectedProduct: any;

  getUpdateProduct: any;
  getUpdateDetails: any;

  updateId: any;
  updateRev: any;
  updateProductName: any;
  updateUnit: any;
  updateType: any;
  updateCategory: any;
  updatePrice: any;
  updateImageUrl: any;
  updateStock: any;

  files: any;


  constructor(private fb: FormBuilder, private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private productService: ProductsService,
    public dialogRef: MatDialogRef<UpdateProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    console.log("date list", this.data);
    console.log("333", this.data.product._attachments.image.data);
    this.selectedProduct = this.data["product"];

    // this.getUpdateProduct = localStorage.getItem("updateProduct");
    // this.getUpdateDetails = this.getUpdateProduct != null ? JSON.parse(this.getUpdateProduct) : [];
    // console.table("editProductDetails", this.getUpdateDetails._id);


    // this.updateId = this.getUpdateDetails._id;
    // this.updateRev = this.getUpdateDetails._rev;
    // this.updateProductName = this.getUpdateDetails.name;
    // this.updateUnit = this.getUpdateDetails.unit;
    // this.updateType = this.getUpdateDetails.type;
    // this.updateCategory = this.getUpdateDetails.category;
    // this.updatePrice = this.getUpdateDetails.price;
    // this.updateImageUrl = this.getUpdateDetails.imageUrl; 
    // this.updateStock = this.getUpdateDetails.stock;   


    this.updateId = this.data.product._id;
    this.updateRev = this.data.product._rev;
    this.updateProductName = this.data.product.name;
    this.updateUnit = this.data.product.unit;
    this.updateType = this.data.product.type;
    this.updateCategory = this.data.product.category;
    this.updatePrice = this.data.product.price;
    this.updateImageUrl = this.data.product._attachments;
    this.updateStock = this.data.product.stock;



    this.updateProductForm = this.fb.group({
      productName: new FormControl("", Validators.required),
      unit: new FormControl("", Validators.required),
      type: new FormControl("", Validators.required),
      category: new FormControl("", Validators.required),
      price: new FormControl("", Validators.required),
      stock: new FormControl("", Validators.required),
      imgUrl: new FormControl("", Validators.required)

    })
  }

  ngOnInit() {
  }


  updateProduct() {

    try {

      if (this.files == null || this.files == undefined) {

        let updateProductObj = {
          _rev: this.data.product._rev,
          name: this.updateProductForm.value.productName,
          price: this.updateProductForm.value.price,
          unit: this.updateProductForm.value.unit,
          type: this.updateProductForm.value.type,
          category: this.updateProductForm.value.category,
          _attachments: this.data.product._attachments,
          stock: this.updateProductForm.value.stock
        }
        console.log("obj", updateProductObj);

        this.productService.updateProducts(this.updateId, updateProductObj).then((res: any) => {
          this.toastr.success("Product Update Successfully");
          console.log("result", res.records.id);
          console.log("result", res.records.rev);

          this.dialogRef.close({ index: this.data.index, modified: true, data: updateProductObj });
        }, err => {
          this.toastr.error("Product Update Failure");
        })

      }
      else {

        let updateProductObj = {
          _rev: this.data.product._rev,
          name: this.updateProductForm.value.productName,
          price: this.updateProductForm.value.price,
          unit: this.updateProductForm.value.unit,
          type: this.updateProductForm.value.type,
          category: this.updateProductForm.value.category,
          _attachments: this.data.product._attachments,
          stock: this.updateProductForm.value.stock
        }
        console.log("obj", updateProductObj);

        this.productService.updateProducts(this.updateId, updateProductObj).then((res: any) => {
          this.toastr.success("Product Update Successfully");
          console.log("result", res.records.id);
          console.log("result", res.records.rev);


          let img = { _id: res.records.id, _rev: res.records.rev, image: this.files }
          this.productService.uploadImage(img).then((res: any) => {

            console.log("put img", res);

            this.dialogRef.close({ index: this.data.index, modified: true, data: updateProductObj });


          });


        }, err => {
          this.toastr.error("Product Update Failure");
        })


      }


    } catch (err) {
      console.error("error", err);
    }

  }


  onSelect(event) {
    console.log(event);
    this.files = event.target.files[0];
    console.log(this.files);
  }


}


