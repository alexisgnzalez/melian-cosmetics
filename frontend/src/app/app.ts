import { Component, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { ProductGrid } from './components/product-grid/product-grid';
import { CartDrawer } from './components/cart-drawer/cart-drawer';
import { QuickShopDrawer } from './components/quick-shop-drawer/quick-shop-drawer';
import { CartService } from './services/cart.service';
import { DrawerService } from './services/drawer.service';
import { SearchService } from './services/search.service';

@Component({
  selector: 'app-root',
  imports: [
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatBadgeModule,
    ProductGrid,
    CartDrawer,
    QuickShopDrawer
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Melian Cosmetics');
  constructor(
    public cartService: CartService,
    public drawerService: DrawerService,
    private searchService: SearchService
  ) {}

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchService.setQuery(input.value);
  }
}
