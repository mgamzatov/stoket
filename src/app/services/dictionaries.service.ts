import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers, Response} from "@angular/http";
import {Observable} from "rxjs";
import {Type} from "../models/Type";

@Injectable()
export class DictionariesService {

  constructor(private http: Http) { }

  getTypes() : Observable<Type[]> {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: myHeaders });

    return this.http.get('dictionaries/types', options)
      .map((resp:Response)=>resp.json())
      .catch((error:any)=>Observable.throw(error));
  }

  getBrands() : Observable<string[]> {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: myHeaders });

    return this.http.get('dictionaries/brands', options)
      .map((resp:Response)=>resp.json())
      .catch((error:any)=>Observable.throw(error));
  }

}
