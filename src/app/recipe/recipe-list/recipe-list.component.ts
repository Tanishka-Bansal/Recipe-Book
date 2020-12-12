import { Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Recipe } from '../recipe.model';
import * as fromApp from '../../store/app.reducer';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})

export class RecipeListComponent implements OnInit{
  recipes:Recipe[];
	constructor(private store:Store<fromApp.AppState>){}	

  ngOnInit(){
    this.store.select('recipe').subscribe(data=>{this.recipes=data.recipes;});

  }
}
