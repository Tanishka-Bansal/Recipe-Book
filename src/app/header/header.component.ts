import { Component, OnInit , OnDestroy} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.action';
import * as RecipeActions from '../recipe/store/recipe.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit , OnDestroy{
  
  isAuthenticated:boolean=false;
  authSubscription:Subscription;

  constructor(private store:Store<fromApp.AppState>, private router:Router){ }

  ngOnInit(){
    this.authSubscription = this.store.select('auth').pipe(map(data=>data.user)).subscribe(data=>{
      this.isAuthenticated= !data? false : true;
    });
  }

  saveIt(){
    this.store.dispatch(new RecipeActions.postRecipe());
  }

  fetchIt(){
    this.store.dispatch(new RecipeActions.fetchRecipe());
  }  

  logOut(){
    this.store.dispatch(new AuthActions.logout());  
  }

  ngOnDestroy(){
    this.authSubscription.unsubscribe();
  }
}
