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
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';

    if (localStorage.getItem('timestamp')) {
      let timestamp: Date = new Date(JSON.parse(localStorage.getItem('timestamp')));
      //console.log(timestamp);
      let newTimestamp = new Date();
      console.log(timestamp);
      console.log(newTimestamp);
      let dateDiff: Date = new Date(new Date(newTimestamp.getTime() - timestamp.getTime()));
      let secondsPassed: number = dateDiff.getTime() / 1000;
      if (secondsPassed < 10) {
        this.message = localStorage.getItem('loginMessage');
      }
    }
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
