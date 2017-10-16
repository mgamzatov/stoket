import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import 'hammerjs';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
  MdCardModule, MdButtonModule, MdGridListModule, MdToolbarModule, MdSidenavModule,
  MdListModule, MdInputModule, MdSelectModule, MdProgressSpinnerModule, MdIconModule, MdAutocompleteModule
} from "@angular/material";
import {FlexLayoutModule} from "@angular/flex-layout";
import { FiltersComponent } from './components/filters/filters.component';
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {FiltersService} from "./services/filters.service";
import { ShopsComponent } from './components/shops/shops.component';
import {Routes, RouterModule} from "@angular/router";
import { ProductComponent } from './components/product/product.component';
import { ShopComponent } from './components/shop/shop.component';


const appRoutes: Routes =[
  { path: '', component: MainComponent},
  { path: 'shops', component: ShopsComponent},
  { path: 'shop/:id', component: ShopComponent, outlet: 'shop'},
  { path: 'product/:id', component: ProductComponent, outlet: 'product'}
  //{ path: '**', redirectTo: '/'}
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    FiltersComponent,
    ShopsComponent,
    ProductComponent,
    ShopComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    FormsModule,
    HttpModule,
    InfiniteScrollModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MdCardModule,
    MdButtonModule,
    MdGridListModule,
    MdToolbarModule,
    MdSidenavModule,
    MdListModule,
    MdInputModule,
    MdSelectModule,
    MdProgressSpinnerModule,
    MdIconModule,
    MdAutocompleteModule,
    ReactiveFormsModule
  ],
  providers: [FiltersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
