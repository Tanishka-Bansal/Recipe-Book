import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import * as RecipeActions from './store/recipe.action';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  constructor(public store:Store<fromApp.AppState>) {}

  ngOnInit(){
    this.store.select('recipe').subscribe(data=>
      {if(!data.recipes)
        this.store.dispatch(new RecipeActions.fetchRecipe());});
   
  }

}
