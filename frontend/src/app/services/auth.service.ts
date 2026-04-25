import { Injectable, signal } from '@angular/core';
import { PocketbaseService } from './pocketbase.service';
import { AuthModel } from 'pocketbase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUser = signal<AuthModel | null>(null);
  public isValid = signal<boolean>(false);

  constructor(private pbService: PocketbaseService) {
    this.pbService.pb.authStore.onChange((token, model) => {
      this.currentUser.set(model);
      this.isValid.set(this.pbService.pb.authStore.isValid);
    });

    // Initialize state
    this.currentUser.set(this.pbService.pb.authStore.model);
    this.isValid.set(this.pbService.pb.authStore.isValid);
  }

  logout() {
    this.pbService.pb.authStore.clear();
  }
}
