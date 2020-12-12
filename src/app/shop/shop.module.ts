import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ShopEditComponent } from './shop-edit/shop-edit.component';
import { ShopComponent } from './shop.component';

@NgModule({
    declarations:[  
        ShopEditComponent,
        ShopComponent
    ],
    imports:[
        FormsModule ,
        CommonModule,
        RouterModule.forChild(
           [ {path:'', component:ShopComponent} ]
        )
    ]
})

export class ShopModule{}