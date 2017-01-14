import {Injectable} from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import {map} from "rxjs/operator/map";

@Injectable()
export class SequenceListService {

  constructor(private http: Http) {
  }

  getPageFromServer(token: string, page: number, itemsPerPage: number, filter: string, orderBy: string) {
    if(filter.length < 3) filter = '';
    let url:string = "https://epic-app-backend.herokuapp.com/sequences/page?";
    let parameters:string = 'token=' + token + '&'+ 'page=' + page + '&' + 'itemsPerPage=' + itemsPerPage + '&'+ 'filter=' + filter + '&orderBy=' + orderBy;
    console.log(url + parameters);
    return this.http.get(url + parameters)
      .map(res => res.json());
  }

}
