import { Component, OnInit , DoCheck} from '@angular/core';
import { ActivatedRoute , Params , Router } from '@angular/router';
import { FormGroup , FormControl , Validators , FormArray} from '@angular/forms';
import { Store } from '@ngrx/store';

import { Recipe } from '../recipe.model';
import * as RecipeActions from '../store/recipe.action';
import * as fromApp from  '../../store/app.reducer';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})

export class RecipeEditComponent implements  OnInit , DoCheck{

  id:number;		
  editMode:boolean=false;
  form:FormGroup;
  selectedRecipe:Recipe;

  constructor(private route:ActivatedRoute,
			  private router:Router,
			  private store:Store<fromApp.AppState>) { }

  ngDoCheck(){
	this.store.dispatch(new RecipeActions.changeMode(this.editMode));
	// this.recipe.id=this.id;
  }	

  ngOnInit(){
  	this.route.params.subscribe(
  		(params:Params)=>{
  			this.id=+params['id'];
  			this.editMode= params['id']!=null;
  			this.inItForm();
  		});
 }

  private inItForm(){
  	let name="";
  	let imagePath="";
  	let desc="";
  	let ingredients=new FormArray([]);

  	if(this.editMode)
	{
		this.store.select('recipe').subscribe(data=>this.selectedRecipe=data.selectedRecipe);
		name=this.selectedRecipe.name;
		imagePath=this.selectedRecipe.imagePath;
		desc=this.selectedRecipe.desc;
		
		if(this.selectedRecipe.ingredients)
		{
			for(let ingredient of this.selectedRecipe.ingredients)
			{
				ingredients.push(
					new FormGroup({
						'name': new FormControl(ingredient.name, Validators.required),
						'amount': new FormControl(ingredient.amount,
								[ Validators.required , Validators.pattern(/^[1-9]+[0-9]*$/)])
					})
				);
				console.log('changed to before');
			}
		}
	}

 	this.form=new FormGroup({
		'name': new FormControl(name , Validators.required),
		'desc': new FormControl(desc , Validators.required),
		'imagePath': new FormControl(imagePath ,Validators.required),
		'ingredients': ingredients
  	});
 
  }

  addIngredient(){
  	(<FormArray>this.form.get('ingredients')).push(
  		new FormGroup({
  			'name': new FormControl(null, Validators.required),
  			'amount': new FormControl(null,[ Validators.required , Validators.pattern(/^[1-9]+[0-9]*$/)])
	}));	
  }

  deleteIngredient(index:number){
  	(<FormArray>this.form.get('ingredients')).removeAt(index);
  }	

  onSubmit(){  
  	if(this.editMode)
		  this.store.dispatch(new RecipeActions.updateRecipe({id:this.id,value:this.form.value}));
  	else
		  this.store.dispatch(new RecipeActions.addRecipe(this.form.value));
	this.cancelIt();
  }

  cancelIt(){
  	this.form.reset();
  	this.router.navigate(['..'],{relativeTo:this.route});
  }

}
