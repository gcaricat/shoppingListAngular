import { Component, OnInit } from '@angular/core';

import { Recipe } from './recipe.model';
import {RecipeService} from "./recipe.service";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  // togliamo da qui RecipeService e lo mettiamo in app.module
  //perchè l'instanza creata rimane solo nell'area del recipes e basta
  // providers: [RecipeService]
})
export class RecipesComponent implements OnInit {
  // selectedRecipe: Recipe;

  // constructor(private recipeService: RecipeService) { }
  constructor() { }

  ngOnInit() {
    // this.recipeService.recipeSelected
    //   .subscribe(
    //     (recipe: Recipe) => {
    //       console.log("qui", this);
    //       this.selectedRecipe = recipe;
    //     }
    //   );
  }

}
