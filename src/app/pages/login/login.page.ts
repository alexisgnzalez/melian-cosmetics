import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss'
})
export class LoginPage {
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);
  
  emailAddress = '';
  password = '';
  displayError = false;

  login() {
    this.authService.login(this.emailAddress, this.password)
    .then((res: boolean) => {
      if (res) {
        this.router.navigateByUrl('/product-manager')
      } else {
        this.displayError = true;
      }
    })
  }
}
