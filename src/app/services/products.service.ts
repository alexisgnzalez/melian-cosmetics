import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }

  async getProducts() {
    const pb = new PocketBase(environment.baseUrl);
    // you can also fetch all records at once via getFullList
    const resultList = await pb.collection('products').getFullList();
    return resultList;
  }
}
