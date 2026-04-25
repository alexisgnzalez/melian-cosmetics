import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CartService } from '../../services/cart.service';
import { PocketbaseService } from '../../services/pocketbase.service';

@Component({
  selector: 'app-cart-drawer',
  imports: [CommonModule, MatButtonModule, MatIconModule, MatDividerModule],
  templateUrl: './cart-drawer.html',
  styleUrl: './cart-drawer.scss'
})
export class CartDrawer {
  @Output() close = new EventEmitter<void>();

  constructor(
    public cartService: CartService,
    private pbService: PocketbaseService
  ) {}

  getImageUrl(item: any): string {
    if (item.product.images && item.product.images.length > 0) {
      return this.pbService.getFileUrl(item.product, item.product.images[0], '100x100');
    }
    return 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22100%22%20height%3D%22100%22%20viewBox%3D%220%200%20100%20100%22%3E%3Crect%20fill%3D%22%23eeeeee%22%20width%3D%22100%22%20height%3D%22100%22%2F%3E%3Ctext%20fill%3D%22%23aaaaaa%22%20font-family%3D%22sans-serif%22%20font-size%3D%2212%22%20dy%3D%224.2%22%20font-weight%3D%22bold%22%20x%3D%2250%25%22%20y%3D%2250%25%22%20text-anchor%3D%22middle%22%3E100%C3%97100%3C%2Ftext%3E%3C%2Fsvg%3E';
  }

  updateQuantity(productId: string, quantity: number) {
    this.cartService.updateQuantity(productId, quantity);
  }

  removeItem(productId: string) {
    this.cartService.removeFromCart(productId);
  }

  checkout() {
    this.close.emit();
  }
}
