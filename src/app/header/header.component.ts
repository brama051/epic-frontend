import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../_services/authentication.service";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'ef-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: string = "";
  constructor(private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.username = localStorage.getItem('username');
  }

  onLogout(){

    this.authenticationService.logout(localStorage.getItem('token'))
      .subscribe(
        data => {
          let token = localStorage.getItem('token');

          if (!token){
            this.router.navigate(['/login']);
          }

        },
        error => {
          //this.alertService.error(error);
          //this.loading = false;
        });
  }
}
