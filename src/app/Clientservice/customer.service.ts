import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../model/customer.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private http = inject(HttpClient);
  private readonly API = 'http://localhost:9000';

  // ===== GET ALL CLIENTS =====
  getCustomers(keyword: string): Observable<any> {
    return this.http.get(
      `${this.API}/Clients`,
      { params: { motcle: keyword } }
    );
  }

  // ===== ADD CLIENT =====
  addCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(
      `${this.API}/ajouterClient`,
      customer
    );
  }

  // ===== GET ONE CLIENT =====
  getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(
      `${this.API}/get/${id}`
    );
  }

  // ===== UPDATE CLIENT =====
  updateCustomer(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(
      `${this.API}/modifier`,
      customer
    );
  }

  // ===== DELETE CLIENT =====
  deleteCl(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.API}/supprimer/${id}`
    );
  }

  // ===== CUSTOMER ACCOUNTS =====
  getCustomerAccounts(customerId: number): Observable<any> {
    return this.http.get(
      `${this.API}/customers/${customerId}/accounts`
    );
  }

  // ===== ACCOUNT DETAILS =====
  getAccountDetails(accountId: string): Observable<any> {
    return this.http.get(
      `${this.API}/accounts/${accountId}`
    );
  }
}
