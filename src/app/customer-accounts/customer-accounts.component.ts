import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { CommonModule } from '@angular/common';
import {ComptesS} from '../CompteService/comptes-s';
import {Auth} from '../service/auth';

@Component({
  selector: 'app-customer-accounts',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './customer-accounts.component.html',
  styleUrls: ['./customer-accounts.component.css']
})
export class CustomerAccountsComponent implements OnInit {

  Comptes!: any;

  constructor(private router: ActivatedRoute,
              private route:Router,public auth:Auth,
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
  this.route.navigate(['admin/accounts'],{queryParams:{
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

  suspendre(id:any) {
     this.cs.suspendre(id).subscribe({
       next:(res)=>{
         if (res==true){
           this.getComptes()
           this.cd.detectChanges();
         }
       },error:err=>console.log(err)
     })
  }

  delete(id:any) {
    confirm("vous voulez vraiment suprimmer ce compte?")
this.cs.suprimmer(id).subscribe({
  next:(res)=>{
    this.getComptes()
      this.cd.detectChanges();

  },error:err=>console.log(err)
})
  }
  activer(id:any) {
     this.cs.activer(id).subscribe({
       next:(res)=>{
         if (res==true){
           this.getComptes()
           this.cd.detectChanges();
         }
       },error:err=>console.log(err)
     })
  }

  ajc(id:any) {
    this.route.navigate(['admin/CreerAcc'],{
      queryParams:{
        idclient:id
      }
    })
  }
}
