import { Action } from "@ngrx/store";

import { Ingredient } from "../../shared/ingredient.model";


export const ADD_INGREDIENT='[Shop] Add Ingredient';
export const ADD_INGREDIENTS='[Shop] Add Ingredients';
export const DELETE_INGREDIENT='[Shop] Delete Ingredient';
export const UPDATE_INGREDIENT='[Shop] Update Ingredient';
export const START_EDIT='[Shop] Start Edit';
export const STOP_EDIT='[Shop] Stop Edit';

export class AddIngredient implements Action{
   readonly type=ADD_INGREDIENT;
  constructor(public data:Ingredient){}
}

export class AddIngredients implements Action{
  readonly type=ADD_INGREDIENTS;
 constructor(public data:Ingredient[]){}
}

export class DeleteIngredient implements Action{
  readonly type=DELETE_INGREDIENT;
}

export class UpdateIngredient implements Action{
  readonly type=UPDATE_INGREDIENT;
  constructor(public data:Ingredient){}
}

export class StartEdit implements Action{
  readonly type=START_EDIT;
  constructor(public index:number){}
} 

export class StopEdit implements Action{
  readonly type=STOP_EDIT;
}

export type Actions= AddIngredient | AddIngredients | DeleteIngredient | UpdateIngredient | StartEdit | StopEdit;