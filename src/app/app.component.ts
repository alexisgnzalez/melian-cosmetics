import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginPage } from './pages/login/login.page'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginPage],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'melian-cosmetics';
}
