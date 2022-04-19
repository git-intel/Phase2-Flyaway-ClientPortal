import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUri ='http://localhost:8080/flyaway/webapi/passengers';

  constructor(private http:HttpClient, private router:Router) { }
  private registerUri = `${this.baseUri}/register`;
  private loginUri = `${this.baseUri}/login`;

  userRegistration(body: any){
    //http methods return observables
    return this.http.post(this.registerUri,body);
  }
  userLogin(body: any){
    //http methods return observables
    return this.http.post(this.loginUri,body);
  }
  
  isUserLoggedIn(){
    if(sessionStorage.getItem('token')){
      return true;
    }else{
      return false;
    }
  }

  logOut(){
    sessionStorage.clear();
    sessionStorage.removeItem('token');
    this.router.navigateByUrl('/auth/signin');
  }
}
