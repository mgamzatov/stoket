import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {ObservableMedia} from "@angular/flex-layout";
import {FiltersService} from "./services/filters.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  @ViewChild("sidenav") sidenav;
  public mode: Observable<string> = Observable.of("side");
  public opened: Observable<boolean> = Observable.of(true);
  activeNavItem: number = 0;
  watcher: Subscription;
  action: Subscription;
  hideList: boolean = false;
  hideShop: boolean = true;
  showFilters: boolean = true;
  private closeNav: boolean = false;

  constructor(private observableMedia: ObservableMedia, private filtersService: FiltersService, private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((e: any) => {
      const url = e.url;
      if(url === "/") {
        this.activeNavItem = 0;
        this.hideList = false;
        this.showFilters = true;
        this.hideShop = true;
      } else if(url === "/shops") {
        this.activeNavItem = 1;
        this.hideList = false;
        this.showFilters = false;
        this.hideShop = true;
      } else if(url.indexOf('shop/') >= 0 && url.indexOf('product/') < 0) {
        this.activeNavItem = -1;
        this.hideList = true;
        this.showFilters = false;
        this.hideShop = false;
      } else {
        this.activeNavItem = -1;
        this.showFilters = false;
        this.hideList = true;
        this.hideShop = true;
      }
    });

    console.log(this.router.url);

    // set mode
    if (this.observableMedia.isActive("xs")) {
      this.mode = Observable.of("push");
      this.opened = Observable.of(false);
      this.closeNav = true;
    } else if (this.observableMedia.isActive("sm")){
      this.mode = Observable.of("push");
      this.opened = Observable.of(false);
      this.closeNav = true;
    } else if (this.observableMedia.isActive("md") || this.observableMedia.isActive("lg") || this.observableMedia.isActive("xl")) {
      this.mode = Observable.of("side");
      this.opened = Observable.of(true);
      this.closeNav = false;
    }

    // observe changes
    this.watcher = this.observableMedia.asObservable()
      .subscribe(change => {
        switch (change.mqAlias) {
          case "xs":
            this.mode = Observable.of("push");
            this.opened = Observable.of(false);
            this.closeNav = true;
            return;
          case "sm":
            this.mode = Observable.of("push");
            this.opened = Observable.of(false);
            this.closeNav = true;
            return;
          case "md":
          case "lg":
          case "xl":
            this.mode = Observable.of("side");
            this.opened = Observable.of(true);
            this.closeNav = false;
            return;
        }
      });

    this.action = this.filtersService.action.subscribe(_ => {
      if(this.closeNav) {
        this.sidenav.close();
      }
    });
  }

  setActiveNavItem(i: number) {
    this.activeNavItem = i;
    if(this.closeNav) {
      this.sidenav.close();
    }
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
    this.action.unsubscribe();
  }
}
