import { Component, OnInit } from '@angular/core';
import { ProductData } from '../models/ProductData';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  public productData: ProductData;
  private _alerts = new Subject<string>();
  alertMessage = "";

  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.productData = {
      name: "New Product",
      price: 100,
      description: "This is my super cool product."
    };

    this._alerts.subscribe(message => this.alertMessage = message);
    this._alerts.pipe(debounceTime(3000))
      .subscribe(() => this.alertMessage = "");
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64; 
  }

  create(productForm) {
    if(productForm.valid) {
      const data = productForm.value.productData;
      console.log(data);
      this.apiService.createProduct(data.name, data.price, data.description, this.croppedImage).subscribe(x => {
        console.log(x);
        if(x["id"]) {
          this._alerts.next(`Product "${x["name"]}" created!`);
        }
      })
    }
  }

}
