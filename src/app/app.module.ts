import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {HttpClientModule, HttpInterceptor, HttpRequest, HttpHandler, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ApiService } from './api.service';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

import {CookieService} from "ngx-cookie-service";
import { AuthInterceptor } from './auth.interceptor';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { CreateProductComponent } from './create-product/create-product.component';

import { ImageCropperModule } from 'ngx-image-cropper';
import { AdminComponent } from './admin/admin.component';
import { ProductsComponent } from './products/products.component';
import { ProductSubComponent } from './product-sub/product-sub.component';
import { ProductComponent } from './product/product.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    WishlistComponent,
    ShoppingCartComponent,
    NavbarComponent,
    RegisterComponent,
    CreateProductComponent,
    AdminComponent,
    ProductsComponent,
    ProductSubComponent,
    ProductComponent,
    OrderHistoryComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ImageCropperModule,
    NgbModule,
    InfiniteScrollModule
  ],
  providers: [CookieService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
