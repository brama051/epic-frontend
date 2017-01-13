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
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  onSubmit(form: NgForm){
    console.log(form.value);
    this.message = '';
    this.authenticationService.login(form.value.username, form.value.password)
      .subscribe(
        data => {
          this.token = localStorage.getItem('token');
          console.log();
          if (!this.token){
            this.message = localStorage.getItem('loginMessage');
          }else{
            this.router.navigate(['/']);
          }

        },
        error => {
          //this.alertService.error(error);
          //this.loading = false;
        });

  }
}
