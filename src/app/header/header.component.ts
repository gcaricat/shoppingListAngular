import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import  {DataStorageService} from '../shared/data-storage.service';
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {map} from "rxjs/operators";

import * as fromApp from '../store/app.reducer';
import * as AuthAction from '../auth/store/auth.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{
  // @Output() featureSelected = new EventEmitter<string>();

  // onSelect(feature: string) {
  //   this.featureSelected.emit(feature);
  // }
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {
  }

  ngOnInit() {
    // this.userSub = this.authService.user.subscribe(
    this.userSub = this.store.select('auth').pipe(
      map(authState => authState.user)
    ).subscribe(
      user => {
        // this.isAuthenticated = !user ? false : true;
        this.isAuthenticated = !!user;
        console.log("!user", !user);
        console.log("!!user", !!user);
      });
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData(){
    this.dataStorageService.fetchRecipes()
      .subscribe();
  }

  onLogout(){
    // this.authService.logout();
    this.store.dispatch(new AuthAction.Logout());
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
