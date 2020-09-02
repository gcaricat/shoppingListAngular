import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {Store} from "@ngrx/store";

import { Ingredient } from '../shared/ingredient.model';
// import {ShoppingListService} from "./_shopping-list.service";
import {LoggingService} from "../logging.service";
import * as ShoppingListActions from './store/shopping-list-actions';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  // ingredients: Ingredient[];
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  private igChangeSub: Subscription;

  constructor(
    // private slService: ShoppingListService,
    private logginService: LoggingService,
    //store with shoppinList area and in the shopping list area, our data will
    //be stored in an object with ingredient key
    // private store: Store<{shoppingList: {ingredients: Ingredient[]} }>
    private store: Store<fromApp.AppState>

  ) { }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
    // this.store.select('shoppingList').subscribe();  //also we can use subscribe but is raccomended the one row up

    // old
    //this.ingredients = this.slService.getIngredients();
    //we have subscribe the ingredients change
    // this.igChangeSub = this.slService.ingredientsChanged
    //   .subscribe(
    //     (ingredients: Ingredient[]) => {
    //       this.ingredients = ingredients;
    //     }
    //   );

    this.logginService.printLog('Hello from ShoppingListComponent ngOnInit!');
  }

  ngOnDestroy(): void {
   // this.igChangeSub.unsubscribe();
  }

  onEditItem(index: number){
     // this.slService.startedEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

  // onIngredientAdded(ingredient: Ingredient) {
  //   this.slService.addIngredient(ingredient);
  // }
}
