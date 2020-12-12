import { Actions , ofType , Effect } from '@ngrx/effects'; 
import { catchError , tap, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { User } from '../user.model';
import { environment } from '../../../environments/environment';
import * as AuthActions from './auth.action';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

interface AuthResponseData{
    idToken:string;
    email:string;
    refreshToken:string;
    expiresIn:string;
    localId:string;	
    registered:boolean;
}

const handleAuth=(expiresIn:string, email:string, localId:string, idToken:string)=>{
    let expiration:Date= new Date(new Date().getTime() + +expiresIn*1000);
    let user=new User(
        email,
        localId,
        idToken,
        expiration
    )
    localStorage.setItem('userData',JSON.stringify(user));
    return (new AuthActions.authSuccess(user));
};

const handleError=(errorRes:HttpErrorResponse)=>{
    let error='An unknown error occured';
    if(!errorRes.error || !errorRes.error.error){
        return of(new AuthActions.authFails(error));
    };
    switch(errorRes.error.error.message){
        case 'EMAIL_NOT_FOUND': error='There is no user record with this email.';break;
        case 'INVALID_PASSWORD': error='The password is invalid.'; break;
        case 'USER_DISABLED': error='The user account has been disabled by an administrator.';break; 
        case 'EMAIL_EXISTS': error=' The email address already exists.' ; break;
        case 'OPERATION_NOT_ALLOWED': error='Password sign-in is disabled for this project.';break;
        case 'TOO_MANY_ATTEMPTS_TRY_LATER': error='Too Many Attempts. Try again later.';break;
        default:error='An unknown error occured';break;   
    }
    return of(new AuthActions.authFails(error));
}


@Injectable()

export class AuthEffects{

    constructor(private action:Actions ,
         private client:HttpClient ,
         private router:Router,
         private authService:AuthService){}

    @Effect()
    loginStart=this.action.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData:AuthActions.loginStart)=>{
            return  this.client
            .post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.firebaseAPIkey,
            {
                email:authData.data.email,
                password:authData.data.password,
                returnSecureToken:true
            })
            .pipe(
                map((data:AuthResponseData)=>{
                  this.authService.setLogoutTimer(+data.expiresIn*1000);
                  return handleAuth(data.expiresIn,data.email,data.localId,data.idToken);
                })
                ,
                catchError(errorRes=>{
                    console.log(errorRes);
                  return handleError(errorRes);
                })
            )  
    
            }));

            
    @Effect()
    signupStart=this.action.pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap((authRes:AuthActions.signUpStart)=>{
           return this.client.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.firebaseAPIkey,
        {
            email:authRes.data.email,
            password:authRes.data.password,
            returnSecureToken:true
        })
        .pipe(
            map(data=>{
                this.authService.setLogoutTimer(+data.expiresIn*1000);
                return handleAuth(data.expiresIn,data.email,data.localId,data.idToken);
            }),
            catchError(errorRes=>{
                return handleError(errorRes);
            })
            )  
            
        }));
  
    @Effect({dispatch:false})
    authSuccess=this.action.pipe(
        ofType(AuthActions.AUTH_SUCCESS),
        tap(()=>{
            this.router.navigate(['/recipe']);
        })
    )
    
    @Effect({dispatch:false})
    authLogout=this.action.pipe(
        ofType(AuthActions.LOGOUT),
        tap(()=>{
            localStorage.removeItem('userData');
            this.authService.clearLogoutTimer();
            this.router.navigate(['/auth']);
        })
    )

    @Effect()
    autoLogin=this.action.pipe(
        ofType(AuthActions.AUTO_LOGIN),
        map(()=>{
            const data:{
                email:string,
                id:string,
                _token:string,
                _token_expiration_date:string
            }=JSON.parse(localStorage.getItem('userData'));
          
            if(!data)
               return {type:'DUMMY'};
   
            const user=new User(
            data.email,
            data.id,
            data._token,
            new Date(data._token_expiration_date));
            if(user.token)
            { 
                  let expTime:number=new Date(data._token_expiration_date).getTime()- new Date().getTime();
                  this.authService.setLogoutTimer(expTime);
                  return (new AuthActions.authSuccess(user));
             }     
             else
                return new AuthActions.logout();
           
        }
    ))
}