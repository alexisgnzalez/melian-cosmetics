import { Routes } from '@angular/router';
import { LoginPage } from './pages/login/login.page';
import { AccountPage } from './pages/account/account.page';
import { NotFoundPage } from './pages/not-found/not-found.page';

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
    component: AccountPage
  },
  {
    path: '**',
    component: NotFoundPage
  }
];
