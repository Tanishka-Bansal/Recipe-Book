import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { RecipeRoutingModule } from './recipe-routing.module'; 

import { RecipeComponent } from './recipe.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeItemsComponent } from './recipe-list/recipe-items/recipe-items.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    RecipeComponent,
    RecipeListComponent,
    RecipeDetailsComponent,
    RecipeItemsComponent,
    RecipeStartComponent,
    RecipeEditComponent
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    RecipeRoutingModule,
    SharedModule
  ]
})
export class RecipeModule {}
