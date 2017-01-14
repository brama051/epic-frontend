import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators, NgForm} from "@angular/forms";
import {Router, ActivatedRoute} from "@angular/router";
import {AuthenticationService} from "../_services/authentication.service";

@Component({
  selector: 'ef-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  public token: string;
  public returnUrl: string;
  public message: string = '';
  constructor(private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService){

  }

  ngOnInit(){
    // reset login status
    localStorage.removeItem('token');

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.message = localStorage.getItem('loginMessage');
  }
  onSubmit(form: NgForm){
    console.log(form.value);
    this.message = '';
    this.authenticationService.login(form.value.username, form.value.password)
      .subscribe(
        data => {
          this.token = localStorage.getItem('token');
          if (!this.token){
            this.message = localStorage.getItem('loginMessage');
          }else{
            localStorage.removeItem('message');
            this.router.navigate(['']);
          }

        },
        error => {
          console.log('Error while trying to validate user');
          console.log(error.toString());
        });

  }
}
