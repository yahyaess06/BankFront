import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../model/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) {}
  // searchCustomers(motcle: string) {
  //   return this.http.get<any[]>(`http://localhost:9000/customers/search`, {
  //     params: { motcle }
  //   });
  // }


  // ===== GET ALL CLIENTS =====
  getCustomers(keyword: string) {
    return this.http.get("http://localhost:9000/Clients?motcle="+keyword); }

  // ===== ADD CLIENT =====
  addCustomer(customer: Customer) {
    return this.http.post("http://localhost:9000/ajouterClient", customer);
  }

  // ===== GET ONE CLIENT =====
  getCustomer(id: number) {
    return this.http.get("http://localhost:9000/get/" + id);
  }

  // ===== UPDATE CLIENT =====
  updateCustomer(customer: Customer) {
    return this.http.put("http://localhost:9000/modifier", customer);
  }

  // ===== DELETE CLIENT =====
  deleteCl(id: number) {
    return this.http.delete("http://localhost:9000/supprimer/" + id);
  }
  getCustomerAccounts(customerId: number) {
    return this.http.get<any>(
      'http://localhost:9000/customers/' + customerId + '/accounts'
    );
  }

  getAccountDetails(accountId: string) {
    return this.http.get<any>(
      'http://localhost:9000/accounts/' + accountId
    );
  }



}
