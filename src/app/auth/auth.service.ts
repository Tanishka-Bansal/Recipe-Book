import {Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.action';


@Injectable({ providedIn:'root'})

export class AuthService{
    timer:any;
    constructor( private store:Store<fromApp.AppState>){}

    setLogoutTimer(expirationTime:number){
        console.log(expirationTime);
        this.timer=setTimeout(()=>this.store.dispatch(new AuthActions.logout()),expirationTime);
    }

    clearLogoutTimer(){
        console.log('0');
       if(this.timer)
        clearTimeout(this.timer);
       this.timer=null; 
    }
}
