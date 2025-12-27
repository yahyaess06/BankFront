import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CustomersComponent } from './customers/customers.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { AccountsComponent } from './accounts/accounts.component';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { CustomerAccountsComponent } from './customer-accounts/customer-accounts.component';

import { authGuard } from '../auth.guard';
import {CreerAcc} from './creer-acc/creer-acc';
import {Admin} from './admin/admin';
import {authentificationGuard} from './gaurds/authentification-guard';
import {NotAuthorizedComponent} from './not-authorized.component/not-authorized.component';
import {autorizationGuard} from './gaurds/autorization-guard';

export const routes: Routes = [

      { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: "admin",component: Admin , children : [

      { path: 'customers', component: CustomersComponent
          ,canActivate:[authentificationGuard]},
      { path: 'customers/edit/:id', component: EditCustomerComponent
        ,canActivate:[authentificationGuard]},
      { path: 'CreerAcc', component: CreerAcc
        ,canActivate:[authentificationGuard]},
      {path:'accounts',component: AccountsComponent
        ,canActivate:[authentificationGuard]},
      { path: 'new-customer', component: NewCustomerComponent
        ,canActivate:[authentificationGuard]},
      { path: 'customer-accounts', component: CustomerAccountsComponent
        ,canActivate:[authentificationGuard]},
      {
        path:"notAuthorized", component: NotAuthorizedComponent
      }


    ]},


];
