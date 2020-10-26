import { Directive, OnInit, HostListener, ElementRef, Renderer2, HostBinding } from '@angular/core';

@Directive({
    selector : "[appDropdown]"
})
export class DropdownDirective implements OnInit{
    @HostBinding('class.open') isOpen : boolean = false ;

    @HostListener('document: click',['$event'] ) onClick (event : Event) {
        // one method of implementing.

        /**
         * Alternative method without using host binding
         * 
            if(this.element.nativeElement.classList.contains('open')){
                console.log("contains open");
                this.render.removeClass(this.element.nativeElement, "open");
            }else {
                this.render.addClass(this.element.nativeElement, "open");    
            }
         */
          this.isOpen = this.element.nativeElement.contains(event.target) ? !this.isOpen : false;  
    }
    constructor(private render : Renderer2, private element : ElementRef){
    }
    ngOnInit(){

    }
}