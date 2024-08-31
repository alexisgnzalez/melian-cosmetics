import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { User } from '../interfaces/user';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor() { }

  async login(emailAddress: string, password: string) {
    const pb = new PocketBase(environment.baseUrl);
    const authData = await pb.collection('users').authWithPassword(emailAddress, password);
    this.userSubject.next({ isValid: pb.authStore.isValid, authModel: pb.authStore.model, token: pb.authStore.token });
    console.log({ isValid: pb.authStore.isValid, authModel: pb.authStore.model, token: pb.authStore.token });
    return pb.authStore.isValid;
  }

  logout() {
    const pb = new PocketBase(environment.baseUrl);
    return pb.authStore.clear();
  }
}
