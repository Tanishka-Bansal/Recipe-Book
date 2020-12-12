import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export const ADD_RECIPE='[Recipe] Add Recipe';
export const ADD_RECIPES='[Recipe] Fetch Recipes';
export const DELETE_RECIPE='[Recipe] Delete Recipe';
export const GET_RECIPE='[Recipe] Get Recipe';
export const UPDATE_RECIPE='[Recipe] Update Recipe';
export const CHANGE_MODE='[Recipe] Change Mode';
export const FETCH_RECIPE='[Recipe] Fetch Recipe';
export const POST_RECIPE='[Recipe] Post Recipe';

export class addRecipe implements Action{
    readonly type=ADD_RECIPE;
    constructor(public data:Recipe){}
}

export class addRecipes implements Action{
    readonly type=ADD_RECIPES;
    constructor(public data:Recipe[]){}
}

export class deleteRecipe implements Action{
    readonly type=DELETE_RECIPE;
    constructor(public index:number){}
}

export class getRecipe implements Action{
    readonly type=GET_RECIPE;
    constructor(public index:number){}
}

export class updateRecipe implements Action{
    readonly type=UPDATE_RECIPE;
    constructor(public data:{id:number, value:Recipe}){}
}

export class changeMode implements Action{
    readonly type=CHANGE_MODE;
    constructor(public data:boolean){}
}

export class fetchRecipe implements Action{
    readonly type=FETCH_RECIPE;
}

export class postRecipe implements Action{
    readonly type=POST_RECIPE;
}

export type ACTIONS= 
addRecipe | 
addRecipes | 
deleteRecipe | 
getRecipe | 
updateRecipe | 
changeMode | 
fetchRecipe;