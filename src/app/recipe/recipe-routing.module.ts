import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../auth/auth-guard.service';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeComponent } from './recipe.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';


const routes:Routes=[
    {path:'', component:RecipeComponent, canActivate:[AuthGuard], children:[
        {path:'', component:RecipeStartComponent},
        {path:'new', component:RecipeEditComponent},
        {path:':id', component:RecipeDetailsComponent},
        {path:':id/edit', component:RecipeEditComponent}
    ]}
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class RecipeRoutingModule{}