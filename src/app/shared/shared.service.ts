import {Inject, Injectable, Injector} from '@angular/core';
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';
import {YesNoConfirmComponent} from './yes-no-confirm/yes-no-confirm.component';
import {TuiDialogService} from '@taiga-ui/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(@Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
              @Inject(Injector) private readonly injector: Injector) { }

  initYesNoDialog(data: string) {
    return this.dialogService.open<boolean>(
      new PolymorpheusComponent(YesNoConfirmComponent, this.injector),
      {
        label: 'Confirm delete',
        data,
        size: `s`,
        dismissible: true
      },
    );
  }
}
