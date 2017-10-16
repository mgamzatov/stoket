import {Component, OnInit, OnDestroy} from '@angular/core';
import {FiltersService} from "../../services/filters.service";
import {FilterAction} from "../../models/FilterAction";
import {ShopsService} from "../../services/shops.service";
import {Shop} from "../../models/Shop";
import {DictionariesService} from "../../services/dictionaries.service";
import {Type} from "../../models/Type";
import {FormControl} from "@angular/forms";
import {isUndefined} from "util";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
  providers: [ShopsService, DictionariesService]
})
export class FiltersComponent implements OnInit {
  brands: Array<string>;
  types: Array<Type>;
  shops: Array<Shop>;

  brandFilter: string;
  descriptionFilter: string;
  priceMinFilter: number;
  priceMaxFilter: number;
  shopIdFilter: number;
  genderFilter: number;
  typeIdFilter: number;

  brandCtrl: FormControl;
  filteredBrands: any;

  constructor(private filtersService: FiltersService, private shopsService: ShopsService,
              private dictionariesService: DictionariesService) { }

  ngOnInit() {
    this.brandCtrl = new FormControl();

    this.dictionariesService.getBrands().subscribe((data) =>{
      this.brands = data;
      this.filteredBrands = this.brandCtrl.valueChanges
        .startWith(null)
        .map(name => this.filterBrands(name));
    });
    this.shopsService.getShops().subscribe((data) =>{
      this.shops = data;
    });
    this.dictionariesService.getTypes().subscribe((data) =>{
      this.types = data;
    });

    this.brandFilter = this.filtersService.brandFilter;
    this.descriptionFilter = this.filtersService.descriptionFilter;
    this.priceMinFilter = this.filtersService.priceMinFilter;
    this.priceMaxFilter = this.filtersService.priceMaxFilter;
    this.shopIdFilter = this.filtersService.shopIdFilter;
    this.genderFilter = this.filtersService.genderFilter;
    this.typeIdFilter = this.filtersService.typeIdFilter;
  }

  filterBrands(val: string) {
    return val ? this.brands.filter(b => b.toLowerCase().indexOf(val.toLowerCase()) === 0)
      : this.brands;
  }

  onSubmit() {
    if(this.brandFilter!==null && !isUndefined(this.brandFilter) && this.brandFilter.trim() === "") {
      this.brandFilter = null;
    }
    this.filtersService.brandFilter = this.brandFilter;
    this.filtersService.descriptionFilter = this.descriptionFilter;
    this.filtersService.priceMinFilter = this.priceMinFilter;
    this.filtersService.priceMaxFilter = this.priceMaxFilter;
    this.filtersService.shopIdFilter = this.shopIdFilter;
    this.filtersService.genderFilter = this.genderFilter;
    this.filtersService.typeIdFilter = this.typeIdFilter;

    this.filtersService.action.next(FilterAction.Submit)
  }

  onResetAll() {
    this.filtersService.brandFilter = this.brandFilter = null;
    this.filtersService.descriptionFilter = this.descriptionFilter = null;
    this.filtersService.priceMinFilter = this.priceMinFilter = null;
    this.filtersService.priceMaxFilter = this.priceMaxFilter = null;
    this.filtersService.shopIdFilter = this.shopIdFilter = null;
    this.filtersService.genderFilter = this.genderFilter = null;
    this.filtersService.typeIdFilter = this.typeIdFilter = null;

    this.filtersService.action.next(FilterAction.ResetAll)
  }
}
