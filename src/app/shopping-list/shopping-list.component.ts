import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";

import { Ingredient } from '../shared/ingredient.model';
import {ShoppingListService} from "./shopping-list.service";
import {LoggingService} from "../logging.service";


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[];
  private igChangeSub: Subscription;

  constructor(
    private slService: ShoppingListService,
    private logginService: LoggingService

  ) { }

  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    //we have subscribe the ingredients change
    this.igChangeSub = this.slService.ingredientsChanged
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      );
    this.logginService.printLog('Hello from ShoppingListComponent ngOnInit');
  }

  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }

  onEditItem(index: number){
    this.slService.startedEditing.next(index);
  }

  // onIngredientAdded(ingredient: Ingredient) {
  //   this.slService.addIngredient(ingredient);
  // }
}
