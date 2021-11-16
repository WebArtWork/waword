import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '../services/translate.service';
@Pipe({
	name: 'translate'
})
export class TranslatePipe implements PipeTransform {
	constructor(private tr: TranslateService){}
	transform(phrase:string): any {
		if(!phrase||!this.tr.translates) return '';
		return this.tr.translate(phrase);
	}
}
