import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Order } from '../models/Order';
import { Router } from '@angular/router';
import { debounceTime, delay } from 'rxjs/operators';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {

  orders: any;
  loaded: boolean = false;

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.apiService.getOrders().subscribe(x => {
      this.loaded = true;
      console.log(x);
      this.orders = x;
      console.log(this.orders);
    })
  }

  buyAgain(orderItemId) {
    this.apiService.addToCart(orderItemId, 1).subscribe(x => {
      this.router.navigate(["shoppingcart"]);
    })
  }

  getTotal(order) {
    let total = order.items.reduce((a, b ) => a + b.price * b.quantity, 0);
    console.log(total);
    return total;
  }

}
