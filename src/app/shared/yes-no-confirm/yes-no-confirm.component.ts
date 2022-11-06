import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {TuiDialogContext} from '@taiga-ui/core';
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus';

@Component({
  selector: 'app-yes-no-confirm',
  templateUrl: './yes-no-confirm.component.html',
  styleUrls: ['./yes-no-confirm.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YesNoConfirmComponent {

  constructor(@Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<boolean>) { }

  get data(): number {
    return this.context.data;
  }

  ok() {
    this.context.completeWith(true);
  }

  cancel() {
    this.context.completeWith(false);
  }

}
