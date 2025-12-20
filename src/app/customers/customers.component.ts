import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Customer } from '../model/customer.model';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    CommonModule,       // ✅ FIX ICI
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './customers.component.html'
})
export class CustomersComponent implements OnInit {

  clients!: Customer[];
  searchFormGroup!: UntypedFormGroup;
  errorMessage = '';

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private cs: CustomerService
  ) {
    this.searchFormGroup = this.fb.group({
      keyword: ['']
    });
  }

  ngOnInit(): void {
    this.getClients();
  }

  getClients(): void {
    const keyword = this.searchFormGroup.value.keyword.trim();
    this.cs.getCustomers(keyword).subscribe({
      next: (data: Customer[]) => this.clients = data,
      error: (err) => console.log(err)
    });
  }

  handleDeleteCustomer(c: Customer): void {
    if (confirm('Supprimer ' + c.name + ' ?')) {
      this.cs.deleteCl(c.id).subscribe({
        next: () => this.getClients()
      });
    }
  }

  handleCustomerAccounts(c: Customer) {
    this.router.navigateByUrl('/customer-accounts/' + c.id);
  }
}
