import { HttpInterceptor, HttpRequest, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as fromApp from '../store/app.reducer';
import { take , map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

    constructor(private store:Store<fromApp.AppState>){}

    intercept(req: HttpRequest<any>, next)
    {
        if(req.url=='https://recipe-book-a8a32.firebaseio.com/recipes.json')
        {
        let modifiedReq;
        this.store.select('auth')
            .pipe(take(1),
            map(data=>{
                return data.user;
            }))
            .subscribe(
                 data=>{
                    modifiedReq= req.clone({params:new HttpParams().set('auth',data.token)});
            });
        return next.handle(modifiedReq);
        }
        
        return next.handle(req);
    }

}