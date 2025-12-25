import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../Clientservice/customer.service';
import { Customer } from '../model/customer.model';

@Component({
  selector: 'app-edit-customer',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {

  customerForm!: UntypedFormGroup;
  customerId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: UntypedFormBuilder,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.customerId = Number(this.route.snapshot.paramMap.get('id'));

    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.loadCustomer();
  }

  loadCustomer(): void {
    this.customerService.getCustomer(this.customerId).subscribe(
      (customer: any) => {
        this.customerForm.patchValue({
          name: customer.name,
          email: customer.email
        });
      },
      (err: any) => {
        console.error('Erreur lors du chargement du client', err);
      }
    );
  }

  updateCustomer(): void {
    if (!this.customerForm.valid) return;

    const updatedCustomer: Customer = {
      id: this.customerId,
      ...this.customerForm.value
    };

    this.customerService.updateCustomer(updatedCustomer).subscribe({
      next: () => {
        this.router.navigate(['/customers']);
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour du client', err);
      }
    });
  }
}
