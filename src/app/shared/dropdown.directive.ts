import { Directive , HostBinding , HostListener , ElementRef } from '@angular/core';

@Directive({
	selector:'[appDropdown]'

})

export class DropdownDirective{
	
	@HostBinding('className') name:string;	

	 constructor(public element:ElementRef)
	{
	}

	@HostListener('click') toogleOpen(){
		if(this.name=='open')
			this.name='';
		else
			this.name='open';
			console.log('called');
	}

	// @HostListener('mouseleave') mouseleave(){
	// 	this.name='';
	// }
}