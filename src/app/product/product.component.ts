import { Component, OnInit } from '@angular/core';
import { Product } from '../models/Product';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { ApiService } from '../api.service';
import { ReviewData } from '../models/ReviewData';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  product: Product;
  rating: number = 0;
  reviews: any = [];
  reviewFormVisable: boolean = false;
  reviewData: ReviewData;
  newRating = 5;
  allowedToReview: boolean = false;
  username: string = "";

  constructor(private router: Router, private apiService: ApiService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.username = this.apiService.getName();
    this.activatedRoute.paramMap.subscribe(x => {
      let id = +x.get("id");
      this.apiService.getProduct(id).subscribe(res => {
        this.product = res;
        console.log(this.product);

        this.apiService.getReviewsForProduct(this.product.id).subscribe(y => {
          this.reviews = y;
          this.rating = this.reviews.reduce((a, b) => a + b.rating, 0) / this.reviews.length;
          if (isNaN(this.rating)) this.rating = 0;
        });

        if (this.apiService.isLoggedIn()) {
          this.apiService.getReviewInfo(this.product.id).subscribe(x => {
            console.log(x);
            this.allowedToReview = x;
          });
        }

        this.reviewData = {
          rating: 5,
          text: "Review text"
        };
      })
    })
  }

  addToCart(quantity: number) {
    console.log(quantity);
    if(!this.apiService.isLoggedIn()) {
      this.router.navigate(["login"]);
      return;
    }
    this.apiService.addToCart(this.product.id, quantity).subscribe(x => {
      if (!x["error"]) {
        this.router.navigate(["shoppingcart"]);
      }
    })
  }

  showReviewForm() {
    this.reviewFormVisable = true;
  }

  postReview(text) {
    console.log(text);
    console.log(this.newRating);
    if (text) {
      this.apiService.postReviewForProduct(this.product.id, this.newRating, text).subscribe(x => {
        window.location.reload();
      })
    }
  }

  deleteReview(id: number) {
    this.apiService.deleteReview(id).subscribe(x => {
      window.location.reload();
    })
  }

}
