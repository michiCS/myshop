import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../models/Product';
import { ProductUpdateData } from '../models/ProductUpdateData';

@Component({
  selector: 'app-product-sub',
  templateUrl: './product-sub.component.html',
  styleUrls: ['./product-sub.component.scss']
})
export class ProductSubComponent implements OnInit {
  @Input() product: Product;
  @Output() updateProduct: EventEmitter<ProductUpdateData> = new EventEmitter<ProductUpdateData>();
  @Output() deleteProduct: EventEmitter<number> = new EventEmitter<number>();

  isInEditMode: boolean = false;
  edited: boolean = false;

  constructor() { }

  ngOnInit(): void {

  }

  switchMode() {
    this.isInEditMode = !this.isInEditMode;
  }

  update() {
    console.log(this.product.name);
    console.log(this.product.price);
    if(this.edited) {
      let data = {
        id: this.product.id,
        name: this.product.name,
        price: this.product.price
      }
      this.updateProduct.emit(data);
    }
    this.switchMode();
    this.edited = false;
  }

  delete(productId: number) {
    this.deleteProduct.emit(productId);
  }

}
