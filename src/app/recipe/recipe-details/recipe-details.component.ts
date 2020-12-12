import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import { ActivatedRoute , Router , Params } from '@angular/router';
import * as fromApp from '../../store/app.reducer';
import * as ShopActions from '../../shop/store/shop.action';
import * as RecipeActions from '../store/recipe.action';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})

export class RecipeDetailsComponent implements OnInit {
 recipe:Recipe;
 ingredient:Ingredient[];
 id:number;  
constructor(
            private route: ActivatedRoute , private router:Router,
            private store:Store<fromApp.AppState> ){}	
	  

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
        this.id=+params['id'];
        this.store.dispatch(new RecipeActions.getRecipe(this.id));
        this.store.select('recipe').subscribe(data=>{this.recipe=data.selectedRecipe,
        this.ingredient=this.recipe.ingredients;});
    });
  }

  addInList(){
    this.store.dispatch(new ShopActions.AddIngredients(this.ingredient));
  }

  deleteIt(){
    this.store.dispatch(new RecipeActions.deleteRecipe(this.id));
    this.router.navigate(['..'],{relativeTo: this.route});
  }
}
