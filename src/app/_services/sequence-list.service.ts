import {Injectable} from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import {map} from "rxjs/operator/map";

@Injectable()
export class SequenceListService {

  constructor(private http: Http) {
  }

  getPageFromServer(token: string, page: number, itemsPerPage: number, filter: string, orderBy: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = {
      headers: headers
    };
    let url:string = "https://epic-app-backend.herokuapp.com/sequences/page?";
    let parameters:string = 'token=' + token + '&'+ 'page=' + page + '&' + 'itemsPerPage=' + itemsPerPage + '&'+ 'filter=' + filter + '&orderBy=' + orderBy;
    console.log(url + parameters);
    return this.http.get(url + parameters, options)
      .map(res => res.json());
  }

}
