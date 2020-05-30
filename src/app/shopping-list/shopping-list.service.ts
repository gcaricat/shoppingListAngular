import { Injectable } from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomates', 10),
  ];

  constructor() { }

  addIngredient(name: string, amount: number){
    this.ingredients.push(
      new Ingredient(name, amount)
    );
  }
  removeIngredient(id){
    this.ingredients.splice(id, 1);
  }
}
