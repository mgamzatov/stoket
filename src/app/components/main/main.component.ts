import {Component, OnInit, OnDestroy} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {ObservableMedia} from "@angular/flex-layout";
import {ProductsService} from "../../services/products.service";
import {Product} from "../../models/Product";
import {FiltersService} from "../../services/filters.service";
import {FilterParameters} from "../../models/FilterParametrs";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [ProductsService]
})
export class MainComponent implements OnInit, OnDestroy {
  private noMoreData: boolean = false;
  public cols: Observable<number> = Observable.of(3);
  watcher: Subscription;
  action: Subscription;
  products: Array<Product>;
  limit: number = 30;
  offset: number = 0;
  showSpinner: boolean = true;
  mainGrid;

  constructor(private observableMedia: ObservableMedia, private productsService: ProductsService, private filtersService: FiltersService) {}

  ngOnInit() {
    this.mainGrid = document.getElementById("mainGrid");
    this.processRowCols();

    this.getProducts(this.getFilterParams());

    this.action = this.filtersService.action.subscribe(value => {
      console.log('Received new subject value:', value);
      this.noMoreData = false;
      this.offset = 0;
      this.getProducts(this.getFilterParams());
    })
  }

  onScroll () {
    if(!this.noMoreData) {
      this.showSpinner = true;
      this.offset += this.limit;
      this.productsService.getProducts(this.limit, this.offset, this.getFilterParams()).subscribe((data)=> {
        if(data.length === 0) {
          this.noMoreData = true
        } else {
          this.products = this.products.concat(data);
        }
        this.showSpinner = false
      });
    }
    console.log('scrolled!!')
  }

  private getFilterParams(): FilterParameters {
    return new FilterParameters({
      brand: this.filtersService.brandFilter, description: this.filtersService.descriptionFilter,
      priceMax: this.filtersService.priceMaxFilter, priceMin: this.filtersService.priceMinFilter,
      shopId: this.filtersService.shopIdFilter, typeId: this.filtersService.typeIdFilter,
      gender: this.filtersService.genderFilter
    });
  }

  private getProducts(params: FilterParameters = null) {
    this.showSpinner = true;
    this.productsService.getProducts(this.limit, this.offset, params).subscribe((data)=> {
      this.products = data;
      this.mainGrid.scrollTop = 0;
      this.showSpinner = false
    });
  }

  private processRowCols() {
    // set cols
    if (this.observableMedia.isActive("xs")) {
      this.cols = Observable.of(1);
    } else if (this.observableMedia.isActive("sm")) {
      this.cols = Observable.of(2);
    } else if (this.observableMedia.isActive("md")) {
      this.cols = Observable.of(3);
    } else if (this.observableMedia.isActive("lg")) {
      this.cols = Observable.of(4);
    } else if (this.observableMedia.isActive("xl")) {
      this.cols = Observable.of(4);
    } else {
      this.cols = Observable.of(7);
    }

    // observe changes
    this.watcher = this.observableMedia.asObservable()
      .subscribe(change => {
        switch (change.mqAlias) {
          case "xs":
            return this.cols = Observable.of(1);
          case "sm":
            return this.cols = Observable.of(2);
          case "md":
            return this.cols = Observable.of(3);
          case "lg":
            return this.cols = Observable.of(4);
          case "xl":
            return this.cols = Observable.of(4);
          default:
            return this.cols = Observable.of(7);
        }
      });
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
    this.action.unsubscribe();
  }

}
