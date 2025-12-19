import { Component } from '@angular/core';
import {ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';
import { Observable, of } from 'rxjs';
import {AsyncPipe, DatePipe, DecimalPipe, NgClass} from '@angular/common';

@Component({
  selector: 'app-accounts',
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    DecimalPipe,
    DatePipe,
    NgClass
  ],
  templateUrl: './accounts.component.html'
})
export class AccountsComponent {

  accountFormGroup!: UntypedFormGroup;
  operationFromGroup!: UntypedFormGroup;

  accountObservable!: Observable<any>;
  errorMessage = '';
  currentPage = 0;

  constructor(private fb: UntypedFormBuilder) {

    this.accountFormGroup = this.fb.group({
      accountId: ['']
    });

    this.operationFromGroup = this.fb.group({
      operationType: ['DEBIT'],
      amount: [''],
      description: [''],
      accountDestination: ['']
    });

    this.accountObservable = of({
      accountId: 'ACC-REDA-001',
      balance: 15000,
      totalPages: 3,
      accountOperationDTOS: [
        { id: 1, operationDate: new Date(), type: 'DEBIT', amount: 200 },
        { id: 2, operationDate: new Date(), type: 'CREDIT', amount: 500 }
      ]
    });
  }

  handleSearchAccount() {
    console.log(this.accountFormGroup.value);
  }

  handleAccountOperation() {
    alert('Operation saved (demo)');
  }

  gotoPage(page: number) {
    this.currentPage = page;
  }
}
