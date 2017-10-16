import { Injectable } from '@angular/core';
import {Http, Response, RequestOptions, URLSearchParams, Headers} from "@angular/http";
import {Observable} from "rxjs";
import {Product} from "../models/Product";
import {FilterParameters} from "../models/FilterParametrs";
import {isUndefined} from "util";

@Injectable()
export class ProductsService {

  constructor(private http: Http) { }

  getProducts(limit:number = null, offset:number = null, filterParams:FilterParameters = null) : Observable<Product[]>{
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    let myParams = new URLSearchParams();
    if(limit!==null) {
      myParams.append('limit', limit.toString());
    }
    if(offset!==null) {
      myParams.append('offset', offset.toString());
    }
    if(filterParams!==null) {
      Object.keys(filterParams).forEach(v => {
        let value = filterParams[v];
        console.log(v, value);
        if(value!==null && !isUndefined(value)) {
          myParams.append(v, value.toString());
        }
      })
    }
    let options = new RequestOptions({ headers: myHeaders, params: myParams });

    return this.http.get('products', options)
      .map((resp:Response)=>resp.json())
      .catch((error:any)=>Observable.throw(error));
  }

  getProduct(id: number) : Observable<Product> {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: myHeaders });
    return this.http.get('products/' + id, options)
      .map((resp:Response)=>resp.json())
      .catch((error:any)=>Observable.throw(error));
  }
}
