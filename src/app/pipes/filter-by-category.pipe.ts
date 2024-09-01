import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';

@Pipe({
  name: 'filterByCategory',
  standalone: true
})
export class FilterByCategoryPipe implements PipeTransform {

  transform(items: Array<Product>, category: string): Array<Product> {
    if (!items || !category) {
      return items;
    }
    const isNegated = category.startsWith('!');
    const normalizedCategory = isNegated ? category.substring(1) : category;

    if (isNegated) {
      return items.filter(item => item.broadCategory !== normalizedCategory);
    } else {
      return items.filter(item => item.broadCategory === normalizedCategory);
    }
  }
}
