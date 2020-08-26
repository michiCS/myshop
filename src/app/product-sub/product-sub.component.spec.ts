import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSubComponent } from './product-sub.component';

describe('ProductSubComponent', () => {
  let component: ProductSubComponent;
  let fixture: ComponentFixture<ProductSubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
