import { Routes } from '@angular/router';
import { LoginPage } from './pages/login/login.page';
import { NotFoundPage } from './pages/not-found/not-found.page';
import { ProductManagerPage } from './pages/product-manager/product-manager.page';
import { ProductsPage } from './pages/products/products.page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full'
  },
  {
    path: 'products',
    component: ProductsPage
  },
  {
    path: 'login',
    component: LoginPage
  },
  {
    path: 'product-manager',
    component: ProductManagerPage
  },
  {
    path: '**',
    component: NotFoundPage
  }
];
