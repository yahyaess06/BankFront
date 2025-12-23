import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import {ComptesS} from '../CompteService/comptes-s';
import {ActivatedRoute} from '@angular/router';
import {Operation} from '../CreditModel/operation';
import {Virement} from '../virementModel/virement';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './accounts.component.html'
})
export class AccountsComponent implements OnInit{

  operationFromGroup!: UntypedFormGroup;

  Operations:any
sold:any
  id:any
  op: Operation=new Operation();
v: Virement=new Virement();

  constructor(private fb: UntypedFormBuilder,private cs:ComptesS
              ,private router:ActivatedRoute,private cd:ChangeDetectorRef) {

    this.operationFromGroup = this.fb.group({
      operationType: ['DEBIT'],
      amount: [''],
      description: [''],
      accountDestination: ['']
    });
  }
  ngOnInit(): void {
    this.id = this.router.snapshot.queryParamMap.get('idc');
    this.getOperations();
  }
  getOperations(){
      this.cs.getOpbyCid(this.id).subscribe({
        next:(res:any)=>{
          console.log(res)
        this.Operations=res;
        this.cd.detectChanges();
        },error:(err:any)=>{
    console.log(err)}
      })
    }

  handleAccountOperation() {
    let TypeOperation=this.operationFromGroup.value.operationType;
    let mantant =this.operationFromGroup.value.amount
    this.id=this.router.snapshot.queryParamMap.get('idc');
    this.op.id=this.id;
    this.op.mantant=mantant;
    if(TypeOperation=="DEBIT"){
     this.cs.effectuerDebit(this.op).subscribe({
       next:(res:any)=>{
         this.getOperations();
         this.cd.detectChanges();
         alert('operation effectuer avec succees');
       },error:err=>{
         console.log(err)
       }
     })
    }
    else if(TypeOperation=="CREDIT"){

      this.cs.effectuerCredit(this.op).subscribe({
        next:(res:any)=>{
          alert('operation effectuer avec succees');
          this.getOperations();
          this.cd.detectChanges();
      },error:err=>{
          console.log(err)
        }
      })
    }
    else{
let idrecoie= this.operationFromGroup.value.accountDestination;

this.v.idCompteverse=this.id;
this.v.mantant=mantant;
this.v.idCompterecoie=idrecoie;

this.cs.effectuervir(this.v).subscribe({
  next:(res:any)=>{
    alert('operation effectuer avec succees');
    this.getOperations();
    this.cd.detectChanges();
  },error:err=>{
    console.log(err)
  }
})
    }
  }
}
