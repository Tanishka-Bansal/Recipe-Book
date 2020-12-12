import { Component , OnInit ,Inject ,PLATFORM_ID } from '@angular/core';
import { Store } from '@ngrx/store';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import {  isPlatformBrowser } from '@angular/common';
import * as AuthActions from './auth/store/auth.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private store:Store , @Inject(PLATFORM_ID) private platformId) { }
  title='demos';
  
 	ngOnInit(){
    if(isPlatformBrowser(this.platformId))
    {    this.store.dispatch(new AuthActions.autoLogin());
    } 
    console.log('Running');
	}

}
