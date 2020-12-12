
import { act } from '@ngrx/effects';
import { Ingredient } from '../../shared/ingredient.model';
import * as ShopActionObject from './shop.action';

export interface State{
    ingredients:Ingredient[];
    editedIngredient:Ingredient;
    editedIndex:number;
}

export interface AppState{
    shoppingList:State;
}

const initialState:State={
    ingredients:[new Ingredient('Bread',2),
                new Ingredient('Flour',3)],
    editedIngredient:null,
    editedIndex:-1
}

export function ShopReducer(
    state:State=initialState,
    action:ShopActionObject.Actions
    ){

    switch(action.type)
    {
        case ShopActionObject.ADD_INGREDIENT:
            return {...state, ingredients:[...state.ingredients,action.data]}; 

        
        case ShopActionObject.ADD_INGREDIENTS:
            return {...state, ingredients:[...state.ingredients,...action.data]}; 

        
        case ShopActionObject.DELETE_INGREDIENT:
            let data=[...state.ingredients];
            data.splice(state.editedIndex,1);
            return {...state, ingredients:data ,  editedIngredient:null, editedIndex:-1};    

        
            
        case ShopActionObject.UPDATE_INGREDIENT:
            let updatedData=[...state.ingredients];
            updatedData[state.editedIndex]=action.data;
            return {...state, ingredients:updatedData , editedIngredient:null,editedIndex:-1};


        case ShopActionObject.START_EDIT:
            return {...state,editedIngredient:{...state.ingredients[action.index]},editedIndex:action.index}

        case ShopActionObject.STOP_EDIT:
            return {...state,editedIngredient:null,editedIndex:-1}    

        default: return {...state,ingredients:[...state.ingredients]};   
    }
}