import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {


  error={
    email:null
  };
  message:any;
  wait:boolean = false;
  constructor(private auth:AuthenticationService) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    this.wait = true;
    const email = form.value.email;
    this.auth.forgot(email).subscribe((res:any)=>{
      //this.message = res.message;


      //alert(res);

      let resJSON = JSON.parse(JSON.stringify(res));
      this.wait = false;
      //console.log('test: '+ resJSON.message);




      if(resJSON.email){
        this.error.email = resJSON.email;
        console.log('validation error: ' + resJSON.email)
      }
      if(resJSON.message === 'Email Does not exists.'){
        this.message = resJSON.message;
        console.log('email not found error or success notice: ' + resJSON.message);
      }

      if(resJSON.message === 'Check your email.'){
        this.message = resJSON.message;
        console.log('email not found error or success notice: ' + resJSON.message);
      }




    }, (err)=>{
      //this.error = err.error.errors;
      this.wait = false;
    })
  }

}
