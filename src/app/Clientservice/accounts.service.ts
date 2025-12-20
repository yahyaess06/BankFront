import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountDetails } from '../model/account.model';
import { environment } from '../../environment/environment';


@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  private http = inject(HttpClient);

  getAccount(
    accountId: string,
    page: number,
    size: number
  ): Observable<AccountDetails> {
    return this.http.get<AccountDetails>(
      `${environment.backendHost}/accounts/${accountId}/pageOperations`,
      {
        params: {
          page,
          size
        }
      }
    );
  }

  debit(accountId: string, amount: number, description: string) {
    return this.http.post(
      `${environment.backendHost}/accounts/debit`,
      { accountId, amount, description }
    );
  }

  credit(accountId: string, amount: number, description: string) {
    return this.http.post(
      `${environment.backendHost}/accounts/credit`,
      { accountId, amount, description }
    );
  }

  transfer(
    accountSource: string,
    accountDestination: string,
    amount: number,
    description: string
  ) {
    return this.http.post(
      `${environment.backendHost}/accounts/transfer`,
      { accountSource, accountDestination, amount, description }
    );
  }
}
