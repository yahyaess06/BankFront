import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Customer } from '../model/customer.model';
import { CustomerService } from '../Clientservice/customer.service';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    CommonModule,       // ✅ FIX ICI
    ReactiveFormsModule,
    RouterLink,
    FormsModule
  ],
  templateUrl: './customers.component.html'
})
export class CustomersComponent implements OnInit {

  acc_id!: any;
  clients!: Customer[];
  searchFormGroup!: UntypedFormGroup;
  errorMessage = '';

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private cs: CustomerService,
    private dt: ChangeDetectorRef
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
      next: (data: Customer[]) => {this.clients = data;
        this.dt.detectChanges();
        },
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

  handleCustomerAccounts(client: Customer) {
    this.router.navigate(['customer-accounts'],{
      queryParams:{
        id:client.id,
        name:client.name,
        email:client.email
      }
    })
  }

  opps() {
    this.router.navigate(['accounts'],{
      queryParams:{
        idc:this.acc_id
      }
    })
  }
}
