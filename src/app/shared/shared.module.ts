import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';



@NgModule({
	declarations: [
		SidebarComponent
	],
	imports: [
		CommonModule
	],
  	exports: [ //componentes que haces visibles al resto de la app
		SidebarComponent
	]
})
export class SharedModule { }
