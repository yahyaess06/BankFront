import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {jwtDecode} from 'jwt-decode';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class Auth {

  isAUthenticated:boolean=false;
  roles : any;
  username : any;
  accessToken!: any;


  constructor(private http:HttpClient,private router:Router) {
  }
  public login(username: string, password: string){

    let options= {
      headers : new HttpHeaders().set("Content-Type","application/x-www-form-urlencoded")
    };

    let params=new HttpParams()
      .set("username",username).
      set("password",password)

    return this.http.post("http://localhost:9000/auth/login",params,options)
  }


  loadprofile(data: any) {
    this.isAUthenticated=true;
    this.accessToken = data['access-token'];
    let jwtDecoder:any =jwtDecode(this.accessToken);
    this.username= jwtDecoder.sub;
    this.roles = jwtDecoder.scope;
    window.localStorage.setItem("jwt-token",this.accessToken);

  }

  logout() {
    this.isAUthenticated=false;
    this.accessToken = undefined;
    this.username= undefined;
    this.roles = undefined;
  }

  loadjwt() {
    let token=window.localStorage.getItem("jwt-token");
    if(token){
      this.loadprofile({"access-token":token});
      this.router.navigateByUrl("/admin")
    }
  }
}
