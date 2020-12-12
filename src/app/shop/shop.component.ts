import { Component, DoCheck, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Ingredient } from '../shared/ingredient.model'

import { Observable, Subscription} from 'rxjs';
import * as ShopActions from './store/shop.action';
import * as fromApp from '../store/app.reducer';

@Component({
	selector:'app-shop',
	templateUrl:'./shop.component.html'
})

export class ShopComponent implements DoCheck{
	ingredients:Observable<{ingredients:Ingredient[]}>;
	
	constructor(private Store:Store<fromApp.AppState>){}	

	ngDoCheck(){
		this.ingredients=this.Store.select('shoppingList');		
	}


	selectIt(ingredient,index){
		this.Store.dispatch(new ShopActions.StartEdit(index));
	}
}