import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCatalog } from './product-catalog';

describe('ProductCatalog', () => {
  let component: ProductCatalog;
  let fixture: ComponentFixture<ProductCatalog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCatalog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCatalog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
