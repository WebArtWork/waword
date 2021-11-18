import { OnInit, Directive, ElementRef } from '@angular/core';
import { TranslateService } from '../services/translate.service';

@Directive({
	selector: '[translate]'
})
export class TranslateDirective implements OnInit {
	constructor(public elementRef: ElementRef, private tr: TranslateService) {}
	ngOnInit():any {
		if(!this.tr.translates){
			return setTimeout(()=>{
				this.ngOnInit();
			}, 500);
		}
		this.elementRef.nativeElement.innerHTML = this.tr.translate(this.elementRef.nativeElement.innerHTML);
	}
}