import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  public searchQuery = signal<string>('');
  public activeCategory = signal<string>('All');

  setQuery(query: string) {
    this.searchQuery.set(query.toLowerCase());
  }

  setCategory(category: string) {
    this.activeCategory.set(category);
  }
}
