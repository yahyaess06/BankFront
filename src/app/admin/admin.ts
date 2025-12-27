import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from '../navbar/navbar.component';
import {Router, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [
    NavbarComponent,
    RouterOutlet
  ],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin implements OnInit{

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.router.navigateByUrl("admin/customers");
  }

}
