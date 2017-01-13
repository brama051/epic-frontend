import {Injectable} from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import {map} from "rxjs/operator/map";

@Injectable()
export class SequenceListService {

  constructor(private http: Http) {
  }

  getPageFromServer(token: string, page: number, itemsPerPage: number, filter: string,) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = {
      headers: headers
    };
    let parameters = 'token=' + token + '&'+ 'page=' + page + '&' + 'itemsPerPage=' + itemsPerPage + '&'+ 'filter=' + filter;
    return this.http.get("https://epic-app-backend.herokuapp.com/sequences/page?" + parameters, options)
      .map(res => res.json());
  }

}
