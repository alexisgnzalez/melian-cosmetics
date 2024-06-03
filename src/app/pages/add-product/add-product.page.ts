import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductImageUploadComponent } from '../../components/product-image-upload/product-image-upload.component';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, ProductImageUploadComponent],
  templateUrl: './add-product.page.html',
  styleUrl: './add-product.page.scss'
})
export class AddProductPage {
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

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

  onSubmit() {
    console.log(this.form.value);
  }

  get productImageUrl() {
    return this.form.value.imageUrl as string
  }

  async updateProductImage(event: string): Promise<void> {
    this.form.patchValue({
      imageUrl: event,
    })
    // await this.updateProfile()
  }
}
