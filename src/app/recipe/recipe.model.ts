import { Ingredient } from '../shared/ingredient.model';

export class Recipe{
	
	desc:string;
	imagePath:string;
	ingredients:Ingredient[];
	name:string;

	constructor(name:string, desc:string, path:string , ingredients:Ingredient[])
	{
	
		this.desc=desc;
		this.imagePath=path;
		this.ingredients=ingredients;
		this.name=name;
	}	
}