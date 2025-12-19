import { Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {CustomersComponent} from './customers/customers.component';
import {EditCustomerComponent} from './edit-customer/edit-customer.component';
import {AccountsComponent} from './accounts/accounts.component';
import {NewCustomerComponent} from './new-customer/new-customer.component';
import {CustomerAccountsComponent} from './customer-accounts/customer-accounts.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'customers/edit/:id', component: EditCustomerComponent },
  { path: 'accounts', component: AccountsComponent },
  { path: 'new-customer', component: NewCustomerComponent },
  { path: 'customer-accounts/:id', component: CustomerAccountsComponent },


];
