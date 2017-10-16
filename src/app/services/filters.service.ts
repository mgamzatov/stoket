import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {FilterAction} from "../models/FilterAction";

@Injectable()
export class FiltersService {

  public brandFilter: string;
  public descriptionFilter: string;
  public priceMinFilter: number;
  public priceMaxFilter: number;
  public shopIdFilter: number;
  public genderFilter: number;
  public typeIdFilter: number;

  public action = new Subject<FilterAction>()
}
