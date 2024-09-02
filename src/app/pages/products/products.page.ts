import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../interfaces/product';
import { ProductComponent } from '../../components/product/product.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FilterByCategoryPipe } from '../../pipes/filter-by-category.pipe';
import { CategoryTitleComponent } from '../../components/category-title/category-title.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductComponent, MatTabsModule, FilterByCategoryPipe, CategoryTitleComponent, CommonModule],
  templateUrl: './products.page.html',
  styleUrl: './products.page.scss'
})
export class ProductsPage implements OnInit {

  productService: ProductsService = inject(ProductsService);
  products = signal<Product[]>([]);

  categories = [
    {
      category: 'eyes',
      title: 'Ojos'
    },
    {
      category: 'lips',
      title: 'Labios'
    },
    {
      category: 'face',
      title: 'Rostro'
    },
    {
      category: 'accesories',
      title: 'Accesorios'
    },
    {
      category: 'body',
      title: 'Cuerpo'
    }
  ]

  ngOnInit() {
    this.productService.getProducts().then(result => {
      // @ts-ignore
      this.products.set(result);
    });   
  }

  iroliando(event: any) {
    console.log(event);
  }
}
