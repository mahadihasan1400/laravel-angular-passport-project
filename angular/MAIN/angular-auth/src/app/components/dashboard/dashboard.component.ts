import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  //private router:Router
  constructor(private auth:AuthenticationService) { }

  user:any;
  ngOnInit(): void {

  this.auth.status().subscribe((res)=>{
    console.log(res);
  });

    this.auth.user().subscribe((res)=>{
      this.user = res;
      console.log("final response" + res);

    }, (err)=>{
      console.log(err);
      //this.router.navigate(['/login']);

    });



  }

}
