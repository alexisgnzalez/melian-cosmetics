import { Component, input } from '@angular/core';

@Component({
  selector: 'app-category-title',
  standalone: true,
  imports: [],
  templateUrl: './category-title.component.html',
  styleUrl: './category-title.component.scss'
})
export class CategoryTitleComponent {
  category = input('Category');
}
