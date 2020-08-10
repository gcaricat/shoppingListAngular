import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";

import {Recipe} from "../recipes/recipe.model";
import {RecipeService} from "../recipes/recipe.service";
import {pipe} from "rxjs";
import {exhaustMap, map, take, tap} from "rxjs/operators";
import {AuthService} from "../auth/auth.service";
import {tokenize} from "@angular/compiler/src/ml_parser/lexer";

@Injectable({providedIn: 'root'})
export class DataStorageService {

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ){

  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    //.json is a firebase characteristic
    return this.http
      .put('https://ng-course-recipe-book-bfe64.firebaseio.com/recipes.json', recipes)
      .subscribe( response => {
        console.log(response);
      });
  }

  fetchRecipes() {
    //take indicate to RxJS that I only want to take one value from that observable
    // this.authService.user.pipe(take(1)).subscribe(user => {});
    //I use this because I would to return the get recipe and if it is in the subscribe up
    //there it's no work properly


        // .get<Recipe[]>('https://ng-course-recipe-book-bfe64.firebaseio.com/recipes.json?auth=' + user.token
        return this.http.get<Recipe[]>('https://ng-course-recipe-book-bfe64.firebaseio.com/recipes.json'
        ).pipe(
          map( recipes => {
            return recipes.map( recipe => {
              //...recipe return all recipe parameters
              return {
                ...recipe,
                ingredients: recipe.ingredients ? recipe.ingredients : []};
            });
          } ),
          tap( recipes => {
            this.recipeService.setRecipes(recipes);
          })
        )
  }
}


