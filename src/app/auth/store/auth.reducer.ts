import * as AuthActions from './auth.action';
import { User } from '../user.model';

export interface State{
  user:User,
  authError:string,
  loading:boolean
}  

const initialState:State={
    user:null,
    authError:'',
    loading:false
}

export function AuthReducer( state=initialState,action:AuthActions.AuthActions){
    
    switch(action.type){
        case AuthActions.AUTH_SUCCESS:
            return {...state,user:action.data , authError:null , loading:false};

        case AuthActions.LOGIN_START:
        case AuthActions.SIGNUP_START:
                return {...state, authError:null , loading:true};    

        case AuthActions.AUTH_FAILS:
            return {...state, user:null, authError: action.data , loading:false};    
            

        case AuthActions.LOGOUT:
            return {...state,user:null};

        default: return{...state};
      }
}