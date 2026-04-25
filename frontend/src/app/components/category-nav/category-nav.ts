import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-nav',
  imports: [CommonModule],
  templateUrl: './category-nav.html',
  styleUrl: './category-nav.scss'
})
export class CategoryNav {
  @Input() categories: string[] = [];
  @Input() activeCategory: string = 'All';
  @Output() categoryChange = new EventEmitter<string>();

  getTranslatedCategory(category: string): string {
    return category;
  }

  selectCategory(category: string) {
    this.categoryChange.emit(category);
  }
}
