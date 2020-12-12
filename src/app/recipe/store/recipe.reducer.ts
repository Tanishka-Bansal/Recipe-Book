import { Recipe } from "../recipe.model";
import * as RecipeActions from './recipe.action';

export interface State{
    recipes:Recipe[],
    selectedRecipe:Recipe,
    editMode:boolean;
};

const initialState:State={
    recipes:null,
    selectedRecipe:null,
    editMode:false
}


export function RecipeReducer(state=initialState,action:RecipeActions.ACTIONS){

    switch(action.type){
        case RecipeActions.ADD_RECIPE:
            return {...state, recipes:[...state.recipes,action.data]};

        case RecipeActions.ADD_RECIPES:
            return {...state, recipes:[...action.data]};   
            
        case RecipeActions.DELETE_RECIPE:
            let recipes=[...state.recipes];
            recipes.splice(action.index,1);
            return {...state, recipes:recipes};    

        case RecipeActions.GET_RECIPE:
            return {...state, selectedRecipe: state.recipes[action.index]};    

        case RecipeActions.UPDATE_RECIPE:
            let newRecipes=[...state.recipes];
            newRecipes[action.data.id]=action.data.value;
            return {...state, recipes:newRecipes};    

        case RecipeActions.CHANGE_MODE:
            return {...state, editMode:action.data};    

        default: return state;    
    }
}