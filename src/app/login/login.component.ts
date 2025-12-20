import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,   // ✅ FIX ICI
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username = '';
  password = '';
  errorMessage = '';

  constructor(private router: Router) {}

  login() {
    if (this.username === 'admin' && this.password === 'admin') {
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['/customers']);
    } else {
      this.errorMessage = 'Login ou mot de passe incorrect';
    }
  }
}
