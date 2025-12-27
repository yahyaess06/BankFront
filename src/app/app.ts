import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { CommonModule } from '@angular/common';
import {Auth} from './service/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  template: `
    <app-navbar *ngIf="isLoggedIn()"></app-navbar>
    <router-outlet></router-outlet>
  `
})
export class App implements OnInit{
  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  constructor(private auth:Auth) {
  }

  ngOnInit(): void {
    this.auth.loadjwt();
  }
}
