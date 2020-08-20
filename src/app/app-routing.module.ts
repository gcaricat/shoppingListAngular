import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";


// @ts-ignore
const appRoutes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  //loadChildren is special property in a root config which angular understands
  //as police only load the code content
  {path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule'},
  {path: 'shopping-list', loadChildren: './shopping-list/shopping-list.module#ShoppingListModule'},
  {path: 'auth', loadChildren: './auth/auth.module#AuthModule'}
  // {
  //   path: 'recipes',
  //   loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule)
  // }

];

@NgModule({
  declarations: [],
  imports: [
    //if the connection is slowly preoladStrategy load the modules
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]

})
export class AppRoutingModule { }
