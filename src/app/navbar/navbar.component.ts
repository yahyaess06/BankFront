import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import {Auth} from '../service/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  {

  accountName: string = 'Admin';

  constructor(private router: Router,public auth:Auth) {}



  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
