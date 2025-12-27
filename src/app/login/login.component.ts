import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {Auth} from '../service/auth';

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

  constructor(private router: Router,private cs:Auth
              ) {}

  login() {
    // if (this.username === 'admin' && this.password === 'admin') {
    //   localStorage.setItem('isLoggedIn', 'true');
    //   this.router.navigate(['/customers']);
    // } else {
    //   this.errorMessage = 'Login ou mot de passe incorrect';
    // }

    console.log(this.username,this.password)
    this.cs.login(this.username,this.password).subscribe({
      next:(data)=>{
        this.cs.loadprofile(data);
        this.router.navigateByUrl("/admin")
      },error:(err)=>{
console.log(err);
    }
    })

  }
}
