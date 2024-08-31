import { Component, OnInit, inject } from '@angular/core';
import { Product, ProductData, SupabaseService } from '../../services/supabase/supabase.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.page.html',
  styleUrl: './product-list.page.scss'
})
export class ProductListPage implements OnInit {
  supabase = inject(SupabaseService)
  products: Array<ProductData> = []
  loading = false
  mainUrl = 'https://ulzylfrziikkdhonsdui.supabase.co/storage/v1/object/public/product-images/'

  async ngOnInit(): Promise<void> {
    try {
      this.loading = true
      const { data, error, status } = await this.supabase.products()
      if (error && status !== 406) {
        throw error
      }
      if (data) {
        this.products = data
        console.log(this.products)
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log('erronio', error.message)
      } else {
        console.log('supa error', error)
      }
    } finally {
      this.loading = true
    }
  }
}
