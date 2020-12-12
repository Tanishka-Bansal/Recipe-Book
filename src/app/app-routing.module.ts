import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
{path:'', redirectTo:'auth', pathMatch: 'full'},
{path:'recipe', loadChildren:()=>import('./recipe/recipe.module').then(m=>m.RecipeModule)},
{path:'shoppinglist', loadChildren:()=>import('./shop/shop.module').then(m=>m.ShopModule)},
{path:'auth',loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, initialNavigation: 'enabled' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
