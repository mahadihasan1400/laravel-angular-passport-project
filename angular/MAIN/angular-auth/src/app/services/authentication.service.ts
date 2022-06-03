import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private isLoggedIn = new BehaviorSubject<boolean>(false);
  constructor(private http:HttpClient) { }

  // Toogle Loggedin
  toggleLogin(state: boolean): void {
    this.isLoggedIn.next(state);
  }

  status(){
    const localData: any = localStorage.getItem('user');
    if (!localData) {
      this.isLoggedIn.next(false);
      console.log('User not lgged in !!');
    } else {
      const userObj = JSON.parse(localData);
      const token_expires_at = new Date(userObj.token_expires_at);
      const current_date = new Date();
      if (token_expires_at > current_date) {
        this.isLoggedIn.next(true);
      } else {
        this.isLoggedIn.next(false);
        console.log('Token Expires!!');
      }
    }
    return this.isLoggedIn.asObservable();
  }


  login(email:string, password:string){
    return this.http.post('http://localhost/laravel/laravel-auth/public/api/login',{
      email:email,
      password:password
    });
  }

  user(){
    const user:any = localStorage.getItem('user');
    const userObj:any = JSON.parse(user);
    //console.log(userObj.token);
    //this.status();

    // my code solution for token null reading error
    /*let token = null;
    if(userObj){
      token = userObj.token;
    }*/


    const token = userObj.token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get('http://localhost/laravel/laravel-auth/public/api/user', {headers:headers});
  }


  // Logout
  logout(allDevice: boolean){
    const user: any = localStorage.getItem('user');
    const userObj = JSON.parse(user);

    const token = userObj.token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post('http://localhost/laravel/laravel-auth/public/api/logout', {allDevice:allDevice}, {headers:headers});
  }

  // Register
  register(name:string, email:string, password:string, password_confirmation:string){
    const data={
      name:name,
      email:email,
      password:password,
      password_confirmation:password_confirmation,
    }
    return this.http.post('http://localhost/laravel/laravel-auth/public/api/register', data);
  }

  // Forgot Pass
  forgot(email:string){
    return this.http.post('http://localhost/laravel/laravel-auth/public/api/forgot', {email:email});
  }

  reset(token:string, password:string,password_confirmation:string){

    const data={
      token:token,
      password:password,
      password_confirmation:password_confirmation
    }
    return this.http.post('http://localhost/laravel/laravel-auth/public/api/reset', data);
  }
}
