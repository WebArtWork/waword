import { InjectionToken } from '@angular/core';

export interface Config {
	url: string;
    [index: number]: { id: number; label: string; key: any };
	languages?: {
		name: string;
		code: string;
	}[];
}
export const CONFIG_TOKEN = new InjectionToken<Config>('config');
export const DEFAULT_CONFIG: Config = {
	url: '',
	languages: [{
		name: 'English',
		code: 'en'
	}]
}