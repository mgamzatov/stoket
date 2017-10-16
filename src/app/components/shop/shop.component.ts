import {Component, OnInit, OnDestroy} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {FilterParameters} from "../../models/FilterParametrs";
import {ProductsService} from "../../services/products.service";
import {ObservableMedia} from "@angular/flex-layout";
import {Product} from "../../models/Product";
import {ActivatedRoute, Router} from "@angular/router";
import {Shop} from "../../models/Shop";
import {ShopsService} from "../../services/shops.service";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  providers: [ProductsService, ShopsService]
})
export class ShopComponent implements OnInit, OnDestroy {

  private noMoreData: boolean = false;
  private shopId: number = -1;
  private subscription: Subscription;
  public cols: Observable<number> = Observable.of(3);
  watcher: Subscription;
  products: Array<Product>;
  shop: Shop;
  limit: number = 30;
  offset: number = 0;
  showSpinner: boolean = true;
  mainGrid;

  constructor(private observableMedia: ObservableMedia, private productsService: ProductsService, private shopsService:ShopsService,
              private activateRoute: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.mainGrid = document.getElementById("shopGrid");
    this.processRowCols();
    this.subscription = this.activateRoute.params.subscribe(params=> {
      this.shopId = params['id'];
      this.shopsService.getShop(this.shopId).subscribe((data)=> {
        this.shop = data;
      });
      this.getProducts(this.getFilterParams());
    });
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

  showProduct(id: number) {
    this.router.navigate([{ outlets: {'product': ['product', id]} }]);
  }

  private getFilterParams(): FilterParameters {
    return new FilterParameters({
      shopId: this.shopId
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
    this.subscription.unsubscribe();
  }

}
