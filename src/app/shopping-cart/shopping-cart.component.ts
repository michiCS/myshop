import { Component, OnInit } from '@angular/core';
import { Product } from '../models/Product';
import { ApiService } from '../api.service';
import { isNumber } from 'util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  products: any[] = [];
  sum: number = 0.0;
  numProducts: number = 0;

  showInput: boolean;

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    let email = "wagner.99@gmx.at";

    this.apiService.getShoppingCart().subscribe(x => {
      console.log(x);
      this.products = x;
      this.calc();
    });
  }

  deleteFromShoppingCart(product) {
    this.apiService.deleteFromCart(product.id).subscribe(x => {
      this.products.splice(this.products.indexOf(product), 1);
      this.calc();

    })
  }

  updateQuantity(product, quantity) {
    if (!isNaN(quantity)) {
      console.log("chanadf")
      this.apiService.updateQuantityInCart(product.id, quantity).subscribe(x => {
        product.quantity = +quantity;
        this.calc();
      })
    } else {
      product.quantity = 10;
    }

  }

  checkout() {
    console.log("checkout");
    this.apiService.placeOrder().subscribe(x => {
      console.log(x);
      if (x) {
        alert("Order placed");
        this.router.navigate(["home"]);
      }
    })
  }

  calc() {
    this.sum = this.products.reduce((a, b) => a + b.price * b.quantity, 0)
    console.log(this.products);
    this.numProducts = this.products.reduce((a, b) => a + b.quantity, 0);
  }

}
