import { Component, OnInit } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {DecimalPipe, NgClass} from '@angular/common';

@Component({
  selector: 'app-customer-accounts',
  templateUrl: './customer-accounts.component.html',
  imports: [
    RouterLink,
    DecimalPipe,
    NgClass
  ],
  styleUrls: ['./customer-accounts.component.css']
})
export class CustomerAccountsComponent implements OnInit {

  customerId!: number;
  accounts$!: any; // Pour l'exemple, on mettra un objet mock

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.customerId = 1;

    // Exemple de données mock
    this.accounts$ = {
      id: 1,
      name: 'Rida Elbikri',
      email: 'reda@example.com',
      bankAccounts: [
        {
          id: 'ACC001',
          type: 'Saving',
          balance: 15000,
          transactions: [
            { date: '2025-12-01', description: 'Deposit', amount: 5000 },
            { date: '2025-12-05', description: 'Withdrawal', amount: -2000 },
            { date: '2025-12-10', description: 'Deposit', amount: 3000 }
          ]
        },

      ]
    };
  }

  handleAccountDetails(accountId: string) {
    console.log('Naviguer vers account:', accountId);
    // Ici tu peux naviguer vers une vraie route
    // this.router.navigate(['/accounts', accountId]);
  }
}
