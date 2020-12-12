import { ActionReducerMap } from '@ngrx/store';

import * as fromShoppingList from '../shop/store/shop.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromRecipe from '../recipe/store/recipe.reducer';

export interface AppState{
    shoppingList:fromShoppingList.State;
    auth: fromAuth.State;
    recipe:fromRecipe.State;
}

export const actionMap:ActionReducerMap<AppState>={
    shoppingList:fromShoppingList.ShopReducer ,
    auth:fromAuth.AuthReducer,
    recipe:fromRecipe.RecipeReducer
}