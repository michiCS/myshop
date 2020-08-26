import { Injectable, SkipSelf } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { share, tap } from "rxjs/operators";
import { Router } from '@angular/router';
import { Product } from './models/Product';
import { AppSettings } from './app-settings';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //private url = "http://localhost:8080"
  private url = "https://my-spring-backend.herokuapp.com"
  private nameRepository = new Subject<string>();

  constructor(private http: HttpClient) { }

  register(username: string, password: string, email: string) {
    console.log(password);
    return this.http.post(this.url + "/register", {username, password, email}).pipe(share());
  }

  login(email: string, password: string) {
    return this.http.post(this.url + "/login", { email, password })
      .pipe(tap(res => {
        console.log(res);
        this.setSession(res);
      }));
  }

  getName() {
    return localStorage.getItem(AppSettings.USER_NAME);
  }


  private setSession(authResult){
    //const expiresAt = moment().add(authResult.expiresIn,'second');

    console.log(authResult.token);
    localStorage.setItem(AppSettings.AUTH_TOKEN, authResult.token);
    localStorage.setItem(AppSettings.USER_NAME, authResult.name);
    this.notify(authResult.name);
    //localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  }

  public notify(msg: string) {
    this.nameRepository.next(msg);
  }

  public listen(): Observable<string> {
    return this.nameRepository.asObservable();
  }

  logout(){
    localStorage.removeItem(AppSettings.AUTH_TOKEN);
    localStorage.removeItem(AppSettings.USER_NAME);
    this.notify("");
  }


  public isLoggedIn() {
    return Boolean(localStorage.getItem(AppSettings.AUTH_TOKEN));
    //return moment().isBefore(this.getExpiration());
}

isLoggedOut() {
    //return !this.isLoggedIn();
}

getExpiration() {
    // const expiration = localStorage.getItem("expires_at");
    // const expiresAt = JSON.parse(expiration);
    // return moment(expiresAt);
} 


  getProducts(page: number, searchTerm: string = "", sortParam: string = "name"): Observable<any> {
    const observable = this.http.get(`${this.url}/products?page=${page}&name=${searchTerm}&sort=${sortParam}`).pipe(share());
    observable.subscribe(x => console.log("Products lets goooo"));
    return observable;
  }

  getProduct(id: number): Observable<any> {
    const observable = this.http.get(`${this.url}/product-info?id=${id}`).pipe(share());
    return observable;
  }

  getProductsForUser(): Observable<any> {
    const observable = this.http.get(this.url + "/user-products").pipe(share());
    return observable;
  }

  updateProduct(productId: number, name: string, price: number): Observable<any> {
    const observable = this.http.put(this.url + "/product",{id: productId, name, price}).pipe(share());
    return observable;
  } 

  
  deleteProduct(productId: number) {
    const observable = this.http.delete(`${this.url}/product?id=${productId}`, {}).pipe(share());
    return observable;
  }


  createProduct(name: string, price: number, description: number, base64: string): Observable<any> {
    const observable = this.http.post(this.url + "/product", {name, price, description, base64}).pipe(share());
    return observable;
  }

  getShoppingCart(): Observable<any> {
    const observable = this.http.get(this.url + "/shoppingcart").pipe(share());
    return observable;
  }

  addToCart(productId: number, quantity: number): Observable<any> {
    const observable = this.http.post(`${this.url}/add-to-cart?id=${productId}&quantity=${quantity}`, {}).pipe(share());
    return observable;
  }

  deleteFromCart(productId: number): Observable<any> {
    const observable = this.http.delete(`${this.url}/delete-from-cart?id=${productId}`).pipe(share());
    return observable;
  }

  updateQuantityInCart(itemId: number, quantity: number): Observable<any> {
    const observable = this.http.put(`${this.url}/update-item-quantity?id=${itemId}&quantity=${quantity}`, {}).pipe(share());
    return observable;
  }

  getOrders() {
    const observable = this.http.get(`${this.url}/orders`).pipe(share());
    return observable;
  }

  placeOrder() {
    const observable = this.http.post(`${this.url}/orders`, {}).pipe(share());
    return observable;
  }

  getReviewsForProduct(productId: number): Observable<any> {
    const observable = this.http.get(`${this.url}/reviews?id=${productId}`).pipe(share());
    return observable;
  }

  postReviewForProduct(productId: number, rating: number, text: string): Observable<any> {
    const observable = this.http.post(`${this.url}/reviews`, {productId, rating, text}).pipe(share());
    return observable;
  }

  getReviewInfo(productId: number): Observable<any> {
    const observable = this.http.get(`${this.url}/review-info?id=${productId}`).pipe(share());
    return observable;
  }

  deleteReview(reviewId: number) {
    const observable = this.http.delete(`${this.url}/reviews?id=${reviewId}`, {}).pipe(share());
    return observable;
  }

  test(): Observable<any> {
    const observable = this.http.get(this.url + "/sendbackusername").pipe(share());
    return observable;
  }
}
