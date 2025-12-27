import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Customer } from '../model/customer.model';
import { CustomerService } from '../Clientservice/customer.service';
import {ComptesS} from '../CompteService/comptes-s';

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
  eror = '';
  ops!:any;

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private cs: CustomerService,
    private dt: ChangeDetectorRef,
    private css: ComptesS
  ) {
    this.searchFormGroup = this.fb.group({
      keyword: ['']
    });
  }
  ngOnInit(): void {
    this.getClients();
    this.voireoplyom();
    this.dt.detectChanges();
  }

  getClients(): void {
    const keyword = this.searchFormGroup.value.keyword.trim();
    this.cs.getCustomers(keyword).subscribe({
      next: (data: Customer[]) =>
      {this.clients = data;
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
    this.router.navigate(['admin/customer-accounts'],{
      queryParams:{
        id:client.id,
        name:client.name,
        email:client.email
      }
    })
  }

  opps() {
   let idcompte=this.acc_id.trim();
    this.css.getCompte(idcompte).subscribe({
      next:(res:any)=>{
      this.router.navigate(['/admin/accounts'],{
        queryParams:{
          idc:idcompte
        }
      })
    },error:(err:any)=>{

        this.eror="Erreur, Compte inexistant ! ";
        this.dt.detectChanges();
    }
  })

  }
  voireoplyom(){
    this.css.getOplyom().subscribe({
      next:(res:any)=>{
        this.ops=res;
        this.dt.detectChanges();
      },error:(err:any)=>{
        console.log(err)
      }
    })
  }
}
