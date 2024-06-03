import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductImageUploadComponent } from '../../components/product-image-upload/product-image-upload.component';
import { SupabaseService } from '../../services/supabase/supabase.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, ProductImageUploadComponent],
  templateUrl: './add-product.page.html',
  styleUrl: './add-product.page.scss'
})
export class AddProductPage {
  form!: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private supabase: SupabaseService) {}

  ngOnInit() {
    this.form = this.fb.group({
      capId: [''],
      name: [''],
      capPrice: [''],
      quantity: [''],
      delivery: [''],
      suggestedPrice: [''],
      price: [''],
      imageUrl: [''],
      discount: [''],
      soldQuantity: ['']
    });
  }

  async insertProduct(): Promise<void> {
    try {
      this.loading = true

      const capid = this.form.value.capId as string
      const name = this.form.value.name as string
      const capprice = this.form.value.capPrice as number
      const quantity = this.form.value.quantity as number
      const delivery = this.form.value.delivery as number
      const suggestedprice = this.form.value.suggestedPrice as number
      const price = this.form.value.price as number
      const imageurl = this.form.value.imageUrl as string
      const discount = this.form.value.discount as number
      const soldquantity = this.form.value.soldQuantity as number


      const { error } = await this.supabase.insertProduct({
        capid,
        name,
        capprice,
        quantity,
        delivery,
        suggestedprice,
        price,
        imageurl,
        discount,
        soldquantity
      })
      if (error) throw error
    } catch (error) {
      if (error instanceof Error) {
        alert (error.message)
      }
    } finally {
      this.loading = false
    }
  }

  get productImageUrl() {
    return this.form.value.imageUrl as string
  }

  async updateProductImage(event: string): Promise<void> {
    this.form.patchValue({
      imageUrl: event,
    })
  }
}
