import { Component, OnInit, signal, computed } from '@angular/core';
import { PocketbaseService } from '../../services/pocketbase.service';
import { Product } from '../../models/product.model';
import { ProductCard } from '../product-card/product-card';
import { CategoryNav } from '../category-nav/category-nav';
import { CommonModule } from '@angular/common';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-product-grid',
  imports: [CommonModule, ProductCard, CategoryNav],
  templateUrl: './product-grid.html',
  styleUrl: './product-grid.scss'
})
export class ProductGrid implements OnInit {
  products = signal<Product[]>([]);
  uniqueCategories = signal<string[]>([]);
  loading = signal(true);

  filteredProducts = computed(() => {
    const query = this.searchService.searchQuery();
    const activeCat = this.searchService.activeCategory();
    let result = this.products();

    if (activeCat !== 'All') {
      result = result.filter(p => p.broadCategory === activeCat);
    }

    if (query) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) || 
        (p.description && p.description.toLowerCase().includes(query)) ||
        p.broadCategory.toLowerCase().includes(query)
      );
    }

    return result;
  });

  constructor(
    private pbService: PocketbaseService,
    private searchService: SearchService
  ) {}

  async ngOnInit() {
    this.loading.set(true);
    const records = await this.pbService.getProducts();
    this.products.set(records);
    
    // Extract unique broad categories and sort (skincare last)
    const categories = Array.from(new Set(records.map(p => p.broadCategory)))
      .filter(Boolean)
      .sort((a, b) => {
        if (a.toLowerCase() === 'skincare') return 1;
        if (b.toLowerCase() === 'skincare') return -1;
        return a.localeCompare(b);
      });
    this.uniqueCategories.set(categories);
    
    this.loading.set(false);
  }

  get activeCategory() {
    return this.searchService.activeCategory();
  }

  onCategoryChange(category: string) {
    this.searchService.setCategory(category);
  }
}
