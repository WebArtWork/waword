import { Injectable, Inject, Optional } from '@angular/core';
import { CONFIG_TOKEN, Config, DEFAULT_CONFIG } from '../interfaces/config';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs'; 
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class HttpService {
	private url = '';
	constructor(@Inject(CONFIG_TOKEN) @Optional() private config: Config,
		private http: HttpClient){
		if(this.config.url) this.url = this.config.url;
	}
	post(url, doc, callback=(resp:any) => {}){
		this.http.post<any>(this.url+url, doc).subscribe(callback);
	}
	get(url, callback=(resp:any) => {}){
		this.http.get<any>(this.url+url).subscribe(callback);
	}
	afterWhile(doc, cb, time=1000){
		if(typeof cb == 'function' && typeof time == 'number'){
			clearTimeout(doc.__updateTimeout);
			doc.__updateTimeout = setTimeout(cb, time);
		}
	};
}