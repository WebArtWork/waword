import { Injectable, Inject, Optional } from '@angular/core';
import { CONFIG_TOKEN, Config, DEFAULT_CONFIG } from '../interfaces/config';
import { HttpService } from './http.service';
@Injectable({
	providedIn: 'root'
})
export class TranslateService {
	public language = 'ua';
	public languages:any = [];
	public translates:any=localStorage.getItem('translates')&&JSON.parse(localStorage.getItem('translates'))||{};
	constructor(@Inject(CONFIG_TOKEN) @Optional() private config: Config,
		private http: HttpService) {
		if(this.config.languages) this.languages = this.config.languages;
		this.http.get('/api/translate/get_translates', obj=>{
			this.translates=obj;
			localStorage.setItem('translates', JSON.stringify(this.translates));
		})
	}
	translate(slug, cb=()=>{}){
		if(!slug) return '';
		if(this.translates[this.language]&&this.translates[this.language][slug]){
			return this.translates[this.language][slug];
		}else{
			this.http.post('/api/word/create', {
				slug: slug,
				word: slug.substr(slug.indexOf('.')+1),
				page: slug.split('.')[0]
			}, resp=>{ });
			return slug.substr(slug.indexOf('.')+1);
		}
	}
	download_json(){
		this.http.get('/api/translate/get_translates',(obj)=>{
			let dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.translates));
			let link = document.createElement('a');
			link.href = dataStr;
			link.download = 'translate.json';
			link.click();
			link.remove();
		})
	}
	set_language(language){
		this.language = language;
	}
	set_language_content(){
		
	}
}
