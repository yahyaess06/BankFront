import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  accountName: string = 'Admin';

  constructor(private router: Router) {}

  ngOnInit(): void {

    const storedName = localStorage.getItem('accountName');
    if (storedName) {
      this.accountName = storedName;
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('accountName');

    // Redirection login
    this.router.navigate(['/login']);
  }
}
