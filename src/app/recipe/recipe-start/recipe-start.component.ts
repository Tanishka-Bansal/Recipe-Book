import { Component , DoCheck} from '@angular/core';

import { Recipe } from '../recipe.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';

@Component({
	selector: 'app-recipe-start',
	templateUrl:'./recipe-start.component.html'
})		

export class RecipeStartComponent implements DoCheck{
	recipe:Recipe[];

	constructor(private store:Store<fromApp.AppState>){
	}

	ngDoCheck(){
		this.store.select('recipe').subscribe((data)=>{this.recipe=data.recipes;});	
	}

}