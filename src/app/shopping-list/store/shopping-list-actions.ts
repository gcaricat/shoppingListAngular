import {Action} from "@ngrx/store";
import {Ingredient} from "../../shared/ingredient.model";

// export  const ADD_INGREDIENT = 'ADD_INGREDIENT';
export  const ADD_INGREDIENT = '[Shopping List] Add Ingredient';
export  const ADD_INGREDIENTS = '[Shopping List] Add Ingredients';
export  const UPDATE_INGREDIENT = '[Shopping List] Update Ingredient';
export  const DELETE_INGREDIENT = '[Shopping List] Delete Ingredient';

export const START_EDIT = '[Shopping List] Start Edit';
export const STOP_EDIT = '[Shopping List] Stop Edit';

export  class AddIngredient implements Action{
  readonly type = ADD_INGREDIENT;
 // payload: Ingredient; //is NOT a name you have to use! The Action interface only forces you to add a "type" property

  constructor(public payload: Ingredient) {

  }
}

export class AddIngredients implements Action{
  readonly type = ADD_INGREDIENTS;

  constructor(public payload: Ingredient[]) {}
}

export class UpdateIngredient implements Action{
  readonly  type = UPDATE_INGREDIENT;

  constructor(public payload: Ingredient) {
  }
}

export class DeleteIngredient implements Action {
  readonly type = DELETE_INGREDIENT;
}

export class StartEdit implements Action{
  readonly type = START_EDIT;

  /**
   *
   * @param payload indicate the number of the ingredient I want to edit
   */
  constructor(public payload: number) {
  }

}


export class StopEdit implements Action{
  readonly type = STOP_EDIT;

}

/**
 * I create my own types which I can name shoppingListAction adn that simply
 * is a combination of all the types I want to include into shoppingListAction
 * So I create a union of the different action types I wont support in this part of
 * store
 */
export type  ShoppingListActions =
  | AddIngredient
  | AddIngredients
  | UpdateIngredient
  | DeleteIngredient
  | StartEdit
  | StopEdit;
