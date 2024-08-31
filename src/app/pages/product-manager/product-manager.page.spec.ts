import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductManagerPage } from './product-manager.page';

describe('ProductManagerPage', () => {
  let component: ProductManagerPage;
  let fixture: ComponentFixture<ProductManagerPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductManagerPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductManagerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
