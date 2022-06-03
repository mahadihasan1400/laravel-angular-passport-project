import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  token:any;
  constructor(private route:ActivatedRoute, private auth:AuthenticationService) { }

  error={
    password:null
  };
  message:any;

  ngOnInit(): void {
    this.route.queryParams.subscribe(param => {
      this.token = param['token'];

    })
  }

  onSubmit(form: NgForm){
    const password = form.value.password;
    const password_confirmation = form.value.password_confirmation;

    this.auth.reset(this.token, password, password_confirmation).subscribe((res:any)=>{
      //this.message = res.message;
      console.log(res);

      let resJSON = JSON.parse(JSON.stringify(res));
      //console.log('test: '+ resJSON.message);

      if(resJSON.password){
        this.error.password = resJSON.password;
      }

      if(resJSON.message === 'Token Not Found.'){
        this.message = resJSON.message;
        console.log('reset message: ' + resJSON.message);
      }

      if(resJSON.message === 'Token has expired.'){
        this.message = resJSON.message;
        console.log('reset message: ' + resJSON.message);
      }

      if(resJSON.message === 'User does not exists.'){
        this.message = resJSON.message;
        console.log('reset message: ' + resJSON.message);
      }

      if(resJSON.message === 'Password Successfully Updated.'){
        this.message = resJSON.message;
        console.log('reset message: ' + resJSON.message);
      }

    }, (err)=>{
      this.error =err.error.errors;
    })
  }

}
