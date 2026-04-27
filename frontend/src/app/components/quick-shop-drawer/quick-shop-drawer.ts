import { Component, Input, Output, EventEmitter, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { Product, getDiscountedPrice } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { PocketbaseService } from '../../services/pocketbase.service';

@Component({
  selector: 'app-quick-shop-drawer',
  imports: [CommonModule, MatButtonModule, MatIconModule, MatDividerModule],
  templateUrl: './quick-shop-drawer.html',
  styleUrl: './quick-shop-drawer.scss'
})
export class QuickShopDrawer implements OnInit {
  @Input({ required: true }) product!: Product;
  @Output() close = new EventEmitter<void>();

  quantity = signal(1);
  fullStars: number[] = [];
  hasHalfStar = false;

  constructor(
    private cartService: CartService,
    private pbService: PocketbaseService
  ) {}

  ngOnInit() {
    const fullCount = Math.floor(this.product.rating);
    this.fullStars = Array(fullCount).fill(0);
    this.hasHalfStar = this.product.rating % 1 !== 0;
  }

  get imageUrl(): string {
    if (this.product.images && this.product.images.length > 0) {
      return this.pbService.getFileUrl(this.product, this.product.images[0], '400x400');
    }
    return 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22400%22%20height%3D%22400%22%20viewBox%3D%220%200%20400%20400%22%3E%3Crect%20fill%3D%22%23eeeeee%22%20width%3D%22400%22%20height%3D%22400%22%2F%3E%3Ctext%20fill%3D%22%23aaaaaa%22%20font-family%3D%22sans-serif%22%20font-size%3D%2230%22%20dy%3D%2210.5%22%20font-weight%3D%22bold%22%20x%3D%2250%25%22%20y%3D%2250%25%22%20text-anchor%3D%22middle%22%3E400%C3%97400%3C%2Ftext%3E%3C%2Fsvg%3E';
  }

  get unitPrice(): number {
    return getDiscountedPrice(this.product);
  }

  get finalPrice(): number {
    return getDiscountedPrice(this.product) * this.quantity();
  }

  increment() {
    this.quantity.update(q => q + 1);
  }

  decrement() {
    if (this.quantity() > 1) {
      this.quantity.update(q => q - 1);
    }
  }

  addToBag() {
    this.cartService.addToCart(this.product, this.quantity());
    this.close.emit();
  }
}
