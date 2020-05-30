import { Injectable } from '@angular/core';
import {Recipe} from "./recipe.module";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe('A Test Recipy', 'This is a simple test', 'https://www.nps.gov/subjects/camping/images/recipe_1.jpg?maxwidth=1200&maxheight=1200&autorotate=false'),
    new Recipe('A Test Recipy', 'This is a simple test', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Recipe_logo.jpeg/480px-Recipe_logo.jpeg'),
    new Recipe('A Test Recipy', 'This is a simple test', 'https://www.nps.gov/subjects/camping/images/recipe_1.jpg?maxwidth=1200&maxheight=1200&autorotate=false'),
  ];

  constructor() { }

  getRecipes(){
    return this.recipes.slice(); //return the exact copy of the array file in this manner not modify the original array
  }



}
