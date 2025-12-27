import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../Clientservice/customer.service';

@Component({
  selector: 'app-new-customer',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-customer.component.html'
})
export class NewCustomerComponent {

  newCustomerFormGroup: UntypedFormGroup;

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

  handleSaveCustomer(): void {
    if (this.newCustomerFormGroup.valid) {
      this.customerService.addCustomer(this.newCustomerFormGroup.value)
        .subscribe({
          next: () => {
            alert('Customer saved successfully!');
            this.router.navigate(['/admin/customers']);
          },
          error: err => {
            console.error(err);
            alert('Error saving customer.');
          }
        });
    }
  }
}
