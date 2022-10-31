import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import {
  TuiRootModule,
  TuiDialogModule,
  TuiAlertModule,
  TUI_SANITIZER,
  TuiHostedDropdownModule,
  TuiButtonModule, TuiDataListModule
} from '@taiga-ui/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { DetailModule } from './detail/detail.module';

import { AppComponent } from './app.component';
import {AppService} from './app.service';
import {ServiceInfoComponent} from './service-info/service-info.component';
import {RoomInfoComponent} from './room-info/room-info.component';
import {TuiTableModule} from '@taiga-ui/addon-table';
import {TuiDataListDropdownManagerModule} from "@taiga-ui/kit";
import {TuiActiveZoneModule, TuiLetModule} from "@taiga-ui/cdk";

@NgModule({
  declarations: [AppComponent, ServiceInfoComponent, RoomInfoComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    HomeModule,
    DetailModule,
    BrowserAnimationsModule,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    TuiTableModule,
    TuiHostedDropdownModule,
    TuiButtonModule,
    TuiDataListDropdownManagerModule,
    TuiActiveZoneModule,
    TuiDataListModule,
    TuiLetModule
  ],
  providers: [AppService, {provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}],
  bootstrap: [AppComponent]
})
export class AppModule {}
