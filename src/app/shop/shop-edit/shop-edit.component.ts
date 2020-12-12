import { Component, OnInit , OnDestroy , OnChanges, DoCheck, AfterContentChecked , ViewChild , Output , EventEmitter } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShopActions from '../store/shop.action';
import * as fromApp from '../../store/app.reducer';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shop-edit',
  templateUrl: './shop-edit.component.html',
  styleUrls: ['./shop-edit.component.css']
})
export class ShopEditComponent implements AfterContentChecked , OnInit , OnDestroy {
 
  @ViewChild('f') form:NgForm;	
  editMode:boolean;
  subscription:Subscription;

  constructor( private store:Store<fromApp.AppState>,
    private s:Store){}

  ngAfterContentChecked(){
  	}

  ngOnInit(){
    this.subscription=this.store.select('shoppingList').subscribe(stateData=>{
      if(stateData.editedIndex>-1)
       {
          this.editMode=true;
          this.form.setValue({
            name: stateData.editedIngredient.name,
            amount: stateData.editedIngredient.amount
          })  ;
        }
        else
          this.editMode=false;
    });
  }

  
  
 onSubmit(form:NgForm)
  {
    const newItem=new Ingredient(form.value.name,form.value.amount);
  if(this.editMode)
  {
      this.store.dispatch(new ShopActions.UpdateIngredient(newItem));
      this.editMode=false;
    }	
	else	
    this.store.dispatch(new ShopActions.AddIngredient(newItem));
 this.clearIt();
}	

  clearIt(){
  	this.form.reset();
    this.editMode=false;
    this.store.dispatch(new ShopActions.StopEdit());
  }
  
  deleteIt(){
    this.store.dispatch(new ShopActions.DeleteIngredient());
  	this.clearIt();
  }
  
  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.store.dispatch(new ShopActions.DeleteIngredient());
  
  }
}
