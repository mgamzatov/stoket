import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Shop} from "../models/Shop";
import {Observable} from "rxjs";

@Injectable()
export class ShopsService {

  constructor(private http: Http) { }

  getShops() : Observable<Shop[]> {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: myHeaders });

    return this.http.get('shops', options)
      .map((resp:Response)=>resp.json())
      .catch((error:any)=>Observable.throw(error));
  }

  getShop(id: number) : Observable<Shop> {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: myHeaders });

    return this.http.get('shops/' + id, options)
      .map((resp:Response)=>resp.json())
      .catch((error:any)=>Observable.throw(error));
  }

}
