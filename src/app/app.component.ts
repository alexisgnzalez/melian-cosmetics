import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoginPage } from './pages/login/login.page'
import { SupabaseService } from './services/supabase/supabase.service';
import { AccountPage } from './pages/account/account.page';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, LoginPage, AccountPage],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'melian-cosmetics';
  session = this.supabase.session
  
  constructor(private readonly supabase: SupabaseService) {}

  ngOnInit() {
    this.supabase.authChanges((event, session) => {
        console.log('cuando se hace login', event, session)
        console.log('session', this.supabase.session)
        this.session = session
      }
    )
  }
}
