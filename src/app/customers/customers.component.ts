import {Component, OnInit} from '@angular/core';
import {ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';
import { Observable, of } from 'rxjs';
import {Router, RouterLink} from '@angular/router';
import {Customer} from "../model/customer.model";
import {CustomerService} from "../services/customer.service";


@Component({
  selector: 'app-customers',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './customers.component.html'
})
export class CustomersComponent implements OnInit{

  clients!: Customer[] ;
  searchFormGroup!: UntypedFormGroup;
  errorMessage = '';



  constructor(private fb: UntypedFormBuilder, private router: Router, private cs:CustomerService) {

    this.searchFormGroup = this.fb.group({
      keyword: ['']
    });
  }

  getClients(): void {
    const keyword = this.searchFormGroup.value.keyword.trim();
    console.log(keyword)
    this.cs.getCustomers(keyword).subscribe({
      next: (data: any) => this.clients = data,
      error: (err: any) => console.log(err)
    });
  }


  handleCustomerDetails(c: any) {
    alert('Details of ' + c.name);
  }

  handleEditCustomer(c: any) {
    this.router.navigateByUrl('/customers/edit/' + c.id);
  }


  handleDeleteCustomer(c: any): void {
    if (confirm('Supprimer ' + c.name + ' ?')) {
      this.cs.deleteCl(c.id).subscribe({
        next: () => {
          // Retirer le client du tableau après suppression
        this.getClients()
          alert('Client supprimé avec succès !');
        },

      });
    }
  }


  handleCustomerAccounts(c: any) {
    this.router.navigateByUrl('/customer-accounts/' + c.id);
  }

  ngOnInit(): void {
    this.getClients();
  }}
