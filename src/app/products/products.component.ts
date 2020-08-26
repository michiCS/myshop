import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Product } from '../models/Product';
import { isString } from 'util';
import { ProductData } from '../models/ProductData';
import { ProductUpdateData } from '../models/ProductUpdateData';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  shownProducts: Product[] = [];
  loaded: boolean = false;
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.apiService.getProductsForUser().subscribe(x => {
      console.log(x);
      this.products = x;
      this.shownProducts = this.products;
      this.loaded = true;
    })
  }

  delete(productId) {
    this.apiService.deleteProduct(productId).subscribe(x => {
      console.log(x);
      if(x["deleted"] === true) {
        this.loadProducts();
      }
    });
  }

  updateProduct(data: ProductUpdateData) {
    console.log(data);
    this.apiService.updateProduct(data.id, data.name, data.price).subscribe(x => {
      console.log(x);
      if(x["id"]) {
        this.loadProducts();
      }
    });
  }

  onFilterChanged(sort) {
    let key = sort.split(";")[0];
    this.shownProducts.sort((a, b) => {
      let valA = a[key];
      let valB = b[key];
      if (isString(valA)) {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      }
      if (valA > valB) {
        return 1;
      }
      if (valA < valB) {
        return -1;
      }
      return 0;
    });
    if (sort.split(";")[1]) {
      this.shownProducts.reverse();
    }
  }

}
