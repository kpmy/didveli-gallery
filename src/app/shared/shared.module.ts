import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FormsModule} from '@angular/forms';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {HeaderComponent} from './components/header/header.component';
import {MainLayoutComponent} from './components/main-layout/main-layout.component';
import {TuiSvgModule} from '@taiga-ui/core';
import {AppRoutingModule} from '../app-routing.module';

@NgModule({
  declarations: [PageNotFoundComponent, MainLayoutComponent, HeaderComponent],
  imports: [CommonModule, FormsModule, TuiSvgModule, AppRoutingModule,],
  exports: [FormsModule, AppRoutingModule, HeaderComponent]
})
export class SharedModule {
}
