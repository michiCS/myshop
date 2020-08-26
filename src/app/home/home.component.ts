import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Product } from '../models/Product';
import { CookieService } from 'ngx-cookie-service';
import { AppSettings } from '../app-settings';
import { AuthInterceptor } from '../auth.interceptor';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  page: number = 0;
  sortParam: string = "name";

  private _inputChanged: Subject<string> = new Subject<string>();
  subscription: Subscription;
  searchTerm: string = "";

  private _alerts = new Subject<string>();
  alertMessage = "";
  alertType = "";

  loaded: boolean = false;


  constructor(private apiService: ApiService, private cookieService: CookieService, private router: Router) { }

  ngOnInit(): void {

    this.loadProducts();

    this._alerts.subscribe(message => this.alertMessage = message);
    this._alerts.pipe(debounceTime(3000))
      .subscribe(() => this.alertMessage = "");

    this.subscription = this._inputChanged.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(x => this.page = 0),
      tap(x => this.products = []),
    ).subscribe(() => {
      this.loadProducts();
    })

  }

  loadProducts() {
    let list = [];
    if (this.cookieService.check(AppSettings.COOKIE_WISHLIST)) {
      list = JSON.parse(this.cookieService.get(AppSettings.COOKIE_WISHLIST)) as any[];
    }
    this.apiService.getProducts(this.page, this.searchTerm, this.sortParam).subscribe(res => {
      res.forEach(prod => {
        prod.isInWishlist = false;

        if (list.some(x => prod.id === x.id) && list.length > 0) {
          prod.isInWishlist = true;
        }
        this.products.push(prod);
      })
      console.log(this.products);
      this.loaded = true;
    })
  }

  onScroll() {
    this.page++;
    console.log(this.page);
    this.loadProducts();
  }

  inputChanged() {
    this.loaded = false;
    this._inputChanged.next(this.searchTerm);
  }

  onFilterChanged() {
    console.log(this.sortParam);
    this.products = [];
    this.page = 0;
    this.loadProducts();
  }


  handleWishlist(product: any) {

    if (!this.cookieService.check(AppSettings.COOKIE_WISHLIST)) {
      this.cookieService.set(AppSettings.COOKIE_WISHLIST, JSON.stringify([]));
    }

    let list = JSON.parse(this.cookieService.get(AppSettings.COOKIE_WISHLIST)) as any[];
    console.log(list);
    console.log(product);
    if (list.some(x => x.id === product.id)) {
      this.removeItemFromListInCookie(product, AppSettings.COOKIE_WISHLIST);
      product.isInWishlist = false;
    } else {
      this.addItemToListInCookie(product, AppSettings.COOKIE_WISHLIST);
      product.isInWishlist = true;
    }
  }

  addItemToListInCookie(item: any, cookieName: string) {
    let list = JSON.parse(this.cookieService.get(cookieName)) as any[];
    list.push(item);

    let replacer = (key, value) => {
      const keysToOmit = ["description", "isInWishlist"];
      if (keysToOmit.indexOf(key) === -1) return value;
    }

    this.cookieService.set(cookieName, JSON.stringify(list, replacer));
    this.alertType = "success";
    this._alerts.next(`${item.name} added to wishlist!`);
  }


  removeItemFromListInCookie(item: any, cookieName: string) {
    let list = JSON.parse(this.cookieService.get(cookieName)) as any[];
    const index = list.indexOf(item);
    list.splice(index);
    this.cookieService.set(cookieName, JSON.stringify(list));
    this.alertType = "warning";
    this._alerts.next(`${item.name} removed from wishlist!`);
  }


  addToCart(product) {
    this.apiService.addToCart(product.id, 1).subscribe(x => {
      this.router.navigate(["/shoppingcart"]);
    });
  }





}
