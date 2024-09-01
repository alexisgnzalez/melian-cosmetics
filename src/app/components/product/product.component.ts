import { Component, computed, input } from '@angular/core';
import { Product } from '../../interfaces/product';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  baseUrl = environment.imageBaseUrl;
  product = input.required<Product>();
  discount = computed(() => {
    return this.product().sellingPrice - (this.product().sellingPrice * (this.product().discount / 100))
  })
}
