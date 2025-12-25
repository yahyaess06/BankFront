import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule, UntypedFormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Cbdto} from '../CompteModel/Cbdto';
import {ComptesS} from '../CompteService/comptes-s';

@Component({
  selector: 'app-creer-acc',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './creer-acc.html',
  styleUrl: './creer-acc.css',
})
export class CreerAcc implements OnInit{
  constructor( private fb: UntypedFormBuilder,
               private route:Router,
               private router: ActivatedRoute
  ,private sc: ComptesS) {
  }
  error!:any;
  cbdto:Cbdto= new Cbdto();
  compteForm: any;
  idclient:any;
  comptetype:any;
  ngOnInit(): void {
    this.comptetype="courant";
    this.idclient=this.router.snapshot.queryParamMap.get("idclient");
    this.compteForm = this.fb.group({
      id:['', Validators.required],
      sold: ['', Validators.required],
      type: [''],
      devise: ['', Validators.required],
      decouvert: [''],
      tauxInteret: ['']
    });
    this.compteForm.get('id').setValue(this.idclient);
    this.compteForm.get('devise').setValue("MAD");

  }

  updateCustomer() {
    this.compteForm.get('type').setValue(this.comptetype)
    this.cbdto.id=this.compteForm.value.id;
this.cbdto.type=this.compteForm.value.type;
this.cbdto.sold=this.compteForm.value.sold;
    this.cbdto.devise=this.compteForm.value.devise;
    this.cbdto.decouvert=this.compteForm.value.decouvert;
    this.cbdto.tauxInteret=this.compteForm.value.tauxInteret;
    console.log(this.cbdto)
    if( this.comptetype=="courant"){
    this.sc.ajouterComptec(this.cbdto).subscribe({
      next:(res:any)=>{
        alert("compte ajouter avec succes");
        this.route.navigate(['/customers'])
      },error:(err:any)=>{
        this.error="erreur, vous ne pouvez pas ajouter ce compte ";
      }
    })
    }
    else{
      this.sc.ajouterComptee(this.cbdto).subscribe({
        next:(res:any)=>{
        alert("compte ajouter avec succes");
        this.route.navigate(['/customers'])
      },error:(err:any)=>{
            this.error="erreur, vous ne pouvez pas ajouter ce compte ";
      }}
      )
    }
  }


  ctype() {
    this.comptetype="epargn";
  }

  ctypee() {
    this.comptetype="courant";
  }
}
