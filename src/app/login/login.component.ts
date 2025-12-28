import {ChangeDetectorRef, Component} from '@angular/core';
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

  constructor(private router: Router,private cs:Auth,private dt: ChangeDetectorRef
              ) {}

  login() {
    console.log(this.username,this.password)
    this.cs.login(this.username,this.password).subscribe({
      next:(data)=>{
        this.cs.loadprofile(data);
        this.router.navigateByUrl("/admin");
      },error:(err)=>{
console.log(err);
        this.errorMessage="Erreur, login ou ot de passe incorrrect";
        this.dt.detectChanges();
    }
    })

  }
}
