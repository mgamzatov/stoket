import { Component, OnInit } from '@angular/core';
import {ShopsService} from "../../services/shops.service";
import {Shop} from "../../models/Shop";
import {Router} from "@angular/router";

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css'],
  providers: [ShopsService]
})
export class ShopsComponent implements OnInit {

  shops: Array<Shop>;

  constructor(private shopsService: ShopsService, private router: Router) { }

  showShop(id: number) {
    this.router.navigate([{ outlets: {'shop': ['shop', id], 'product': null } }]);
  }

  ngOnInit() {
   this.shopsService.getShops().subscribe(data => {
     this.shops = data;
   })
  }
}
