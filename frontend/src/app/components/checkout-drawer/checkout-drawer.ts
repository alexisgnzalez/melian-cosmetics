import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DrawerService } from '../../services/drawer.service';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-checkout-drawer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule, MatButtonModule],
  templateUrl: './checkout-drawer.html',
  styleUrls: ['./checkout-drawer.scss']
})
export class CheckoutDrawerComponent implements OnInit {
  drawerService = inject(DrawerService);
  cartService = inject(CartService);
  orderService = inject(OrderService);
  fb = inject(FormBuilder);

  checkoutForm: FormGroup = this.fb.group({
    customerName: ['', Validators.required],
    customerPhone: ['', Validators.required],
    customerCity: ['', Validators.required],
    deliveryMethod: ['delivery', Validators.required],
    paymentMethod: ['Pago Móvil', Validators.required]
  });

  isSubmitting = false;

  ngOnInit() {
    const savedData = localStorage.getItem('melianCheckoutInfo');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        this.checkoutForm.patchValue(parsedData);
      } catch (e) {
        console.error('Error parsing saved checkout info', e);
      }
    }
  }

  get isVisible() {
    return this.drawerService.activeDrawer() === 'checkout';
  }

  close() {
    this.drawerService.closeDrawer();
  }

  backToCart() {
    this.drawerService.openCart();
  }

  async onSubmit() {
    if (this.checkoutForm.invalid || this.cartService.items().length === 0) {
      this.checkoutForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    try {
      // Save form info to local storage
      localStorage.setItem('melianCheckoutInfo', JSON.stringify(this.checkoutForm.value));

      const orderData = {
        ...this.checkoutForm.value,
        cartItems: this.cartService.items(),
        totalAmount: this.cartService.totalPrice(),
        status: 'Pending'
      };

      const result = await this.orderService.createOrder(orderData);
      
      if (result.success) {
        // Clear the cart
        this.cartService.clearCart();
        // Close Drawer first so the user sees a clean state when they return
        this.close();
        // Redirect to WhatsApp — use location.href to work inside
        // in-app browsers (Instagram, Facebook, TikTok) that block window.open
        this.openWhatsApp(result.whatsappUrl);
      }
    } catch (error) {
      console.error('Checkout failed', error);
      // Optional: Add some user feedback/toast here
    } finally {
      this.isSubmitting = false;
    }
  }

  /**
   * Opens WhatsApp in a way that works across all browser contexts:
   * - In-app browsers (Instagram, Facebook, TikTok): use location.href
   *   because window.open() is blocked in WebViews.
   * - Android in-app browsers: use intent:// scheme to launch WhatsApp directly.
   * - Regular desktop/mobile browsers: use window.open() to open a new tab
   *   so the user doesn't navigate away from the catalog.
   */
  private openWhatsApp(waUrl: string): void {
    const ua = navigator.userAgent || '';
    const isAndroid = /android/i.test(ua);
    const isInAppBrowser = /Instagram|FBAN|FBAV|FB_IAB|TikTok|Snapchat|Line\//i.test(ua);

    if (isInAppBrowser && isAndroid) {
      // Android in-app browsers: use intent:// to force the OS to open WhatsApp
      const url = new URL(waUrl);
      const intentUrl =
        `intent://${url.host}${url.pathname}${url.search}#Intent;` +
        `scheme=https;` +
        `package=com.whatsapp;` +
        `S.browser_fallback_url=${encodeURIComponent(waUrl)};` +
        `end;`;
      window.location.href = intentUrl;
    } else if (isInAppBrowser) {
      // iOS / other in-app browsers: location.href triggers the OS
      // universal link handler which opens WhatsApp directly
      window.location.href = waUrl;
    } else {
      // Regular desktop / mobile browser: open in a new tab so the
      // user stays on the catalog page
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }
  }
}
