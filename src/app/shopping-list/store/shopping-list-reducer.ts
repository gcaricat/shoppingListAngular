import {Ingredient} from "../../shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list-actions";
import {Action} from "@ngrx/store";

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

// export interface AppState {
//   shoppingList: State;
// }

const initialState: State = {
    ingredients: [
      new Ingredient('Apples', 5),
      new Ingredient('Tomates', 10),
    ],
    editedIngredient: null,
    editedIngredientIndex: -1 //-1 is not
  };

  export function ShoppingListReducer(
    state: State = initialState,
    action: ShoppingListActions.ShoppingListActions
  )
  {
    switch (action.type) {
      case ShoppingListActions.ADD_INGREDIENT:
        //state.ingredients.push() never do this there
        return {
          ...state, //..pulls out these properties of this new object
          ingredients: [...state.ingredients, action.payload]
        };


      case  ShoppingListActions.ADD_INGREDIENTS:
        return {
          ...state,
          //with ...action.payload indicate I use an array of elements
          ingredients: [...state.ingredients, ...action.payload]
        }

      case ShoppingListActions.UPDATE_INGREDIENT:
        const ingredient = state.ingredients[state.editedIngredientIndex];
        const updatedIngredient = {
          ...ingredient,
          ...action.payload
        };
        const updatedIngredients = [...state.ingredients];
        updatedIngredients[state.editedIngredientIndex] = updatedIngredient;


        return {
          ...state,
          ingredients: updatedIngredients,
          editedIngredientIndex: -1,
          editedIngredient: null
        };

      case ShoppingListActions.DELETE_INGREDIENT:

        return {
          ...state,
          /**
           * Filter take an array run a certain function which you pass in as an argument
           * on every element in the array and if your function which you pass into filter
           * returns true then the element for which it's executing this will be part of the
           * ne array filter returns. Otherwise not
           */
          ...state,
          ingredients: state.ingredients.filter((ig, igIndex) => {
            return igIndex !== state.editedIngredientIndex;
          }),
          editedIngredientIndex: -1,
          editedIngredient: null
        };

      case ShoppingListActions.START_EDIT:
        return {
          ...state,
          editedIngredientIndex: action.payload,
          /**
           * This is not very good because this is a reference to the ingredient in my
           * ingredients array and objects and arrays are reference type and so if I now
           * pass this on the let's say the shopping-edit component and I start changing
           * properties on this ingredient.
           * I instead need to create a new object which can then be edited without problems
           * by using curl braces and the spread operator.
           */
          //editedIngredient: state.ingredients[action.payload]
          editedIngredient: { ...state.ingredients[action.payload] }
        };
      case ShoppingListActions.STOP_EDIT:
        return {
          ...state,
          editedIngredient: null,
          editedIngredientIndex: -1
        };

      default:
        return state;
    }
  }
