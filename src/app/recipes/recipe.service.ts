import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from "./recipe.module";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  // recipeSelected = new EventEmitter<Recipe>();
  // recipeSelected = new Subject<Recipe>();

  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //
  //   new Recipe(
  //         'Spiedini di carne',
  //     'Magnifici spiedini di carne',
  //     'https://www.nps.gov/subjects/camping/images/recipe_1.jpg?maxwidth=1200&maxheight=1200&autorotate=false',
  //     [
  //       new Ingredient('Carne', 5),
  //       new Ingredient('Verdure', 10)
  //       ]
  //   ),
  //
  //   new Recipe(
  //         'Big Fat Burger',
  //     'Cos\'altro cerchi?',
  //     'https://www.winiary.pl/image.ashx/hamburger.jpg?fileID=231859&width=800&height=1400&frame=False&bg=0&resize=1&crop=0&hRefill=0&vRefill=0&quality=84',
  //     [
  //       new Ingredient('Panino', 1),
  //       new Ingredient('Carne di manzo', 1),
  //       new Ingredient('Formaggio', 2),
  //     ]
  //   ),
  //
  // ];

  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService) { }

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes(){
    return this.recipes.slice(); //return the exact copy of the array file in this manner not modify the original array
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.slService.addIngredients(ingredients);
  }

  getRecipe(index: number){
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index:number){
    this.recipes.splice(index,1);
    console.log(this.recipes);
    this.recipesChanged.next(this.recipes.slice());
  }




}
