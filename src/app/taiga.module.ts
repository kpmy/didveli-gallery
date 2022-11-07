import { NgModule } from '@angular/core';
import {
  TuiAlertModule,
  TuiButtonModule,
  TuiDataListModule,
  TuiDialogModule, TuiErrorModule,
  TuiHostedDropdownModule,
  TuiRootModule, TuiScrollbarModule, TuiSvgModule
} from '@taiga-ui/core';
import {TuiTableModule, TuiTablePaginationModule} from '@taiga-ui/addon-table';
import {
  TuiDataListDropdownManagerModule,
  TuiFieldErrorPipeModule, TuiInputDateModule,
  TuiInputModule,
  TuiSelectModule
} from '@taiga-ui/kit';
import {TuiActiveZoneModule, TuiLetModule, TuiValidatorModule} from '@taiga-ui/cdk';

const taigaModules = [
  TuiRootModule,
  TuiDialogModule,
  TuiAlertModule,
  TuiTableModule,
  TuiHostedDropdownModule,
  TuiButtonModule,
  TuiDataListDropdownManagerModule,
  TuiActiveZoneModule,
  TuiDataListModule,
  TuiLetModule,
  TuiInputModule,
  TuiValidatorModule,
  TuiSvgModule,
  TuiFieldErrorPipeModule,
  TuiErrorModule,
  TuiSelectModule,
  TuiScrollbarModule,
  TuiInputDateModule,
  TuiTablePaginationModule
];

@NgModule({
  imports: [
    ...taigaModules
  ],
  exports: [
    ...taigaModules
  ]
})
export class TaigaModule { }
