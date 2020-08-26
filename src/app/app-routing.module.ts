import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { RegisterComponent } from './register/register.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { RouteGuard } from './route-guard.guard';


const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "home", component: HomeComponent},
  {path: "wishlist", component: WishlistComponent},
  {path: "shoppingcart", component: ShoppingCartComponent, canActivate: [RouteGuard]},
  {path: "create-product", component: CreateProductComponent, canActivate: [RouteGuard]},
  {path: "products", component: ProductsComponent, canActivate: [RouteGuard]},
  {path: "product/:id", component: ProductComponent},
  {path: "order-history", component: OrderHistoryComponent, canActivate: [RouteGuard]},
  {path: "**", redirectTo: "/home", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
