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

    // Detect in-app browsers (Instagram, FB, TikTok, etc.)
    const ua = navigator.userAgent || '';
    const isInApp = /Instagram|FBAN|FBAV|FB_IAB|TikTok|Snapchat|Line\//i.test(ua);

    // For regular browsers: pre-open a blank tab NOW while the click
    // gesture is active. Browsers block window.open() after an await.
    const newTab = isInApp ? null : window.open('about:blank', '_blank');

    try {
      localStorage.setItem('melianCheckoutInfo', JSON.stringify(this.checkoutForm.value));

      const orderData = {
        ...this.checkoutForm.value,
        cartItems: this.cartService.items(),
        totalAmount: this.cartService.totalPrice(),
        status: 'Pending'
      };

      const result = await this.orderService.createOrder(orderData);

      if (result.success) {
        this.cartService.clearCart();
        this.close();

        if (newTab) {
          // Regular browser: navigate the pre-opened tab to WhatsApp
          newTab.location.href = result.whatsappUrl;
        } else {
          // In-app browser: navigate in place (window.open is blocked in WebViews)
          window.location.href = result.whatsappUrl;
        }
      } else {
        newTab?.close();
      }
    } catch (error) {
      console.error('Checkout failed', error);
      newTab?.close();
    } finally {
      this.isSubmitting = false;
    }
  }
}

