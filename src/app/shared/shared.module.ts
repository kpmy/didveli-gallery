import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FormsModule} from '@angular/forms';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {HeaderComponent} from './components/header/header.component';
import {MainLayoutComponent} from './components/main-layout/main-layout.component';
import {AppRoutingModule} from '../app-routing.module';
import { FooterComponent } from './components/footer/footer.component';
import { YesNoConfirmComponent } from './yes-no-confirm/yes-no-confirm.component';
import {TaigaModule} from '../taiga.module';
import {TuiAppearance, tuiButtonOptionsProvider} from '@taiga-ui/core';

@NgModule({
  declarations: [PageNotFoundComponent, MainLayoutComponent, HeaderComponent, FooterComponent, YesNoConfirmComponent],
  imports: [CommonModule, FormsModule, TaigaModule, AppRoutingModule,],
  exports: [FormsModule, AppRoutingModule, HeaderComponent],
  providers: [
    tuiButtonOptionsProvider({
      shape: `rounded`,
      appearance: TuiAppearance.Outline,
      size: 'm'
    }),
  ],
})
export class SharedModule {
}
