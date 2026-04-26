import { Component, signal, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { ProductGrid } from './components/product-grid/product-grid';
import { CartDrawer } from './components/cart-drawer/cart-drawer';
import { QuickShopDrawer } from './components/quick-shop-drawer/quick-shop-drawer';
import { CheckoutDrawerComponent } from './components/checkout-drawer/checkout-drawer';
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
    QuickShopDrawer,
    CheckoutDrawerComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements AfterViewInit, OnDestroy {
  protected readonly title = signal('Melian Cosmetics');
  private resizeObserver?: ResizeObserver;

  constructor(
    public cartService: CartService,
    public drawerService: DrawerService,
    private searchService: SearchService,
    private el: ElementRef
  ) {}

  ngAfterViewInit() {
    const toolbar = this.el.nativeElement.querySelector('.app-toolbar');
    if (toolbar) {
      this.resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
          const height = entry.target.getBoundingClientRect().height;
          document.documentElement.style.setProperty('--header-height', `${height}px`);
        }
      });
      this.resizeObserver.observe(toolbar);
    }
  }

  ngOnDestroy() {
    this.resizeObserver?.disconnect();
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchService.setQuery(input.value);
  }
}
