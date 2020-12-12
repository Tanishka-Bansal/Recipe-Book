import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import * as fromApp from '../store/app.reducer';
import { take , map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable({providedIn:'root'})

export class AuthGuard implements CanActivate{

    constructor(private store:Store<fromApp.AppState> , private router:Router){};

    canActivate(route:ActivatedRouteSnapshot , state:RouterStateSnapshot):
    boolean| 
    UrlTree|
    Promise<boolean | UrlTree>|
    Observable<boolean | UrlTree>{
       return this.store.select('auth').pipe(
           take(1),
           map(data=>{
               return data.user;
           }),
           map(data=>{
            let isAuth=!!data;
            if(isAuth)
                return true;
            return this.router.createUrlTree(['/auth']);    
           }))

       
    }

}