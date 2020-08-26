import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AppSettings } from '../app-settings';
import { Product } from '../models/Product';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  products: Product[] = [];

  constructor(private cookieService: CookieService, private router: Router, private apiService: ApiService) { }


  ngOnInit(): void {
    if(this.cookieService.check(AppSettings.COOKIE_WISHLIST)) {
      this.products = (JSON.parse(this.cookieService.get(AppSettings.COOKIE_WISHLIST)) as any[])
      .sort((a, b) => {
        if (a.name < b.name) return -1;
        else if (a.name > b.name) return 1;
        return 0;
      });
    console.log(this.products);
    }

  }

  removeFromWishlist(product : any) {
    let list = JSON.parse(this.cookieService.get(AppSettings.COOKIE_WISHLIST)) as any [];
    const index = list.indexOf(product);
    list.splice(index);
    this.products.splice(this.products.indexOf(product), 1);
    this.cookieService.set(AppSettings.COOKIE_WISHLIST, JSON.stringify(list));
  }
  
  addToCart(product) {
    this.apiService.addToCart(product.id, 1).subscribe(x => {
      this.removeFromWishlist(product);
      this.router.navigate(["/shoppingcart"]);
    });
  }

}
