"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var rxjs_1 = require("rxjs");
var ProductsService = (function () {
    function ProductsService(http) {
        this.http = http;
    }
    ProductsService.prototype.getProducts = function (limit, offset, filterParams) {
        if (limit === void 0) { limit = null; }
        if (offset === void 0) { offset = null; }
        if (filterParams === void 0) { filterParams = null; }
        var myHeaders = new http_1.Headers();
        myHeaders.append('Content-Type', 'application/json');
        var myParams = new http_1.URLSearchParams();
        if (limit !== null) {
            myParams.append('limit', limit.toString());
        }
        if (offset !== null) {
            myParams.append('offset', offset.toString());
        }
        if (filterParams !== null) {
            Object.keys(filterParams).forEach(function (v) {
                var value = filterParams[v];
                console.log(v, value);
                if (value !== null) {
                    myParams.append(v, value.toString());
                }
            });
        }
        var options = new http_1.RequestOptions({ headers: myHeaders, params: myParams });
        return this.http.get('products', options)
            .map(function (resp) { return resp.json(); })["catch"](function (error) { return rxjs_1.Observable["throw"](error); });
    };
    ProductsService = __decorate([
        core_1.Injectable()
    ], ProductsService);
    return ProductsService;
}());
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map