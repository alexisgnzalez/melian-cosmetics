import { Component, OnInit, inject } from '@angular/core';
import { Product, ProductData, SupabaseService } from '../../services/supabase/supabase.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [],
  templateUrl: './product-list.page.html',
  styleUrl: './product-list.page.scss'
})
export class ProductListPage implements OnInit {
  supabase = inject(SupabaseService)
  products: Array<ProductData> = []
  loading = false

  async ngOnInit(): Promise<void> {
    try {
      this.loading = true
      const { data, error, status } = await this.supabase.products()
      if (error && status !== 406) {
        throw error
      }
      if (data) {
        this.products = data
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
