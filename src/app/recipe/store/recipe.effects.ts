import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { switchMap , map, withLatestFrom } from 'rxjs/operators';

import * as RecipeActions from './recipe.action';
import * as fromApp from '../../store/app.reducer';
import { Recipe } from '../recipe.model';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { RecipeItemsComponent } from '../recipe-list/recipe-items/recipe-items.component';

@Injectable()

export class RecipeEffects{

    constructor(private actions:Actions, private client:HttpClient , private store:Store<fromApp.AppState>){}

    @Effect()
    fetchRecipe=this.actions.pipe(
        ofType(RecipeActions.FETCH_RECIPE),
        switchMap(()=>{
            return this.client.get<Recipe[]>('https://recipe-book-a8a32.firebaseio.com/recipes.json');
        }),    
        map((recipes)=>{
            for(let recipe in recipes )
            { if(recipes[recipe].ingredients==null)
                recipes[recipe].ingredients=[]}
            return recipes;}
        ),
        map(data=>{ return(new RecipeActions.addRecipes(data));})
    );

    @Effect({dispatch: false})
    postRecipe=this.actions.pipe(
        ofType(RecipeActions.POST_RECIPE),
        withLatestFrom( this.store.select('recipe')),
        switchMap(([actionData,recipeState])=>{
            console.log('POsted');
             return this.client.put('https://recipe-book-a8a32.firebaseio.com/recipes.json',recipeState.recipes);
        })
    )
}   