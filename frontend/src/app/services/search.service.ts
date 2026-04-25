import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  public searchQuery = signal<string>('');

  setQuery(query: string) {
    this.searchQuery.set(query.toLowerCase());
  }
}
