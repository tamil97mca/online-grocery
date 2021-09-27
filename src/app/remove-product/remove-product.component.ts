import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import * as _ from 'lodash';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-remove-product',
  templateUrl: './remove-product.component.html',
  styleUrls: ['./remove-product.component.css']
})
export class RemoveProductComponent implements OnInit {

  productList: any;
  ascProductList: any;
  selectedCategory: any;

  constructor(private productService: ProductsService) 
  { 
    this.getAllProducts();
  }

  ngOnInit() {
  }


  getAllProducts() {

    try {
      
      this.productService.getAttachmentProducts().then((res: any) => {
        let data = res.records.rows;
        console.log(res.rows);
        this.productList = data.map((obj: any) => obj.doc);
        console.log('productList', data);
        this.ascProductList = _.orderBy(this.productList, ['category'], ['asc']);
        console.log('Ascending Product List :', this.ascProductList);
      });

    } catch (err) {
      console.error("error", err);
    }
  }

  removeProduct(id: any, rev: any) {
    
    try {
      
      console.log('id', id);
    console.log('rev', rev);

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.value) {
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');

        this.productService.removeProducts(id, rev).then(
          (res) => {
            
            console.log('remove products result', res);
            // document.location.reload();
            this.getAllProducts();
          },
          (err) => {
            console.log('err Message', err);
          }
        );
      }
    });
    
    } catch (err) {
      console.error("error", err);
    }
  }

  
}
