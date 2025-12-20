import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Operation} from '../CreditModel/operation';
import {Virement} from '../virementModel/virement';

@Injectable({
  providedIn: 'root',
})

export class ComptesS {
  constructor(private http: HttpClient) {
  }
  getComptes(id:any) {
    return this.http.get("http://localhost:9000/accsbyclid/"+id);
  }
  getOpbyCid(id:any){
    return this.http.get("http://localhost:9000/Operations/"+id);
  }
  effectuerCredit(operation:any){
    return this.http.post<Operation>("http://localhost:9000/CreditOperation",operation)
  }
  effectuerDebit(operation:any){
  return this.http.post<Operation>("http://localhost:9000/DebitOperation",operation)
}
effectuervir(virement:any){
    return this.http.post<Virement>("http://localhost:9000/VersementOperation",virement);
  }
}
