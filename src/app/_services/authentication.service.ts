import { Injectable } from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import 'rxjs/add/operator/map'
import {RequestOptions} from "http";

@Injectable()
export class AuthenticationService {
  constructor(private http: Http) { }

  login(username: string, password: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    let options = {
      headers: headers
    };

    return this.http.post("https://epic-app-backend.herokuapp.com/login", JSON.stringify({username: username.trim(), password: password.trim()}), options)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        console.log(response);
        let message = response.json();
        //console.log(message);
        localStorage.removeItem('loginMessage');
        if(message && message.status.indexOf("Error") == -1 && message.status.indexOf("Success: Login") > -1){
          localStorage.setItem('token', message.body);
          localStorage.removeItem('loginMessage');
          localStorage.setItem('username', username);
        }else{
          localStorage.setItem('loginMessage', message.body);
        }
      });
  }

  logout(token: string) {
    localStorage.removeItem('token');
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let options = {
      headers: headers
    };

    return this.http.post("https://epic-app-backend.herokuapp.com/logout", JSON.stringify({token: token}), options)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        //console.log(response);
        let message = response.json();
        //console.log(message);
        localStorage.removeItem('loginMessage');
        if(message && message.status.indexOf("Error") == -1 && message.status.indexOf("Success: Logout") > -1){
          localStorage.removeItem('token');
          localStorage.removeItem('username');
          localStorage.setItem('loginMessage', message.body);
        }
      });

  }

}
