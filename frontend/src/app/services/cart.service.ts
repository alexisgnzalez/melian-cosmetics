import { Injectable, computed, signal } from '@angular/core';
import { Product } from '../models/product.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private itemsSignal = signal<CartItem[]>([]);

  public items = this.itemsSignal.asReadonly();

  public totalItems = computed(() => 
    this.itemsSignal().reduce((acc, item) => acc + item.quantity, 0)
  );

  public totalPrice = computed(() => 
    this.itemsSignal().reduce((acc, item) => acc + (item.product.sellingPrice - item.product.discount) * item.quantity, 0)
  );

  addToCart(product: Product, quantity: number = 1) {
    this.itemsSignal.update(items => {
      const existingItem = items.find(i => i.product.id === product.id);
      if (existingItem) {
        return items.map(i => 
          i.product.id === product.id 
            ? { ...i, quantity: i.quantity + quantity } 
            : i
        );
      }
      return [...items, { product, quantity }];
    });
  }

  removeFromCart(productId: string) {
    this.itemsSignal.update(items => items.filter(i => i.product.id !== productId));
  }

  updateQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }
    this.itemsSignal.update(items => 
      items.map(i => i.product.id === productId ? { ...i, quantity } : i)
    );
  }

  clearCart() {
    this.itemsSignal.set([]);
  }
}
