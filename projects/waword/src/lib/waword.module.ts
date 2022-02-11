import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
/* pipes */
import { TranslatePipe } from './pipes/translate.pipe';
import { SearchPipe } from './pipes/search.pipe';
/* directives */
import { TranslateDirective } from './directives/translate.directive';
/* config */
import { CONFIG_TOKEN, Config, DEFAULT_CONFIG } from './interfaces/config';
/* components */
import { TranslatesComponent } from './components/translates/translates.component';

@NgModule({
    imports: [CommonModule, FormsModule, HttpClientModule],
    declarations: [TranslatePipe, TranslateDirective, TranslatesComponent, SearchPipe],
    exports: [TranslatePipe, TranslateDirective, TranslatesComponent],
    providers: [{
            provide: CONFIG_TOKEN,
            useValue: DEFAULT_CONFIG
        }]
})
export class WawordModule {
	static forRoot(config: Config = DEFAULT_CONFIG): ModuleWithProviders<any> {
		return {
			ngModule: WawordModule,
			providers: [{
				provide: CONFIG_TOKEN,
				useValue: config
			}]
		}
	}
}