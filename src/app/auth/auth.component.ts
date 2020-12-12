import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { PlaceholderDirective } from '../shared/placeholder.directive';
import * as AuthActions from './store/auth.action';
import * as fromApp from '../store/app.reducer';

@Component({
    selector:'auth-component',
    templateUrl:'./auth.component.html'
})

export class AuthComponent implements OnInit{
    isSigninMode=true;
    isLoading=false;
    error:string=null;
    sub:Subscription;
    @ViewChild(PlaceholderDirective, { static: false }) alertRef:PlaceholderDirective;
    constructor(
        private store:Store<fromApp.AppState>
        ){}

    ngOnInit(){
        this.sub=this.store.select('auth').subscribe(data=>{
            this.isLoading=data.loading;
            console.log(data.loading);
            this.error=data.authError ;
            console.log(this.error);  
        });
    }    

    onSwitch(){
        this.isSigninMode=!this.isSigninMode;
    }

    onSubmit(form: NgForm){
        if(!form.valid)
            return;
        if(!this.isSigninMode)
            this.store.dispatch(new AuthActions.signUpStart({email:form.value.email,password:form.value.password}));
        else
            this.store.dispatch(new AuthActions.loginStart({email:form.value.email,password:form.value.password}));
        
        form.reset();
    }

    ngDestroy(){
        this.sub.unsubscribe();
    }

}