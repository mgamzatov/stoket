"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var products_service_1 = require("../../services/products.service");
var FilterParametrs_1 = require("../../models/FilterParametrs");
var MainComponent = (function () {
    function MainComponent(observableMedia, productsService, filtersService) {
        this.observableMedia = observableMedia;
        this.productsService = productsService;
        this.filtersService = filtersService;
        this.cols = rxjs_1.Observable.of(3);
        this.limit = 30;
        this.offset = 0;
    }
    MainComponent.prototype.ngOnInit = function () {
        this.processRowCols();
        this.getProducts(new FilterParametrs_1.FilterParameters({ priceMin: 100 }));
        this.filtersService.action.subscribe(function (value) { return console.log('Received new subject value:', value); });
    };
    MainComponent.prototype.onScroll = function () {
        var _this = this;
        this.offset += this.limit;
        this.productsService.getProducts(this.limit, this.offset).subscribe(function (data) {
            _this.products = _this.products.concat(data);
        });
        console.log('scrolled!!');
    };
    MainComponent.prototype.getProducts = function (params) {
        var _this = this;
        if (params === void 0) { params = null; }
        this.productsService.getProducts(this.limit, this.offset, params).subscribe(function (data) {
            _this.products = data;
        });
    };
    MainComponent.prototype.processRowCols = function () {
        var _this = this;
        // set cols
        if (this.observableMedia.isActive("xs")) {
            this.cols = rxjs_1.Observable.of(1);
        }
        else if (this.observableMedia.isActive("sm")) {
            this.cols = rxjs_1.Observable.of(2);
        }
        else if (this.observableMedia.isActive("md")) {
            this.cols = rxjs_1.Observable.of(3);
        }
        else if (this.observableMedia.isActive("lg")) {
            this.cols = rxjs_1.Observable.of(4);
        }
        else if (this.observableMedia.isActive("xl")) {
            this.cols = rxjs_1.Observable.of(6);
        }
        else {
            this.cols = rxjs_1.Observable.of(7);
        }
        // observe changes
        this.watcher = this.observableMedia.asObservable()
            .subscribe(function (change) {
            switch (change.mqAlias) {
                case "xs":
                    return _this.cols = rxjs_1.Observable.of(1);
                case "sm":
                    return _this.cols = rxjs_1.Observable.of(2);
                case "md":
                    return _this.cols = rxjs_1.Observable.of(3);
                case "lg":
                    return _this.cols = rxjs_1.Observable.of(4);
                case "xl":
                    return _this.cols = rxjs_1.Observable.of(6);
                default:
                    return _this.cols = rxjs_1.Observable.of(7);
            }
        });
    };
    MainComponent.prototype.ngOnDestroy = function () {
        this.watcher.unsubscribe();
        this.filtersService.action.unsubscribe();
    };
    MainComponent = __decorate([
        core_1.Component({
            selector: 'app-main',
            templateUrl: './main.component.html',
            styleUrls: ['./main.component.css'],
            providers: [products_service_1.ProductsService]
        })
    ], MainComponent);
    return MainComponent;
}());
exports.MainComponent = MainComponent;
//# sourceMappingURL=main.component.js.map