import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {ReactiveFormsModule} from "@angular/forms";

import {RecipesComponent} from "./recipes.component";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {RecipeListComponent} from "./recipe-list/recipe-list.component";
import {RecipeDetailComponent} from "./recipe-detail/recipe-detail.component";
import {RecipeItemComponent} from "./recipe-list/recipe-item/recipe-item.component";
import {RecipeStartComponent} from "./recipe-start/recipe-start.component";
import {RecipesRoutingModule} from "./recipes.routing.module";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    RecipesComponent,
    RecipeEditComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipeEditComponent,
  ],
  imports: [
    RouterModule,
    // BrowserModule,
    ReactiveFormsModule,
    RecipesRoutingModule,
    SharedModule,
  ]
  // ,
  //We don't export because in recipe roting I call all of this component and
  // I no needs to export that
  // exports: [
  //   RecipesComponent,
  //   RecipeEditComponent,
  //   RecipeListComponent,
  //   RecipeDetailComponent,
  //   RecipeItemComponent,
  //   RecipeStartComponent,
  //   RecipeEditComponent,
  // ]
})
export class RecipesModule{}
