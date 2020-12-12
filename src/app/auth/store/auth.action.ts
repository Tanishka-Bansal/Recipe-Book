import { Action } from '@ngrx/store';
import { User } from '../user.model';

export const LOGIN_START='[Auth] Login Start';
export const SIGNUP_START='[Auth] Signup Start';
export const AUTH_SUCCESS='[Auth] Auth Success';
export const AUTH_FAILS='[Auth] Auth Fails';
export const LOGOUT='[Auth] Logout';
export const AUTO_LOGIN='[Auth] Auto Login';

export class logout implements Action{
    readonly type=LOGOUT;
}

export class loginStart implements Action{
    readonly type=LOGIN_START;
    constructor(public data:{email:string, password:string}){}
}

export class signUpStart implements Action{
    readonly type=SIGNUP_START;
    constructor(public data:{email:string, password:string}){}
}

export class authSuccess implements Action{
    readonly type=AUTH_SUCCESS;
    constructor(public data:User){}
}

export class authFails implements Action{
    readonly type=AUTH_FAILS;
    constructor(public data:string){}
}

export class autoLogin implements Action{
    readonly type=AUTO_LOGIN;
}


export type AuthActions=  
logout | 
loginStart | 
authSuccess | 
authFails | 
signUpStart | 
autoLogin ;