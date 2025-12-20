import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CustomersComponent } from './customers/customers.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { AccountsComponent } from './accounts/accounts.component';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { CustomerAccountsComponent } from './customer-accounts/customer-accounts.component';

import { authGuard } from '../auth.guard';

export const routes: Routes = [
  // Route de login accessible sans authentification
  { path: 'login', component: LoginComponent },

  // Routes protégées par le guard
  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: 'customers', component: CustomersComponent },
      { path: 'customers/edit/:id', component: EditCustomerComponent },
      { path: 'accounts', component: AccountsComponent },
      { path: 'new-customer', component: NewCustomerComponent },
      { path: 'customer-accounts', component: CustomerAccountsComponent },
      // Redirection par défaut après login
      { path: '', redirectTo: 'customers', pathMatch: 'full' }
    ]
  },

  // Redirection pour toutes les routes inconnues
  { path: '**', redirectTo: 'login' }
];
