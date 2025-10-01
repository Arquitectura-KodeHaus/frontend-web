import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveProducts } from './active-products';

describe('ActiveProducts', () => {
  let component: ActiveProducts;
  let fixture: ComponentFixture<ActiveProducts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveProducts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveProducts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
