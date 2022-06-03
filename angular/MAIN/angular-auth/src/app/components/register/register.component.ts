import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  errors = {
    name:null,
    email:null,
    password:null,
  }
  constructor(private auth:AuthenticationService, private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    const name = form.value.name;
    const email = form.value.email;
    const password = form.value.password;
    const password_confirmation = form.value.password_confirmation;

    this.auth.register(name,email,password,password_confirmation).subscribe((res)=>{

      //alert(res);

        let resJSON = JSON.parse(JSON.stringify(res));
        //console.log('test: '+ resJSON.message);

        if(resJSON.name){
          this.errors.name = resJSON.name;
        }
        if(resJSON.email){
          this.errors.email = resJSON.email;
        }
        if(resJSON.password){
          this.errors.password = resJSON.password;
        }

        // redirect to dashboard
        if(resJSON.message){
          this.router.navigate(['/login']);
        }

      },
      (err)=>{
        //this.errors = err.error.errors;
         //console.log('test: ' +err);
      })
  }
}
