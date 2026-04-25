import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../models/product.model';
import { PocketbaseService } from '../../services/pocketbase.service';
import { CartService } from '../../services/cart.service';
import { DrawerService } from '../../services/drawer.service';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss'
})
export class ProductCard implements OnInit {
  @Input({ required: true }) product!: Product;
  isAdded = false;
  rating = 0;
  reviews = 0;
  fullStars: number[] = [];
  hasHalfStar = false;

  constructor(
    private pbService: PocketbaseService,
    private cartService: CartService,
    private drawerService: DrawerService
  ) {}

  private hashCode(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  }

  ngOnInit() {
    const hash = this.hashCode(this.product.id);
    
    // Rating between 4.0 and 5.0 (steps of 0.5)
    const ratingOptions = [4.0, 4.5, 5.0];
    this.rating = ratingOptions[hash % ratingOptions.length];
    this.reviews = (hash % 800) + 15;

    const fullCount = Math.floor(this.rating);
    this.fullStars = Array(fullCount).fill(0);
    this.hasHalfStar = this.rating % 1 !== 0;
  }

  get imageUrl(): string {
    if (this.product.images && this.product.images.length > 0) {
      return this.pbService.getFileUrl(this.product, this.product.images[0], '400x400');
    }
    return 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22400%22%20height%3D%22400%22%20viewBox%3D%220%200%20400%20400%22%3E%3Crect%20fill%3D%22%23eeeeee%22%20width%3D%22400%22%20height%3D%22400%22%2F%3E%3Ctext%20fill%3D%22%23aaaaaa%22%20font-family%3D%22sans-serif%22%20font-size%3D%2230%22%20dy%3D%2210.5%22%20font-weight%3D%22bold%22%20x%3D%2250%25%22%20y%3D%2250%25%22%20text-anchor%3D%22middle%22%3E400%C3%97400%3C%2Ftext%3E%3C%2Fsvg%3E';
  }

  get finalPrice(): number {
    return this.product.sellingPrice - (this.product.discount || 0);
  }

  get cartQuantity(): number {
    const item = this.cartService.items().find(i => i.product.id === this.product.id);
    return item ? item.quantity : 0;
  }

  openQuickShop() {
    this.drawerService.openQuickShop(this.product);
  }

  addToCart(event: Event) {
    event.stopPropagation();
    this.cartService.addToCart(this.product);
  }
}
