import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router, private auth:AuthenticationService) { }

  ngOnInit(): void {
  }
  onSubmit(form:NgForm){
    const email = form.value.email;
    const password = form.value.password;

    this.auth.login(email,password).subscribe((res:any)=> {
        localStorage.setItem('user', JSON.stringify(res));

        this.router.navigate(['/dashboard']);

      },
      err=>{
        console.log(err);
      })


  }

}
