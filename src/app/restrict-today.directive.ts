import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appRestrictToday]'
})
export class RestrictTodayDirective {
  private renderer: any;
  private el : any;
  constructor() {
    this.renderer.setAttribute(this.el.nativeElement, 'max', new Date().toJSON().split('T')[0].toString());
  }
}
