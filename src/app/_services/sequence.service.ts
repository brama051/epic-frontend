import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import {Sequence} from "../_models/sequence";

@Injectable()
export class SequenceService {

  constructor(private http: Http) {
  }

  getSequence(token: string, sequenceNumber: number) {
    let headers = new Headers();
    let options = {
      headers: headers
    };
    let parameters:string = 'token=' + token + '&' + 'sequenceNumber=' + sequenceNumber;
    let url:string = "https://epic-app-backend.herokuapp.com/sequence?";
    console.log("GET: " + url + parameters);
    return this.http.get(url + parameters, options)
      .map(res => res.json());
  }

  requestNewSequence(token: string){
    let parameters = 'token=' + token;
    let url = "https://epic-app-backend.herokuapp.com/sequence/request?";
    console.log("GET: " + url + parameters);
    return this.http.get(url + parameters)
      .map(res => res.json());
  }

  createNewSequence(token: string, sequence: Sequence){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = {
      headers: headers
    };

    return this.http.post("https://epic-app-backend.herokuapp.com/sequence/new?token=" + token , JSON.stringify(sequence), options)
      .map(res => res.json());
  }

}
