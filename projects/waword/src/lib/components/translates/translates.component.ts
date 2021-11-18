import { Component, ElementRef, ViewChild} from '@angular/core';
import { HttpService } from '../../services/http.service';
import { TranslateService } from '../../services/translate.service';

@Component({
	selector: 'translates',
	templateUrl: './translates.component.html',
	styleUrls: ['./translates.component.scss']
})

export class TranslatesComponent {
	public words:any=[];

	public pages:any=[];
	public page:any='';

	public lang:any;

	public translates:any=[];
	constructor(public http: HttpService, public trans: TranslateService) {
		if(this.trans.languages.length) this.lang=this.trans.languages[0].code;
		http.get('/api/word/get', (arr)=>{
			this.words=arr;
			for (let i = 0; i < arr.length; i++){
				if(this.pages.indexOf(arr[i].page)==-1) this.pages.push(arr[i].page);
			}
		});
		http.get('/api/translate/get', (arr)=>{
			this.translates=arr;
			for (let i = 0; i < this.translates.length; i++){
				for (let j = 0; j < this.words.length; j++){
					if(this.translates[i].slug==this.words[j].slug&&this.translates[i].lang==this.lang){
						this.words[j].translate=this.translates[i].translate;
						this.words[j].translate_id=this.translates[i]._id;
					}
				}
			}
		});
	}

	ngOnInit() {}
	set_language(){
		for (let j = 0; j < this.words.length; j++){
			delete this.words[j].translate;
			delete this.words[j].translate_id;
			for (let i = 0; i < this.translates.length; i++){
				if(this.translates[i].slug==this.words[j].slug&&this.translates[i].lang==this.lang){
					this.words[j].translate=this.translates[i].translate;
					this.words[j].translate_id=this.translates[i]._id;
				}
			}
		}
	}
	translate(slug:any, translate:any){
		console.log(this.lang);
		this.http.afterWhile(this, ()=>{
			this.http.post('/api/translate/create', {
				slug: slug,
				translate: translate,
				lang: this.lang,
			}, created=>{
				//
			})
		})
		
	}
	delete(word_id:any, translate_id:any){
		for (let i = this.words.length-1; i >= 0; i--){
		    if(this.words[i]._id==word_id) this.words.splice(i, 1);
		}
		this.http.post('/api/word/delete', {
			_id: word_id
		}, succes=>{})
		this.http.post('/api/translate/delete', {
			_id: translate_id
		}, succes=>{})
	}
}