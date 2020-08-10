import { Component, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model';
import {RecipeService} from "../recipe.service";
import {ActivatedRoute, Params, Route, Router, Routes} from "@angular/router";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  // @Input() recipe: Recipe;
  recipe: Recipe;
  id: number;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {

    // const id = this.activatedRoute.snapshot.params['id'];

    this.activatedRoute.params
      .subscribe(
        (params: Params) => {
          if( params['id'] ){
            this.id = +params['id'];
            this.recipe = this.recipeService.getRecipe(this.id);
          }
      }
    );

  }

  onAddToShoppingList(){
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
     this.router.navigate(['edit'], {relativeTo: this.activatedRoute})
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.activatedRoute});
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

}
