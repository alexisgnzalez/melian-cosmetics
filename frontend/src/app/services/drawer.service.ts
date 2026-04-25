import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';

export type DrawerState = 'none' | 'cart' | 'quick-shop';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {
  public activeDrawer = signal<DrawerState>('none');
  public quickShopProduct = signal<Product | null>(null);

  openCart() {
    this.activeDrawer.set('cart');
  }

  openQuickShop(product: Product) {
    this.quickShopProduct.set(product);
    this.activeDrawer.set('quick-shop');
  }

  closeDrawer() {
    this.activeDrawer.set('none');
    setTimeout(() => {
      // Clear product after animation ends to prevent visual glitches
      if (this.activeDrawer() === 'none') {
        this.quickShopProduct.set(null);
      }
    }, 300);
  }

  toggleCart() {
    if (this.activeDrawer() === 'cart') {
      this.closeDrawer();
    } else {
      this.openCart();
    }
  }
}
