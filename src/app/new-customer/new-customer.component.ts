import { Component } from '@angular/core';
import {ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import { CustomerService } from '../services/customer.service';
import {Router} from "@angular/router";
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-new-customer',
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './new-customer.component.html'
})
export class NewCustomerComponent {

  newCustomerFormGroup!: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private customerService: CustomerService,
    private router: Router
  ) {
    this.newCustomerFormGroup = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  handleSaveCustomer() {
    if (this.newCustomerFormGroup.valid) {
      this.customerService.addCustomer(this.newCustomerFormGroup.value)
        .subscribe({
          next: (res) => {
            alert('Customer saved successfully!');
            this.router.navigate(["/customers"]);
          },
          error: (err) => {
            console.error(err);
            alert('Error saving customer.');
          }
        });
    }
  }
}
