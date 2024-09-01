import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../interfaces/product';
import { ProductComponent } from '../../components/product/product.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FilterByCategoryPipe } from '../../pipes/filter-by-category.pipe';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductComponent, MatTabsModule, FilterByCategoryPipe],
  templateUrl: './products.page.html',
  styleUrl: './products.page.scss'
})
export class ProductsPage implements OnInit {

  productService: ProductsService = inject(ProductsService);
  products = signal<Product[]>([]);
  
  
  ngOnInit() {
    this.productService.getProducts().then(result => {
      // @ts-ignore
      this.products.set(result);
    });
    
  }
}
