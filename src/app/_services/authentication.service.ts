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

    let options = {
      headers: headers
    };

    return this.http.post("http://localhost:8080/login", JSON.stringify({username: username.trim(), password: password.trim()}), options)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        console.log(response);
        let message = response.json();
        console.log(message);
        localStorage.removeItem('loginMessage');
        if(message && message.status.indexOf("Error") == -1 && message.status.indexOf("Success: Login") > -1){
          localStorage.setItem('token', message.body);
        }else{
          localStorage.setItem('loginMessage', message.body);
        }
      });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
  }

}
