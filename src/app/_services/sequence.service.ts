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
    let parameters = 'token=' + token + '&'+ 'sequenceNumber=' + sequenceNumber;
    return this.http.get("https://epic-app-backend.herokuapp.com/sequence?" + parameters, options)
      .map(res => res.json());
  }

  requestNewSequence(token: string){
    let headers = new Headers();
    let options = {
      headers: headers
    };
    let parameters = 'token=' + token;
    return this.http.get("https://epic-app-backend.herokuapp.com/sequence/request?" + parameters, options)
      .map(res => res.json());
  }

  createNewSequence(token: string, sequence: Sequence){

  }

}
