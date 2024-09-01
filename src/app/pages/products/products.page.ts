import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.page.html',
  styleUrl: './products.page.scss'
})
export class ProductsPage implements OnInit {

  productService: ProductsService = inject(ProductsService);
  
  
  ngOnInit() {
    this.productService.getProducts();
  }
}
