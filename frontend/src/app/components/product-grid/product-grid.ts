import { Component, OnInit, signal, computed } from '@angular/core';
import { PocketbaseService } from '../../services/pocketbase.service';
import { Product } from '../../models/product.model';
import { ProductCard } from '../product-card/product-card';
import { CommonModule } from '@angular/common';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-product-grid',
  imports: [CommonModule, ProductCard],
  templateUrl: './product-grid.html',
  styleUrl: './product-grid.scss',
})
export class ProductGrid implements OnInit {
  products = signal<Product[]>([]);
  loading = signal(true);

  filteredProducts = computed(() => {
    const query = this.searchService.searchQuery();
    const allProducts = this.products();
    if (!query) return allProducts;
    
    return allProducts.filter(p => 
      p.name.toLowerCase().includes(query) || 
      (p.description && p.description.toLowerCase().includes(query)) ||
      p.broadCategory.toLowerCase().includes(query)
    );
  });

  constructor(
    private pbService: PocketbaseService,
    private searchService: SearchService
  ) {}

  async ngOnInit() {
    this.loading.set(true);
    const records = await this.pbService.getProducts();
    this.products.set(records);
    this.loading.set(false);
  }
}
