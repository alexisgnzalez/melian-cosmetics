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
    const resultList = await pb.collection('products').getList(1, 20);
    console.log(resultList);
    return resultList;
  }
}
