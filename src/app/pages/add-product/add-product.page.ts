import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule],
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
      image: [''],
      discount: [''],
      soldQuantity: ['']
    });
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
