import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { environment } from '../../environments/environment';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class PocketbaseService {
  public pb: PocketBase;

  constructor() {
    this.pb = new PocketBase(environment.pocketbaseUrl);
  }

  async getProducts(): Promise<Product[]> {
    try {
      const records = await this.pb.collection('products').getFullList<Product>({
        filter: 'forSale = true',
        sort: '-created',
      });
      return records;
    } catch (error) {
      console.error('Error fetching products from PocketBase:', error);
      return [];
    }
  }

  getFileUrl(record: any, filename: string, thumb?: string): string {
    return this.pb.files.getUrl(record, filename, { thumb: thumb || '400x400' });
  }
}

