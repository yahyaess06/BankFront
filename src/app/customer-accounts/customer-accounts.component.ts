import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { CommonModule, DecimalPipe, NgClass } from '@angular/common';
import {ComptesS} from '../CompteService/comptes-s';

@Component({
  selector: 'app-customer-accounts',
  standalone: true,
  imports: [
    CommonModule,  // ✅ IMPORTANT pour *ngFor et pipes
    RouterLink,
    DecimalPipe,
    NgClass
  ],
  templateUrl: './customer-accounts.component.html',
  styleUrls: ['./customer-accounts.component.css']
})
export class CustomerAccountsComponent implements OnInit {

  Comptes!: any;
  Operations! :any;

  constructor(private router: ActivatedRoute,
              private route:Router,
              private cs: ComptesS
  ,private cd:ChangeDetectorRef) {
  }
id:any;
  name:any;
  email:any;
  ngOnInit(): void {

    this.id = this.router.snapshot.queryParamMap.get('id');

    this.name = this.router.snapshot.queryParamMap.get('name');
    this.email = this.router.snapshot.queryParamMap.get('email');
    this.getComptes();
  }
ops(id:any){
  this.route.navigate(['accounts'],{queryParams:{
    idc:id
  }})
}
  getComptes() {
    this.cs.getComptes(this.id).subscribe({
      next:(res)=>{
        if(res){
        this.Comptes=res;
        this.cd.detectChanges();
        }
      },
      error: err=>
        console.log(err)
    })
  }

}
