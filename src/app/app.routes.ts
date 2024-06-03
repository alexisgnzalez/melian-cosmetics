import { Routes } from '@angular/router';
import { LoginPage } from './pages/login/login.page';
import { AccountPage } from './pages/account/account.page';
import { NotFoundPage } from './pages/not-found/not-found.page';
import { loginGuard } from './guards/login.guard';
import { AddProductPage } from './pages/add-product/add-product.page';
import { ProductListPage } from './pages/product-list/product-list.page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginPage
  },
  {
    path: 'account',
    // canActivate: [loginGuard],
    component: AccountPage,
  },
  {
    path: 'add-product',
    // canActivate: [loginGuard],
    component: AddProductPage,
  },
  {
    path: 'product-list',
    component: ProductListPage
  },
  {
    path: '**',
    component: NotFoundPage
  }
];
