import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {ProductsService} from "../../services/products.service";
import {Product} from "../../models/Product";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ProductsService]
})
export class ProductComponent implements OnInit, OnDestroy {

  private id: number;
  private subscription: Subscription;
  product: Product;

  constructor(private activateRoute: ActivatedRoute, private productsService: ProductsService, private router: Router) {}

  ngOnInit() {
    this.subscription = this.activateRoute.params.subscribe(params=> {
      this.id = params['id'];
      this.productsService.getProduct(this.id).subscribe(data => {
        this.product = data;
      })
    });
  }

  showShop(id: number) {
    this.router.navigate([{ outlets: {'shop': ['shop', id], 'product': null } }]);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
